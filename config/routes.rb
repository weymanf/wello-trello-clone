Trellino::Application.routes.draw do
  resources :boards, only: [:index, :show, :create, :update, :destroy] do
    resources :lists, only: [:index, :create]
  end
  
  resources :lists, only: [:update, :destroy] do
    resources :cards, only: [:index, :create]
  end
  
  resources :cards, only: [:update, :destroy] do
    resources :todo_items, only: [:index, :create]
  end
  
  resources :todo_items, only: [:update, :destroy]
  
  resources :card_assignments, only: :destroy
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :destroy]
  root to: 'boards#index'
end
