from .models import *
from django import forms
from django.forms import ModelForm, TextInput


class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = '__all__'
        # widgets = {
        #     'first_name': TextInput(attrs={
        #         'class': 'form-control',
        #         'placeholder': 'First Name...',
        #     }),
        #         'last_name': TextInput(attrs={
        #         'class': 'form-control',
        #         'placeholder': 'Last Name',
        #     }),
        #         'phone_number': TextInput(attrs={
        #         'class': 'form-control',
        #         'placeholder': 'Phone Number...',
        #     }),
        # }