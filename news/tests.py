from django.test import TestCase
from django.core.urlresolvers import resolve
from news.views import post_list
from django.http import HttpRequest
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
