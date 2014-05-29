Trellino.Views.CardShow = Backbone.View.extend({
  template: JST['card/show'],

  tagName: 'li',
  
  initialize: function(options) {
    this.model = options.model;
    this.list = options.list;
    this.listenTo(this.model, "sync", this.render);
    this.subviews = [];
  },
  
  events: {
    "click .delete-card": "deleteCard"
  },
  
  deleteCard: function(event) {
    event.preventDefault();
    var cardId = $(event.currentTarget).data('id');
    var card = this.list.cards().get(cardId);
    
    var cardShow = this;
    
    card.destroy({
      success: function() {
        cardShow.list.cards().remove(card);
      }
    });
  },
  
  render: function() {
    var content = this.template({
      card: this.model,
      list: this.list
    });
    
    this.$el.html(content);
   
    return this;
  },
  
  remove: function() {
    this.subviews.forEach(function(subview) {
      subview.remove();
    });
    
    Backbone.View.prototype.remove.call(this);
  }
});