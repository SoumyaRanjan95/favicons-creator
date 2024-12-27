from django.shortcuts import render

from .forms import UploadFileForm
# Create your views here.

from utils import handle_uploaded_files

def upload_file(request):
    if request.method == "POST":
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            handle
