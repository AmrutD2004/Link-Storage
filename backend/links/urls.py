
from django.urls import path
from .views import *

urlpatterns = [
     path('login/', CustomTokenObtainPairView.as_view()),
     path('logout/', logout, name='logout'),
     path('register/', userRegister, name='logout'),
     path('is-auth/', is_authenticated, name='is_authenticated'),
     path('create-category/', create_category, name='create_category'),
     path('get-category/', get_user_category, name='get_user_category'),
     path('delete-category/<int:category_id>/', delete_category, name='delete_category'),
     
]