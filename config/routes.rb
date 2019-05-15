Rails.application.routes.draw do
  root 'articles#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: [:index]
  namespace :api do
    namespace :v1 do
      resource :login, only: [:create], controller: :sessions
      get :login_state, controller: :sessions
      resources :articles, only: [:index, :show, :update, :create, :destroy] do
        collection do
          get :search
          get :archive
          post :update_publish_status
          post :tweet
        end
      end
      resources :upload_files, only: [:create]
      resources :thumbnails, only: [:create]
      resources :categories, only: [:index]
      resources :advertisements, only: [:index]
      resources :blog_informations, only: [:index]
      post 'contacts/send_contact', to: 'contacts#send_contact'
      resources :comments, only: [:index, :create, :destroy]
    end
  end
end
