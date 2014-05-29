class CardsController < ApplicationController
  def index
    @cards = Card.where("list_id = ?", params[:list_id])
    @list = List.find(params[:list_id])

    respond_to do |format|
      format.json { render 'cards/index' }
    end
  end
  
  def create
    @card = Card.new(card_params)
    @list = List.find(params[:list_id])
    
    if @card.save
      respond_to do |format|
        format.json { render 'cards/show' }
      end
    else
      render json: { errors: @card.errors.full_messages }, status: 422
    end
  end
  
  def show
    @card = Card.find(params[:id])
    @list = List.find(params[:list_id])
    
    if @card
      respond_to do |format|
        format.json { render 'cards/show' }
      end
    else
      render json: { errors: @card.errors.full_messages }, status: 422
    end
  end
  
  def update
    @card = Card.find(params[:id])
    @card.update_attributes(card_params)
    
    if params[:newUserEmail]
      email = params[:newUserEmail]
      new_user = User.find_by_email(email)
      new_user && !@card.users.include?(new_user) && @card.users << new_user
    end
    
    if @card.save      
      respond_to do |format|
        format.json { render 'cards/show' }
      end
    else
      render json: { errors: @card.errors.full_messages }, status: 422
    end
  end
  
  def destroy
    @card = Card.find(params[:id])
    @card.destroy
    render json: nil
  end
  

  private
  def card_params
    params.require(:card).permit(:title, :description, :rank, :list_id)
  end
end
