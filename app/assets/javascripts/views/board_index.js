Trellino.Views.BoardIndex = Backbone.View.extend({
  url: '/boards',
  template: JST['board/index'],
  
  initialize: function(options) {
    this.collection = options.collection;
    this.listenTo(this.collection, "sync", this.render);   
    this.subviews = []; 
  },
  
  render: function() {
    var content = this.template({
      boards: this.collection
    });
    
    this.$el.html(content);
    
    var indexView = this;
    
    this.collection.each(function(board) {
      var boardShowTruncated = new Trellino.Views.BoardShowTruncated({
        model: board
      });
      
      indexView.subviews.push(boardShowTruncated);
      $('#all-the-boards').append(boardShowTruncated.render().$el);
    });
    
    var newBoardForm = new Trellino.Views.BoardNew();

    this.subviews.push(newBoardForm);
    $('#new-board-form').html(newBoardForm.render().$el);
    
    return this;
  },
  
  remove: function() {
    this.subviews.forEach(function(subview) {
      subview.remove();
    });
    
    Backbone.View.prototype.remove.call(this);
  }
});