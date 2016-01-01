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
from news.models import Comment

class PostCreateReadView(ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)




def get_post(request, pk):
    post = get_object_or_404(Post.objects.all(), pk=pk)
    comments, length = comments_dict(post.comments.all())
    string = {'check1': "check2"}
    postprejson = dict(id= post.id, title=post.title,
                       text=post.text,
                    author=post.author.username,
                    created_date = post.created_date,
                    published_date=post.published_date,
                    comment_list = comments,
                    length = length
                   )
    return JsonResponse(postprejson)

def comments_dict(comments):
  list = {};
  count = 0
  for idx, comment in enumerate(comments):
      list[idx] = comment.text
      count = count + 1
  return list, count




# Create your views here.
