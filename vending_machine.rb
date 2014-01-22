# specify product price in pence
PRODUCTS = {
  "Water" => 200,
  "Apple Juice" => 250,
  "Manog Juice" => 300
}


class VendingMachine
  attr_writer :amount_available

  def initialize
    reset_machine
  end

  def reset_machine
    @amount_available = 0
  end

  def amount_available
    sprintf("%.2f", @amount_available)
  end

  def update_money amount
    @amount_available += amount
    @amount_available = @amount_available.round(2)
  end
end
