from django.shortcuts import get_object_or_404
from django.shortcuts import get_list_or_404
from django.core.urlresolvers import reverse
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.sessions.models import Session
from news.serializers import PostSerializer
from news.serializers import UserSerializer
from rest_framework import views
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import authentication
from news.models import Post
from news.models import Comment


class PostsCreateReadView(ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class PostCreateReadView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes =(IsAuthenticatedOrReadOnly,)

class UserCreateReadView(APIView):
    def get(self, request):

        if request.user.is_authenticated():
            print request.user.is_authenticated()
            user = UserSerializer(request.user)
            return Response( user.data)
        else:
             return Response({"status": "logged out"})





# Create your views here.
