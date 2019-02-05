Rails.application.routes.draw do
  root 'articles#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: [:index]
  namespace :api do
    namespace :v1 do
      resource :login, only: [:create], controller: :sessions
      get :login_state, controller: :sessions
      resources :articles
      resources :upload_files, only: [:create]
      resources :thumbnails, only: [:create]
    end
  end
end
