Trellino.Views.TodoItemNew = Backbone.View.extend({
  template: JST['todo_item/new'],
  
  events: {
    "submit #new-todo-form": "createTodoItem"
  },
  
  initialize: function(options) {
    this.card = options.card;
  },
    
  render: function() {
    var content = this.template();
    
    this.$el.html(content);
    return this;
  },
  
  createTodoItem: function(event) {
    event.preventDefault();
    
    var title = this.$('#todo-title').val();

    var todoItem = new Trellino.Models.TodoItem({
      title: title,
      card: this.card,
      card_id: this.card.get('id'),
      rank: this.card.todoItems().length + 1
    });
    
    var newTodoItem = this;
    
    todoItem.save({}, {
      success: function() {
        newTodoItem.card.todoItems().add(todoItem);
      }
    });
  }
});