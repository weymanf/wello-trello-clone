Trellino.Views.TodoItemShow = Backbone.View.extend({
  template: JST['todo_item/show'],
  
  initialize: function(options) {
    this.model = options.model;
    this.card = options.card
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function() {
    var content = this.template({
      item: this.model,
      card: this.card
    });
    
    this.$el.html(content);
    
    return this;
  }
});