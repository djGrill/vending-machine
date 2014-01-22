require 'sinatra'
require 'sinatra/contrib/all'
require 'haml'
require 'json'
require './vending_machine.rb'


machine = VendingMachine.new


get "/" do
  machine.reset_machine

  haml :index
end


post "/update-money" do
  content_type :json

  amount = params[:amount].to_f
  machine.update_money(amount)

  {amount_available: machine.amount_available}.to_json
end
