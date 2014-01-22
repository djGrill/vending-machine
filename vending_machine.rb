class VendingMachine
  attr_accessor :products, :product_selected_index
  attr_writer :money_inserted

  def initialize
    reset_machine
    reload_products
  end

  def reset_machine
    money_returned = @money_inserted
    @money_inserted = 0
    @product_selected_index = -1

    return money_returned
  end

  def reload_products
    # specify product price in pound.pence
    @products = [
      {name: "Water", price: 2.00, available: 1},
      {name: "Apple Juice", price: 2.50, available: 2},
      {name: "Mango Juice", price: 3.00, available: 3}
    ]
  end

  def money_inserted
    sprintf("%.2f", @money_inserted)
  end

  def update_money amount
    @money_inserted += amount
    @money_inserted = @money_inserted.round(2)
  end

  def select_product product_selected_index
    @product_selected_index = product_selected_index
  end

  def selected_product
    @products[@product_selected_index]
  end

  def product_is_available product_index
    @products[product_index][:available] > 0
  end

  def no_product_selected
    @product_selected_index == -1
  end

  def selected_product_is_available
    @products[@product_selected_index][:available] > 0
  end

  def has_enough_money
    print "@money_inserted: "
    puts @money_inserted
    print "selected_product[:price]: "
    puts selected_product[:price]

    @money_inserted >= selected_product[:price]
  end

  def release_product
    selected_product[:available] -= 1
  end

  def update_money_inserted
    @money_inserted = 0
  end

  def get_change
    money_inserted.to_f - selected_product[:price]
  end
end
