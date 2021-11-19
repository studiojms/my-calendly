Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post 'login', to: 'authentication#login'

  post 'sign_up', to: 'registrations#create'

  get 'test', to: 'test#index'
end