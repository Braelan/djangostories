from django.conf.urls import patterns, url
from . import views

urlpatterns = patterns("",
    url(
        regex=r'posts$',
        view = views.PostsCreateReadView.as_view(),
        name = "post_rest_api"
    ),
    url(regex=r'^posts/(?P<pk>[0-9]+)/$',
        view=views.PostCreateReadView.as_view(),
        name='post_detail'),
    url(regex=r'^currentUser$',
        view= views.UserCreateReadView.as_view())
)

# urlpatterns = [
#   url(r'^posts$', view= views.PostCreateReadView.as_view(), name='posts'),
#   url(r'^posts/(?P<pk>[0-9]+)/$', views.get_post, name='post_detail')
#
# ]
