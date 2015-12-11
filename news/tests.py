from django.test import TestCase
from django.core.urlresolvers import resolve
from news.views import post_list
from news.views import about
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

    def test_about_url_resolves_to_about_page(self):
        found = resolve('/about')
        self.assertEqual(found.func, about)

    def test_about_page_returns_good_html(self):
        request = HttpRequest()
        response = about(request)
        self.assertIn(b'<html>', response.content)
        self.assertIn(b'</img>', response.content)
