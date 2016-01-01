from django.shortcuts import render
from .models import Post
from .models import Comment
from django.http import HttpResponse
# Create views here.
# ***WARNING*** this is a one page app (all backbone goes to post_list.html)
#post_show will use post_list view and send via AJAX

def post_list(request):
    if request.method == 'POST':
        comment = Comment()
        comment.text = request.POST.get('comment_text')
        comment.author_id = 1
        comment.post_id = 1

        comment.save()
        return render(request, 'news/post_list.html', {'new_item_text' : request.POST['comment_text']})

    posts = Post.objects.all().order_by('published_date')
    return render(request, 'news/post_list.html', {'posts': posts})



def about(request):
    return render(request, 'news/about.html')

# def about(request):
#     return render(request, 'news/about.html')
