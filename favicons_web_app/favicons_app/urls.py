from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import TemplateView
from django.conf import settings
from django.conf.urls.static import static

from .views import *



urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html') ),
    path('upload-file-convert-from-image/',convert_from_image, name='convert-from-image'),
    path('upload-file-generate-from-text/',generate_from_text, name='generate-from-text'),
    path('<path:route>', TemplateView.as_view(template_name='index.html')),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)