window.Wello.Views.CardShowView = Backbone.CompositeView.extend({
	template: JST["card/card_show"],
	className: 'card data-id=',

	render: function() {
		var cardShow = this.template({
			card: this.model
		})
		this.$el.html(cardShow);
		return this;
	}



})