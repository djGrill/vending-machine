require 'sinatra'
require 'sinatra/contrib/all'
require 'haml'
require 'json'
require './vending_machine.rb'

machine = VendingMachine.new

get '/' do
  machine.reset_machine
  haml :index
end

get '/get-products' do
  machine.products.to_json
end

post '/reload-products' do
  machine.reload_products
  machine.products.to_json
end

post '/reset-machine' do
  money_returned = machine.reset_machine

  {
    moneyReturned: money_returned
  }.to_json
end

post '/update-money' do
  content_type :json

  amount = params[:amount].to_f
  machine.update_money(amount)

  {
    status: 'OK',
    money_inserted: machine.money_inserted
  }.to_json
end

post '/select-product' do
  content_type :json

  product_selected_index = params[:product_selected_index].to_i

  if machine.product_is_available(product_selected_index)
    machine.select_product(product_selected_index)
    product_selected = machine.products[product_selected_index]

    {
      status: 'OK',
      productName: product_selected[:name],
      productPrice: product_selected[:price]
    }.to_json
  else
    {
      status: 'ERROR',
      message: 'Product not available.'
    }.to_json
  end
end

post '/buy-selected-product' do
  if machine.no_product_selected
    return {
      status: 'ERROR',
      message: 'Please select a product.'
    }.to_json
  end

  if not machine.selected_product_is_available
    return {
      status: 'ERROR',
      message: 'Product not available.'
    }.to_json
  end

  if machine.has_enough_money
    machine.release_product
    change = machine.get_change
    machine.update_money_inserted

    {
      status: 'OK',
      productSelectedIndex: machine.product_selected_index,
      productSelectedAvailable: machine.selected_product[:available],  # get the updated amount of available units of this product
      productName: machine.selected_product[:name],
      change: change
    }.to_json
  else
    {
      status: 'ERROR',
      message: 'Insufficient funds. Please insert more coins.'
    }.to_json
  end
end
