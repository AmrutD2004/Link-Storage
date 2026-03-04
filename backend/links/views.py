from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# Create your views here.

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            token = response.data
            
            access_token = token['access']
            refresh_token = token['refresh']
            
            res = Response()
            
            res.data = {"success" : True, "message" : "Login Successfull"}
            res.set_cookie(
                key = 'access_token', 
                value = access_token,
                httponly = True,
                secure = True,
                samesite = 'None',
                path = '/'
            )
            res.set_cookie(
                key = 'refresh_token', 
                value = refresh_token,
                httponly = True,
                secure = True,
                samesite = 'None',
                path = '/'
            )
            return res
        except:
            return Response({'success' : False, 'message' : 'Invalid Credentials'}, status=400)

@api_view(['POST'])       
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        res = Response()
        res.data = {'success' : True}
        res.delete_cookie('access_token', path='/', samesite='None')
        res.delete_cookie('refresh_token', path='/', samesite='None')
        
        return res
    except:
        return Response({'success':False})
    
@api_view(['POST'])
@permission_classes([AllowAny])
def userRegister(request):
    serializer = UserRegister(data = request.data) 
    if serializer.is_valid():
        serializer.save()
        return Response({'success' : True, 'data' : serializer.data})
    return Response({'error': serializer.errors})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_authenticated(request):
    user = request.user
    return Response({
        'success' : True,
        'username' : user.username,
        'email' : user.email,
        'created_at' : user.created_at,
    })
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_category(request):
    serializer = CategoryCreation(data = request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response({
            'success': True,
            'data': serializer.data
        })
    return Response({
        'success': False,
        'errors': serializer.errors
    })
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_category(request):
    categories = Category.objects.filter(user = request.user)
    
    serializer = GetUserCategory(categories, many=True)
    return Response({
            'success': True,
            'data': serializer.data
        })
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_category(request, category_id):
    try:
        category = Category.objects.get(id=category_id, user=request.user)
        category.delete()
        return Response({
                'success': True,
                'message': 'Category Deleted'
            })
    except Category.DoesNotExist:
        return Response({
                'success': False,
                'message': "Category Doesn't exists"
            }, status = 404)
    
