from django.shortcuts import get_object_or_404
from django.shortcuts import get_list_or_404
from django.core.urlresolvers import reverse
from django.shortcuts import render
from django.http import JsonResponse
from news.serializers import PostSerializer
from rest_framework import views
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from news.models import Post

class PostCreateReadView(ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)




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
