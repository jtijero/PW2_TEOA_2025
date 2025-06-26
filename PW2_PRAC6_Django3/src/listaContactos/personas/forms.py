from django import forms
from .models import Persona

class PersonaForm(forms.ModelForm):
  class Meta:
    model = Persona
    fields = [
      'nombres',
      'apellidos',
      'edad',
      'donador',
        ]
  def clean_nombres(self, *args, **kwargs):
    print('paso')
    name = self.cleaned_data.get('nombres')
    if name.istitle():
      return name
    else:
      raise forms.ValidationError('La primera letra en mayúscula')


class RawPersonaForm(forms.Form):
  nombres = forms.CharField(
    widget = forms.Textarea(
      attrs={
        'placeholder': 'Solo tu nombre, porf',
        'id':'nombreID',
        'class': 'special',
        'cols': '10',
      }
    )
  )
  apellidos = forms.CharField()
  edad = forms.IntegerField( initial = 20)
  donador = forms.BooleanField()