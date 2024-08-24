# zoo/views.py
from rest_framework import generics
from .models import Animal_Model
from .serializers import Animal_ModelSerializer
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import logout
from django.http import JsonResponse
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
            is_admin = user.is_superuser  # ตรวจสอบว่า user เป็น admin หรือไม่
            return JsonResponse({
                'success': True, 
                'message': 'Login successful',
                'is_admin': is_admin  # ส่งข้อมูล is_admin กลับไปยัง React
            })
        else:
            return JsonResponse({'success': False, 'message': 'Invalid credentials'}, status=401)
    return JsonResponse({'error': 'Invalid request'}, status=400)

@csrf_exempt
def user_logout(request):
    if request.method == 'POST':
        logout(request)  # ออกจากระบบผู้ใช้
        return JsonResponse({'success': True, 'message': 'Logged out successfully'})
    return JsonResponse({'error': 'Invalid request method'}, status=400)



class AnimalListCreate(generics.ListCreateAPIView):  # รองรับทั้ง GET และ POST
    queryset = Animal_Model.objects.all()
    serializer_class = Animal_ModelSerializer

class AnimalRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):  # รองรับ GET, PUT, DELETE
    queryset = Animal_Model.objects.all()
    serializer_class = Animal_ModelSerializer
    def update(self, request, *args, **kwargs):
        # การจัดการเพิ่มเติมหากจำเป็น
        return super().update(request, *args, **kwargs)