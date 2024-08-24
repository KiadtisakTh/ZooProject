# zoo_app/urls.py
from django.urls import path
from zoo_app.views import *
from . import views





urlpatterns = [
    path('login/', user_login, name='login'),  # เส้นทางสำหรับ /api/login/
    path('logout/', user_logout, name='logout'),
    path('animals/', views.AnimalListCreate.as_view(), name='animal-list-create'),
    path('animals/<int:pk>/', views.AnimalRetrieveUpdateDestroy.as_view(), name='animal-detail'),
]
