
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
     path('fetch-link-title/', fetch_link_title, name='fetch_link_title'),
     path('create-link/', create_link, name='create_link'),
     path('get-links/', get_user_links, name='get_user_links'),
     path('delete-link/<int:link_id>/', delete_link, name='delete_link'),
     path('get-link-id/<int:link_id>/', get_link, name='get_link'),
     path('edit-link/<int:link_id>/', edit_link, name='edit_link')
]