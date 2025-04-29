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
            'header': skill,
            'id': skill_lower,
            'logos': [f'logos/{skill_lower}/{filename}' for filename in os.listdir(logos_directory) if filename.endswith('.png')],
        })

    context['projects'] = []
    context['projects'].append({
        'name': 'Portfolio',
        'img_url': 'site_pictures/portfolio_screenshot.png',
        'text': (
            "This project was created using Python's Django "
            "framework and PostgreSQL in Docker containers. "
            "It is running on an Ubuntu server using Nginx."
        ),
        'github_link': 'https://github.com/packardjc2024/portfolio',
        'project_link': "#",
        })
    
    return render(request, 'home_page/index.html', context)