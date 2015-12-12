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
        # assert 'Famia' in browser.title
        #
        self.browser.get('http://localhost:8000')

        self.assertIn('Famia', self.browser.title)
        # Can see F.A.N.Kansa as a header
        header_text = self.browser.find_element_by_tag_name('h1').text
        self.assertIn('F.A.Nkansa', header_text)

        list_items = self.browser.find_elements_by_tag_name('a')
        for list_item in list_items:
            print list_item.text
        self.assertTrue(
            any(list_item.text =='Right Whales' for list_item in list_items)
        )
        about = self.browser.find_element_by_id('#about')
        self.assertIn('about', about.text)

# Enter the site and see '
#'
# When Macbeth is clicked, it leads to a post page
#
# the post page has 'sound and fury' on it
#
# the front page has about
# from the front page, clicks about and sees 'Lorem ipsum'

    def test_can_view_about(self):
        # can visit the about page and see an image
        self.browser.get('http://localhost:8000/about')
        self.assertIn('About', self.browser.title)
        self.fail('Finish the test!')

if __name__ == '__main__':
    unittest.main()
