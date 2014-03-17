window.Wello = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	initialize: function() {
		
		new Wello.Routers.AppRouter();

		Backbone.history.start();
	}
};

Backbone.CompositeView = Backbone.View.extend({
	addSubview: function (selector, subview) {
		var selectorSubviews = 
			this.subviews()[selector] || (this.subviews()[selector] = []);
		selectorSubviews.push(subview);

		var $selectorEl = this.$(selector);
		$selectorEl.append(subview.$el);	
	},

	remove: function () {
    Backbone.View.prototype.remove.call(this);

    // remove all subviews as well
    _(this.subviews()).each(function (selectorSubviews, selector) {
      _(selectorSubviews).each(function (subview){
        subview.remove();
      });
    });
  },

	subviews: function() {
		if (!this._subviews) {
			this._subviews = {};
		}

		return this._subviews;
	},

	renderSubviews: function () {
    var view = this;
    
    _(this.subviews()).each(function (selectorSubviews, selector) {
      var $selectorEl = view.$(selector);
      $selectorEl.empty();
     
      _(selectorSubviews).each(function (subview) {
        $selectorEl.append(subview.render().$el);
        subview.delegateEvents();
      });
    });
  }


});

$(document).ready(function(){
	Wello.initialize();
});

