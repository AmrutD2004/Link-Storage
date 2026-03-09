from rest_framework import serializers
from .models import *


class UserRegister(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password' : {'write_only' : True}
        }
    
    # def validate_email(self, email):
    #     if Users.object.filter(email=email):
    #         raise serializers.ValidationError('Email already exists please try another email')
    #     return email
        
    def create(self, validated_data):
        user = Users(
            username = validated_data['username'],
            email = validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class CategoryCreation(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'link_category', 'category_color', 'created_at']
        
class GetUserCategory(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['user', 'id', 'link_category', 'category_color', 'created_at']

class LinkCreation(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.link_category", read_only= True)
    class Meta:
        
        model = linkData
        fields = ['id', 'category', 'category_name', 'actual_link', 'link_title', 'link_purpose', 'link_tags', 'created_at']

class GetUserLinksSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.link_category", read_only= True)
    class Meta:
        model = linkData
        fields = ['id', 'user', 'category', 'category_name', 'actual_link', 'link_title', 'link_purpose', 'link_tags', 'created_at']
        
class EditLinkSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.link_category", read_only= True)
    class Meta:
        
        model = linkData
        fields = ['id', 'category', 'category_name', 'actual_link', 'link_title', 'link_purpose', 'link_tags', 'created_at']