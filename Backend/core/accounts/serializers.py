from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.password_validation import validate_password

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    id_proof = serializers.FileField(required=True)  

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password', 'individual_type', 'id_proof', 'location')

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            individual_type=validated_data.get('individual_type'),
            id_proof=validated_data.get('id_proof'),
            location=validated_data.get('location')
        )
        return user
