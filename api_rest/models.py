from django.db import models

# Create your models here.
class User(models.Model):
    user_nickname = models.CharField(max_length=100,primary_key=True,default='')
    username = models.CharField(max_length=150,default='')
    email = models.EmailField(default= '')
    user_age = models.IntegerField(default=0)
    def __str__(self):
        return self.username
    
    