# zoo/serializers.py
from rest_framework import serializers
from .models import Animal_Model

class Animal_ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal_Model
        fields = '__all__'
def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.species = validated_data.get('species', instance.species)
        instance.age = validated_data.get('age', instance.age)
        instance.description = validated_data.get('description', instance.description)
        if 'image' in validated_data:
            instance.image = validated_data['image']
        instance.save()
        return instance