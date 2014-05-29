Trellino.Models.TodoItem = Backbone.Model.extend({
  urlRoot: function() {
    return this.card.showUrl() + '/todo_items';
  },
  
  initialize: function(options) {
    this.card = options.card;
  },
  
  toJSON: function() {
    var json = Backbone.Model.prototype.toJSON.call(this);
  
    delete json.id;
    delete json.created_at;
    delete json.updated_at;
  
    return json;
  }
});