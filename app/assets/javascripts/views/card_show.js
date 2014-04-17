window.Wello.Views.CardShowView = Backbone.CompositeView.extend({
	template: JST["card/card_show"],
	className: function() {
		return 'card data-id=' + this.model.get("id");
	},

	id: "draggable",

	render: function() {
		var cardShow = this.template({
			card: this.model
		})
		this.$el.html(cardShow);
		return this;
	}




})