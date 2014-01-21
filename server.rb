require 'sinatra'
require 'sinatra/contrib/all'
require 'haml'

get "/" do
  haml :index
end

post "/update-money" do
  amount = params[:amount]
end
