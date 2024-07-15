from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import update_last_login
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password', 'phone_number', 'year_of_birth', 'gender']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.save()
        return user






class LoginSerializer(TokenObtainPairSerializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        user_login = data.get("username")
        password = data.get("password")
        
        # Check if username is an email
        if "@" in user_login:
            user = User.objects.filter(email=user_login).first()
            if user:
                user_login= user.username

        user = authenticate(username=user_login, password=password)

        if user is None:
            raise serializers.ValidationError('Invalid login credentials.')

        refresh = RefreshToken.for_user(user)
        token = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

        update_last_login(None, user)

        return {
            'username': user.username,
            'token': token
        }

