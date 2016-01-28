FamiasNews.Models.Post = Backbone.Model.extend({
  urlRoot: "/api/posts",

  parse: function(payload) {
    payload.text = this._processText(payload.text)
    return payload;
  },



  _processText: function(text) {
    if (typeof text != "undefined") {
    text = text.replace(/\n/g, '<br>');
    return text;
  } else { return ""}
}
})
