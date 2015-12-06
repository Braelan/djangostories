from django.shortcuts import get_object_or_404
from django.shortcuts import get_list_or_404
from django.core.urlresolvers import reverse
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import views
from rest_framework.response import Response
from news.models import Post


def get(request):
 # json response goes to api/posts.
 # Backbone fetches the collection in famiasnews.js
 # the collection url is set to api/posts in news/static/news/collections/posts

    posts = get_list_or_404(Post)

    postdict = []
    for post in posts:
        #correct for empty image field
      if post.image == None:
        imagestring = ""
      else:
        imagestring = "./static/" + post.image.url
      postdict.append( dict(id=post.id,
                                   title=post.title, text=post.text,
                                   author=post.author.username, created_date=post.created_date,
                                    published_date=post.published_date,
                                    subtitle=post.subtitle,
                                    image= imagestring
                                    ))

    return JsonResponse(postdict, safe=False)


def get_post(request, pk):
    post = get_object_or_404(Post.objects.all(), pk=pk)
    print post
    postprejson = dict(id= post.id, title=post.title,
                       text=post.text,
                    author=post.author.username,
                    created_date = post.created_date,
                    published_date=post.published_date,

                   )



    return JsonResponse(postprejson)







# Create your views here.
