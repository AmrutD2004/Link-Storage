
from django.urls import path
from .views import *

urlpatterns = [
     path('login/', CustomTokenObtainPairView.as_view()),
     path('logout/', logout, name='logout'),
     path('register/', userRegister, name='logout'),
     path('is-auth/', is_authenticated, name='logout'),
]