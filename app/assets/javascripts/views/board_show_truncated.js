Trellino.Views.BoardShowTruncated = Backbone.View.extend({
  template: JST['board/show_truncated'],
  
  initialize: function(options) {
    this.model = options.model;
    this.listenTo(this.model, "sync", this.render);
    this.$el = $('<li class="board_entry">');
  },
  
  render: function() {
    var content = this.template({
      board: this.model
    });
    
    this.$el.html(content);
    return this;
  }
});