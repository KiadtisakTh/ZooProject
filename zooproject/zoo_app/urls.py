# zoo_app/urls.py
from django.urls import path
from zoo_app.views import *





urlpatterns = [
    path('login/', user_login, name='login'),  # เส้นทางสำหรับ /api/login/

]
