# zoo/serializers.py
from rest_framework import serializers
from .models import Animal_Model

class Animal_ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal_Model
        fields = '__all__'
