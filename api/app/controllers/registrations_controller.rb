class RegistrationsController < ApplicationController

    skip_before_action :authenticate, only: [:create]

    def create
        @user = User.new(user_params)
        if @user.save
            payload = { user_id: @user.id }
            token = create_token(payload)
            render json: @user, status: :created
        else
            render json: @user.errors, status: :unprocessable_entity
        end
    end

    private
    def user_params
        params.permit(:email, :username, :password, :password_confirmation)
    end
end
