class VendingMachine
  attr_accessor :products
  attr_writer :amount_available

  def initialize
    reset_machine
  end

  def reset_machine
    @amount_available = 0

    # specify product price in pence
    @products = [
      {name: "Water", price: 200, available: 1},
      {name: "Apple Juice", price: 250, available: 2},
      {name: "Mango Juice", price: 300, available: 3}
    ]
  end

  def amount_available
    sprintf("%.2f", @amount_available)
  end

  def update_money amount
    @amount_available += amount
    @amount_available = @amount_available.round(2)
  end
end
