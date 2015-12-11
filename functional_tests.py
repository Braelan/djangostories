from selenium import webdriver
import unittest
# goes to browser and sees famia in title

class NewVisitorTest(unittest.TestCase):
    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(3)

    def tearDown(self):
        self.browser.quit()

    def test_can_view_index(self):
        self.browser.get('http://localhost:8000')
        self.assertIn('Famia', self.browser.title)

# assert 'Famia' in browser.title
#
# Enter the site and see a post with Macbeth
#
# When Macbeth is clicked, it leads to a post page
#
# the post page has 'sound and fury' on it
#
# from the front page, clicks about and sees 'Lorem ipsum'

    def test_can_view_about(self):
        # can visit the about page and see an image
        self.browser.get('http://localhost:8000/about')
        self.assertIn('About', self.browser.title)
        self.fail('Finish the test!')

if __name__ == '__main__':
    unittest.main()
