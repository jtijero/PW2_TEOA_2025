from django.shortcuts import render
from django.urls import reverse_lazy
from django.views import View
from django.http import HttpResponse, JsonResponse
from django.views.generic import (
    ListView,
    DetailView,
    CreateView,
    UpdateView,
    DeleteView,
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

class PersonaUpdateView(UpdateView):
  model = Persona
  fields = [
      'nombres',
      'apellidos',
      'edad',
      'donador'
      ]

class PersonaDeleteView(DeleteView):
  model = Persona
  success_url = reverse_lazy('personas:persona_list')

class PersonaQueryView(View):
  def get(self, request, *args, **kwargs):
    queryset = Persona.objects.filter(edad__lte ='40')
    return JsonResponse(list(queryset.values()), safe= False)