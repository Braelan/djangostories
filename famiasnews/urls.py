from django.conf.urls import patterns, include, url
from django.contrib.auth.models import User
from rest_framework import views
from django.contrib import admin
admin.autodiscover()

urlpatterns = [
    # Examples:
    # url(r'^$', 'famiasnews.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    # 'about' is a static url, and is in famiasnews


    url(r'^admin/', include(admin.site.urls)),
    url(r'', include('news.urls')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/' , include('news_api.urls')),
    url(r'^about', include('news.urls'), name='about_page'),
]
