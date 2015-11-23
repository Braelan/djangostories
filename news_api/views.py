from django.shortcuts import get_object_or_404
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import views
from news.models import Post



# def get(self, request, post_id):
#         post = get_object_or_404(Post.objects.all(), pk=post_id)
#         results = {
#             'title': post.title,
#             'author': post.author,
#             'text': post.text,
#             'created_date': post.created_date,
#             'published_date': post.created_date
#
#         }
#         return render("wow")
def get(request):
    post = get_object_or_404(Post.objects.all(), pk=2)
    # data = serializers.serialize('json', post)
    results = {
                 'title': post.title,
                 'author': post.author,
                 'text': post.text,
                'created_date': post.created_date,
                 'published_date': post.created_date

             }
    return JsonResponse(dict(title=post.title, text=post.text))


# Create your views here.
