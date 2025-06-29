from django.shortcuts import render
from django.views.generic import (
    ListView,
    DetailView,
    CreateView,
    )
from .models import Persona

class PersonaDetailView(DetailView):
  model = Persona
  
class PersonaListView(ListView):
  model = Persona
  queryset = Persona.objects.filter(edad__lte='85')

class PersonaCreateView(CreateView):
  model = Persona
  fields = [
      'nombres',
      'apellidos',
      'edad',
      'donador'
      ]