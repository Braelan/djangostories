FamiasNews.Views.PostShow = Backbone.View.extend({


  initialize: function(options) {
    this.model = options.model
    this.listenTo(this.collection, 'sync', this.render)
    this.id = options.id
  },

  render: function() {
     var model = this.collection.getOrFetch(this.id);
     var body = this.model.escape('title');
     this.$el.html(body);
     return this;
  }


})
