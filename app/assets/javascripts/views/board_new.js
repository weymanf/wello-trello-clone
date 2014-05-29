Trellino.Views.BoardNew = Backbone.View.extend({
  template: JST['board/new'],
  
  events: {
    "click .newBoard": "createBoard"
  },
  
  render: function() {
    var content = this.template();
    
    this.$el.html(content);
    return this;
  },
  
  createBoard: function(event) {
    event.preventDefault();
    var title = this.$('#board-title').val();
    var board = new Trellino.Models.Board({
      title: title
    });
    
    board.save({}, {
      success: function() {
        Trellino.Collections.boards.add(board);
        Backbone.history.navigate(
          'boards/' + board.get('id'),
          { trigger: true }
        );
      }
    });
  }
});