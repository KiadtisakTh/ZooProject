# zoo/views.py
from rest_framework import generics
from .models import Animal_Model
from .serializers import Animal_ModelSerializer
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt  # ใช้สำหรับการทดสอบเท่านั้น (ไม่แนะนำให้ใช้ใน production)
def user_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'success': True, 'message': 'Login successful'})
        else:
            return JsonResponse({'success': False, 'message': 'Invalid credentials'}, status=401)
    return JsonResponse({'error': 'Invalid request'}, status=400)



class AnimalList(generics.ListAPIView):
    queryset = Animal_Model.objects.all()
    serializer_class = Animal_ModelSerializer
