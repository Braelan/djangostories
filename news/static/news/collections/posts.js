FamiasNews.Collections.Posts = Backbone.Collection.extend({
  // model: FamiasNews.Models.Post,
  //this will look to root/api/posts and expect there to be some json there.x
  url: "/api/posts",

  getOrFetch: function(id) {
    var post = this.get(id)
    var posts = this;
    if (!post) {
      post = new FamiasNews.Models.Post({id:id});
      post.fetch({
        success: function() {
          posts.add(post);
        }
      })
    } else {
      post.fetch();
    }
    return post;
  },

})
