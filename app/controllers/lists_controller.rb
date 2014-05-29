class ListsController < ApplicationController
  
  def index
    @lists = List.where("board_id = ?", params[:board_id])

    respond_to do |format|
      format.json { render 'lists/index' }
    end
  end
  
  def create
    @list = List.new(list_params)
    
    if @list.save
      respond_to do |format|
        format.json { render 'lists/show' }
      end
    else
      render json: { errors: @list.errors.full_messages }, status: 422
    end
  end
  
  def update
    @list = List.find(params[:id])
    @list.update_attributes(list_params)
    
    if @list.save
      respond_to do |format|
        format.json { render 'lists/show' }
      end
    else
      render json: { errors: @list.errors.full_messages }, status: 422
    end
  end
  
  def destroy
    @list = List.find(params[:id])
    @list.destroy
    render json: nil
  end

  private
  def list_params
    params.require(:list).permit(:title, :rank, :board_id)
  end
end
