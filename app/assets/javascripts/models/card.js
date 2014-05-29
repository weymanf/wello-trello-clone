Trellino.Models.Card = Backbone.Model.extend({
  urlRoot: function() {
    return this.list.showUrl() + '/cards';
  },
  
  initialize: function(options) {
    this.list = options.list;
  },
  
  destroy: function (options) {
    var opts = _.extend({ url: '/cards/' + this.get('id') }, options || {});
    return Backbone.Model.prototype.destroy.call(this, opts);
  },
  
  sync: function(method, model, options) {
    if (method.toLowerCase() === 'update') {
      options = options || {};
      options.url = '/cards/' + this.get('id');
    }
    Backbone.sync(method, model, options);
  },
  
  showUrl: function() {
    return '/cards/' + this.get('id');
  },
  
  toJSON: function() {
    var json = Backbone.Model.prototype.toJSON.call(this);
  
    delete json.id;
    delete json.created_at;
    delete json.updated_at;
  
    return json;
  },
  
  todoItems: function() {
    if (!this._todoItems) {
      this._todoItems = new Trellino.Collections.TodoItems([], {
        card: this
      });
    }
    
    return this._todoItems;
  }
});