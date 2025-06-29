from django.shortcuts import render
from django.views.generic import (
    ListView,
    DetailView,
    )
from .models import Persona

class PersonaDetailView(DetailView):
  model = Persona
  
class PersonaListView(ListView):
  model = Persona
  queryset = Persona.objects.filter(edad__lte='18')