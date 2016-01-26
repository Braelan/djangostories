from django.conf.urls import url
from . import views

urlpatterns = [
       url(r'^$', views.post_list, name='post_list'),
       url(r'^about', views.about, name= 'about'),
       url(r'^user', views.new_user, name='new_user'),
       url(r'^index_template', views.index_template)

]
