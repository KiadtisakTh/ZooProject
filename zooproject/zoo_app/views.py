# zoo/views.py
from rest_framework import generics
from .models import Animal_Model
from .serializers import Animal_ModelSerializer

class AnimalList(generics.ListAPIView):
    queryset = Animal_Model.objects.all()
    serializer_class = Animal_ModelSerializer
