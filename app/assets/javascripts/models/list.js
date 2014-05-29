Trellino.Models.List = Backbone.Model.extend({
  urlRoot: function() {
    return this.board.url() + '/lists';
  },
  
  initialize: function(options) {
    this.board = options.board;
  },
  
  destroy: function (options) {
    var opts = _.extend({ url: '/lists/' + this.id }, options || {});
    return Backbone.Model.prototype.destroy.call(this, opts);
  },
  
  sync: function(method, model, options) {
    if (method.toLowerCase() === 'update') {
      options = options || {};
      options.url = '/lists/' + this.get('id');
    }
    Backbone.sync(method, model, options);
  },
  
  showUrl: function() {
    return '/lists/' + this.get('id');
  },
  
  toJSON: function() {
    var json = Backbone.Model.prototype.toJSON.call(this);

    delete json.id;
    delete json.created_at;
    delete json.updated_at;

    return json;
  },
  
  cards: function() {
    if (!this._cards) {
      this._cards = new Trellino.Collections.Cards([], {
        list: this
      });
    }
    
    return this._cards;
  }
});