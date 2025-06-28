from django.shortcuts import render
from django.views.generic.list import (
    ListView
    )
from .models import Persona

class PersonaListView(ListView):
  model = Persona