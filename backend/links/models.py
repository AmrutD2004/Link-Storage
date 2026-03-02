from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Users(AbstractUser):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.username
    
class Category(models.Model):
    link_category = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.link_category
    
class linkData(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='links')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='linkCategory')
    actual_link = models.CharField(max_length=500)
    link_title = models.CharField(max_length=100)
    link_purpose = models.CharField(max_length=500)
    link_tags = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.link_title

