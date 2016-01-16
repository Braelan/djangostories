from django.test import TestCase
from django.core.urlresolvers import resolve
from django.template.loader import render_to_string
from news.views import post_list
from news.views import about
from django.http import HttpRequest
from .models import Comment
from .models import Post
from django.contrib.auth.models import User

# Create your tests here.
class HomePageTest(TestCase):

    def test_root_url_resolves_to_index_view(self):
        found = resolve('/')
        self.assertEqual(found.func, post_list)

    def test_home_page_returns_correct_html(self):
        request = HttpRequest()
        response = post_list(request)
        self.assertIn(b'<html>', response.content)
        self.assertIn(b'<title>Famia Nkansa</title>', response.content)
        self.assertIn(b'</html>', response.content)

    def test_about_url_resolves_to_about_page(self):
        found = resolve('/about')
        self.assertEqual(found.func, about)

    def test_about_page_returns_html_and_img_tags(self):
        request = HttpRequest()
        response = about(request)
        self.assertIn(b'<html>', response.content)
        self.assertIn(b'</img>', response.content)

    def test_post_list_can_save_POST_request(self):
        a_user = User()
        a_user.save()
        a_post = Post()
        a_post.author_id = 1
        a_post.save()

        request = HttpRequest()
        request.method = 'POST'
        request.POST['comment_text'] = 'A new Comment'

        response = post_list(request)

        self.assertIn('A new Comment', response.content.decode())
        expected_html = render_to_string('news/post_list.html', {'new_item_text': 'A new Comment'})
        self.assertEqual(response.content.decode(), expected_html)

class CommentModelTest(TestCase):

    def test_saving_and_retrieving_models(self):
        a_user = User()
        a_user.save()
        a_post = Post()
        a_post.author_id = 1
        a_post.save()


        first_comment = Comment()
        first_comment.text = 'This is a Test (comment)'
        first_comment.author_id = 1
        first_comment.post_id = 1
        first_comment.save()

        second_item = Comment()
        second_item.text = 'This is another test (comment)'
        second_item.author_id = 1
        second_item.post_id = 1
        second_item.save()

        saved_items = Comment.objects.all()
        first_saved_item = saved_items[0]
        second_saved_item = saved_items[1]
        self.assertTrue(saved_items.count() > 1)
        self.assertEqual(first_saved_item.text, 'This is a Test (comment)')
        self.assertEqual(second_saved_item.text, "This is another test (comment)")

class UserModelTest(TestCase):

    def test_saving_and_retrieving_users(self):
        new_user = User()
        new_user.username = 'Nemo'
        new_user.id = 3
        new_user.email = "emo@nemo.com"
        new_user.first_name = 'Nemo'
        new_user.last_name = 'the Fish'

        new_user.save()

        saved_users = User.objects.all()
        first_saved_user = saved_users[0]

        self.assertTrue(saved_users.count > 10)
        self.assertEqual(first_saved_user.email, 'emo@nemo.com')
