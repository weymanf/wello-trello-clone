window.Wello.Views.ListShowView = Backbone.CompositeView.extend({
	template: JST["list/list_show"],
	className: "list",

	events: {
		"click .add-a-card": "addForm"
	},

	initialize: function() {
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.cards(), "add", this.addCard)

		
		this.model.cards().each(this.addCard.bind(this));
		var cardsNewView = new Wello.Views.CardsNewView({
			list: this.model
		})

		this.addSubview(".cards-new-form", cardsNewView);
	},

	addForm: function(event) {
		$(event.currentTarget).prev().css("display","initial")
		$(event.currentTarget).css("display","none")
	},

	addCard: function(card) {
		var cardsShowView = new Wello.Views.CardShowView({
			model: card
		});
	
		this.addSubview(".cards-show", cardsShowView);
		cardsShowView.render();
	},


	render: function() {
		var listShow = this.template({
			list: this.model
		})
		this.$el.html(listShow);
		this.renderSubviews();
		return this;
	}



})