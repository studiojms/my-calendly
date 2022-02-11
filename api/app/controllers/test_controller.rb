class TestController < ApplicationController
  def index
    render json: { test: rand(10_000) }
  end
end
