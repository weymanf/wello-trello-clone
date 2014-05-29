Trellino.Views.ListNew = Backbone.View.extend({
  template: JST['list/new'],
  
  events: {
    "click .newList": "createList"
  },
  
  initialize: function(options) {
    this.board = options.board;
  },
    
  render: function() {
    var content = this.template();
    
    this.$el.html(content);
    return this;
  },
  
  createList: function(event) {
    event.preventDefault();
    
    var title = this.$('#list-title').val();

    var list = new Trellino.Models.List({
      board: this.board,
      title: title,
      board_id: this.board.get('id'),
      rank: this.board.lists().length + 1
    });
    
    var newList = this;
    
    list.save({}, {
      success: function() {
        newList.board.lists().add(list);
      }
    });
  }
});