from django.db import models

class PlantHealthReport(models.Model):
    image = models.ImageField(upload_to='plant_images/')
    
    health = models.CharField(max_length=100)  
    confidence = models.FloatField()           
    issue = models.TextField()                 
    recommendation = models.TextField()        

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Health: {self.health} ({self.confidence}%)"
