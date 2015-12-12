from django.shortcuts import render
from .models import Post
from django.http import HttpResponse
# Create your views here.
def post_list(request):
    posts = Post.objects.all().order_by('published_date')
    return render(request, 'news/post_list.html', {'posts': posts})

def about(request):
    return render(request, 'news/about.html')

# def about(request):
#     return render(request, 'news/about.html')
