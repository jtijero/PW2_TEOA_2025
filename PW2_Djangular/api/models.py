from django.db import models

# Modelo Movie
class Movie(models.Model):
    title = models.CharField(max_length=32)
    desc = models.CharField(max_length=256)
    year = models.IntegerField()

    def __str__(self):
        return self.title
