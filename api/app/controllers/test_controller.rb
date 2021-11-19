class TestController < ApplicationController
    def index
        render json: {test: rand(10000)}
    end
end
