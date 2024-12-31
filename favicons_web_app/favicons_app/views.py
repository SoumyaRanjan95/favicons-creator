from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, FileResponse
import tempfile
import os
from io import BytesIO
import zipfile
from pathlib import Path


from favicons import Favicons
from .forms import UploadFileForm
# Create your views here.


@csrf_exempt
def convert_from_image(request):
    if request.method == "POST":
        temp_file = (Path(__file__).parent.parent/'tmp/')
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            print("Inside form is valid")
            file = request.FILES['file']
            with open(temp_file/"tmp.png",'wb') as f:
                for fi in file.chunks():
                    f.write(fi)

            favicon = Favicons(temp_file/"tmp.png",temp_file)
            favicon.sgenerate()
            ico_filenames = favicon.filenames()

            with zipfile.ZipFile(temp_file/'faviconzip.zip','w') as zip:
                for i in ico_filenames:
                    open_ico_file = open(temp_file/i,'rb')
                    open_ico_file.seek(0)
                    zip.writestr(i,open_ico_file.read(),compress_type=zipfile.ZIP_DEFLATED)
                zip.printdir()

            response = HttpResponse(open(temp_file/'faviconzip.zip','rb').read())
            response['Content-Type']='application/x-zip-comprssed'
            response['Content-Disposition'] = 'attachment; filename=favicons.zip'

            for file in os.listdir(temp_file):
                os.remove(temp_file/file)
            
            return response
    return HttpResponse("File Cannot Be uploaded")

        
@csrf_exempt
def generate_from_text(request):
    if request.method == "POST":
        temp_file = (Path(__file__).parent.parent/'tmp/')
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            print("Inside form is valid")
            file = request.FILES['file']
            with open(temp_file/"tmp.png",'wb') as f:
                for fi in file.chunks():
                    f.write(fi)

            favicon = Favicons(temp_file/"tmp.png",temp_file)
            favicon.sgenerate()
            ico_filenames = favicon.filenames()

            with zipfile.ZipFile(temp_file/'faviconzip.zip','w') as zip:
                for i in ico_filenames:
                    open_ico_file = open(temp_file/i,'rb')
                    open_ico_file.seek(0)
                    zip.writestr(i,open_ico_file.read(),compress_type=zipfile.ZIP_DEFLATED)
                zip.printdir()

            response = HttpResponse(open(temp_file/'faviconzip.zip','rb').read())
            response['Content-Type']='application/x-zip-comprssed'
            response['Content-Disposition'] = 'attachment; filename=favicons.zip'

            for file in os.listdir(temp_file):
                os.remove(temp_file/file)
            
            return response
    return HttpResponse("File Cannot Be uploaded")
