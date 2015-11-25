from django.shortcuts import get_object_or_404
from django.shortcuts import get_list_or_404
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
 # this is the json response that goes to api/posts.
 # Backbone picks this up when it fetches the collection in famiasnews.js
 # the collection url is set to api/posts in news/static/news/collections/posts

    posts = get_list_or_404(Post)

    postdict = []
    for post in posts:
            postdict.append( dict(id=post.id,
                                   title=post.title, text=post.text,
                                   author=post.author.username, created_date=post.created_date,
                                    published_date=post.published_date))
    return JsonResponse(postdict, safe=False)

# Create your views here.
