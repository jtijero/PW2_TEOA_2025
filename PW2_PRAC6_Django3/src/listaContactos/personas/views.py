from django.shortcuts import render
from django.views.generic.list import (
    ListView
    )
from .models import Persona

class PersonaListView(ListView):
  model = Persona
  queryset = Persona.objects.filter(edad__lte='18')