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
    skills = [
        'Back End',
        'Front End',
        'Web Based',
        'Misc',
    ]
    context['skills'] = []
    for skill in skills:
        skill_lower = skill.lower().replace(' ', '_')
        logos_directory = Path.joinpath(Path(settings.BASE_DIR), 'static', 'logos', skill_lower)
        context['skills'].append({
            'class': f'{skill_lower} moving-logo',
            'card': f'{skill_lower.replace('_', '-')}-card',
            'logos': [f'logos/{skill_lower}/{filename}' for filename in os.listdir(logos_directory) if filename.endswith('.png')],
        })

    context['projects'] = [
        {
        'name': 'Portfolio',
        'img_url': 'site_pictures/portfolio_screenshot.png',
        'text': (
            "This project was created using Python's Django "
            "framework and PostgreSQL in Docker containers. "
            "It is running on an Ubuntu server using Nginx."
        ),
        'github_link': 'https://github.com/packardjc2024/portfolio',
        'project_link': "#",
        },
        {
        'name': "CSVQL",
        'img_url': '',
        'text': (

        ),
        'github_link': '',
        'project_link': '',
        },
        {
        'name': "CSVQL",
        'img_url': '',
        'text': (

        ),
        'github_link': '',
        'project_link': '',
        },
        {
        'name': "CSVQL",
        'img_url': '',
        'text': (

        ),
        'github_link': '',
        'project_link': '',
        },
        {
        'name': "CSVQL",
        'img_url': '',
        'text': (

        ),
        'github_link': '',
        'project_link': '',
        },
    ]
    if request.method == 'GET':
        context['contact_form'] = ContactForm()
    elif request.method == 'POST':
        contact_form = ContactForm(request.POST)
        if contact_form.is_valid():
            contact_form.save()
        else:
            context['context_form'] = contact_form
    return render(request, 'home_page/index.html', context)