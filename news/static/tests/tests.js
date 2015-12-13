
module( "Hello World");
QUnit.test( "test file is working", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

module ("About the Models")

test("A new post can be created", function(){
  expect(1);
  var whale = new FamiasNews.Models.Post();
  equal(typeof whale, "object");
});

module ("About the Collections")

test("A Post can be added to a Collection", function() {
  expect(2);

var Post = new FamiasNews.Models.Post({
        author: "famia",
        title: "Right Whales",
        text: "Currently, only a handful of very experienced researchers can identify individual whales on sight while out on the water. For the majority of researchers, identifying individual whales takes time, making it difficult to effectively target whales for biological samples, acoustic recordings, and necessary health assessments.",
        image: "http://127.0.0.1:8000/api/images/1449357187.jpg",
        subtitle: "Right whales are the rarest of all large whales.",
        id: 1,
        created_date: "2015-11-21T20:53:23Z",
        published_date: "2015-11-21T11:54:38Z"
    });

var Posts = new FamiasNews.Collections.Posts();
    equal(Posts.length, 0);

    Posts.add(Post)

    equal( Posts.length, 1);
});





// QUnit.test( "initializing in backbone $ is span", function() {
//   equal($('title')[0].text().is('Macbeth'), true);
// })
