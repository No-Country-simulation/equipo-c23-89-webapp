from django.db import models
from core.usuario.models import CustomUser
from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.
class Candidato(models.Model):
    usuario = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="candidato")  
    experiencia = models.TextField()
    educacion = models.TextField()
    cv = models.FileField(upload_to='cvs/', null=True, blank=True)
    
    
    
    def __str__(self):
        return self.experiencia
    
    class Meta:
        db_table = "candidato"
        
@receiver(post_save, sender=CustomUser)
def create_recruiter_profile(sender, instance, created, **kwargs):
    if created and instance.role == 'candidate':
        Candidato.objects.create(user=instance)