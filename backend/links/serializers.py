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