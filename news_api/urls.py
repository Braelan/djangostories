from django.conf.urls import url
from . import views

urlpatterns = [
  url(r'^posts$', views.get, name='posts'),
  url(r'^post/(?P<pk>[0-9]+)/$', views.get_post, name='post')

]
