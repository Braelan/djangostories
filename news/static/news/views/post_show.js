FamiasNews.Views.PostShow = Backbone.View.extend({


  initialize: function(options) {
    this.model = options.model
  },

  render: function() {

     this.$el.html("Look out! from your post show view")
     return this
  }


})
