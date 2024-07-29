# zoo/models.py
from django.db import models

class Animal_Model(models.Model):
    name = models.CharField(max_length=100)
    species = models.CharField(max_length=100)
    age = models.IntegerField()
    description = models.TextField()
    image = models.ImageField(upload_to='animal_images/')

    def __str__(self):
        return self.name
