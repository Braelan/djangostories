from django.shortcuts import render
from .models import Post
from .models import Comment
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User, Permission
from django.contrib.auth import login, authenticate, logout
from django.http import JsonResponse
# Create views here.
# ***WARNING*** this is a one page app (all backbone goes to post_list.html)
#post_show will use post_list view and send via AJAX

def post_list(request):
    if request.method == 'POST':
        comment = Comment()
        comment.text = request.POST.get('comment_text')
        comment.author_id = 1
        comment.post_id = request.POST.get('post_id')

        comment.save()
        return render(request, 'news/post_list.html', {'new_item_text' : request.POST['comment_text']})

    posts = Post.objects.all().order_by('published_date')
    return render(request, 'news/post_list.html', {'posts': posts})



def about(request):
    return render(request, 'news/about.html')

# def about(request):
#     return render(request, 'news/about.html')

def new_user(request):
    url = request.META.get('HTTP_REFERER')
    if request.method == 'POST' and not request.POST.get('login') == 'true':
        username = request.POST.get('username')
        first_name = request.POST.get('name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = User.objects.create_user(username, email, password)
        permission = Permission.objects.get(name= 'Can add comment')
        user.user_permissions.add(permission)
        user.save()
        user = authenticate(username=username, password=password)
        login(request, user)
        return JsonResponse({'username': user.username})
#handle logout
    elif request.method =='POST':
        username = signIn(request)
        return JsonResponse({'username': username})

    else:
        url = request.META.get('HTTP_REFERER')
        logout(request)
        return HttpResponseRedirect(url)


def signIn(request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        print 'THIS IS THE' + request.POST.get('username')
        user = User.objects.get(username=username)
        user = authenticate(username=username, password=password)
        login(request, user)

        return username
