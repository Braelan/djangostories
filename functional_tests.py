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

        self.assertTrue(
            any(list_item.text =='Right Whales' for list_item in list_items)
        )
        about = self.browser.find_element_by_id('about')
        self.assertIn('about', about.text)

# When post is clicked, it leads to a post page with the link as the title
    def test_move_to_show_page(self):
        self.browser.get('http://localhost:8000')
        list_items = self.browser.find_elements_by_tag_name('a')
        test_item = list_items[1]
        link_title = test_item.text
        test_item.click()
        self.browser.implicitly_wait(3)
        page_title = self.browser.find_element_by_tag_name('h2').text
        self.assertTrue(page_title == link_title)

# the front page has about
# from the front page, clicks about and sees 'About' in title
# can navigate straight to a post page

    # def test_direct_move_to_show_page(self):
    #     self.browser.get('http://localhost:8000/#post/1')
    #     header = self.browser.find_element_by_tag_name('h2').text
    #     self.assertTrue(header.len() > 0)

    def test_can_view_about(self):
        # can visit the about page and see an image
        self.browser.get('http://localhost:8000/')
        about = self.browser.find_element_by_id('about')
        about.click()
        self.assertIn('About', self.browser.title)
        self.fail('Finish the test!')

if __name__ == '__main__':
    unittest.main()
