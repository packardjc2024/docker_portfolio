from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from .forms import *
from .models import *
from pathlib import Path
from django.conf import settings
import os

# Create your views here.
def index(request):
    context = {}
    context['form_submitted'] = False
    context['projects'] = [
        {
        'name': 'Portfolio',
        'img_url': 'site_pictures/portfolio_screenshot.png',
        'text': (
            "This project was created using Python's Django "
            "framework and PostgreSQL in Docker containers. "
            "It is running on an Ubuntu server using Nginx."
        ),
        'github_link': 'https://github.com/packardjc2024/docker_portfolio',
        'project_link': "#",
        'alt': 'Portofolio Screenshot',
        },
        {
        'name': "Docker Setup",
        'img_url': 'site_pictures/docker_setup_screenshot.png',
        'text': (
            "This app automates setting up a new Django/Postgres "
            "dockerized app. All you have to do is enter in the secrets "
            "necessary for the app and the app will encrypt the secrets, "
            "create the Django, Postgres database, and docker files all "
            "for you. Spinning up a new dockerized app only takes seconds!"
        ),
        'github_link': 'https://github.com/packardjc2024/docker_setup',
        'project_link': False,
        'alt': 'Docker Setup Screenshot',
        },
        {
        'name': "CSVQL",
        'img_url': '',
        'text': (
            "Coming Soon..."
        ),
        'github_link': '',
        'project_link': '',
        'alt': 'CSVQL Screenshot',
        },
    ]
    if request.method == 'GET':
        context['contact_form'] = ContactForm()
    elif request.method == 'POST':
        contact_form = ContactForm(request.POST)
        if contact_form.is_valid():
            contact_form.save()
            context['form_submitted'] = True
        else:
            context['context_form'] = contact_form
    return render(request, 'home_page/index.html', context)