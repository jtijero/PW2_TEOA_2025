from django.contrib import admin
from .models import Movie

# Registrar el modelo Movie en el panel de administración
admin.site.register(Movie)
