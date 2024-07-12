from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework import serializers
from .models import CustomUser

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'user_name', 'email', 'phone_number', 'password', 'gender', 'date_of_birth']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            user_name=validated_data['user_name'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone_number=validated_data.get('phone_number', ''),
            gender=validated_data.get('gender', ''),
            date_of_birth=validated_data.get('date_of_birth', None),
            password=validated_data['password']
        )
        return user
    


class UserLoginSerializer(serializers.Serializer):
    user_login = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user_login = data.get('user_login')
        password = data.get('password')

        if user_login and password:
            # Check if user_login is an email or username
            if '@' in user_login:
                user = authenticate(email=user_login, password=password)
            else:
                user = authenticate(user_name=user_login, password=password)

            if user:
                if not user.is_active:
                    msg = 'User account is disabled.'
                    raise serializers.ValidationError(msg)
                data['user'] = user
                return data
            else:
                msg = 'Unable to log in with provided credentials.'
                raise serializers.ValidationError(msg)
        else:
            msg = 'Must include "username or email" and "password".'
            raise serializers.ValidationError(msg)    
    