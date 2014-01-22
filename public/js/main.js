function getCurrencyValue(number) {
  return("£" + parseFloat(Math.round(number * 100) / 100).toFixed(2));
}

function resetDisplay() {
  var $display = $("#display");
  $display.find(".product-name").html("None");
  $display.find(".product-price").html(getCurrencyValue(0));
  $display.find(".money-inserted").html(getCurrencyValue(0));
}

function resetMachine() {
  $.post("/reset-machine");
}

function cancelPurchase() {
  $.post(
    "/reset-machine",
    function(data) {
      alert("You get " + getCurrencyValue(data.moneyReturned) + " back.");
    },
    "json"
  );
}

function getProducts() {
  $.get(
    "/get-products",
    function(data) {
      var $products = $("#products");
      $products.html("");

      for (index in data) {
        var product = data[index];

        var $newProduct = $("<div class='product' data-product-index='" + index + "'>");
        var $newProductName = $("<div class='name'>Name: </div>");
        var $newProductPrice = $("<div class='price'>Price: </div>");
        var $newProductAvailable = $("<div class='available'>Available: </div>");

        $newProductName.append(product.name);
        $newProductPrice.append(getCurrencyValue(product.price));
        $newProductAvailable.append("<span class='value'>" + product.available + "</span>");

        $newProduct.append($newProductName).append($newProductPrice).append($newProductAvailable);
        $products.append($newProduct);
      }
    },
    "json"
  );
}


$(function() {
  resetDisplay();
  getProducts();

  $(document).on("click", ".product", function() {
    var $this = $(this);
    var productSelectedIndex = $this.data("product-index");

    $.post(
      "/select-product",
      {
        product_selected_index: productSelectedIndex
      },
      function(data) {
        if (data.status == "OK") {
          $("#display .product-name").html(data.productName);
          $("#display .product-price").html(getCurrencyValue(data.productPrice));
        } else {
          alert(data.message);
        }
      },
      "json"
    );
  });


  $(".coin").click(function() {
    var $this = $(this);
    var coinValue = $this.data("coin-value");

    $.post(
      "/update-money",
      {
        amount: coinValue
      },
      function(data) {
        $("#display .money-inserted").html("&#xa3;" + data.money_inserted.toString());
      },
      "json"
    );
  });


  $("#buy").click(function() {
    $.post(
      "/buy-selected-product",
      function(data) {
        if (data.status == "OK") {
          var productSelectedIndex = data.productSelectedIndex;
          var productSelectedAvailable = data.productSelectedAvailable;
          var productName = data.productName;
          var change = data.change;

          // # update the amount of available units of this product
          $(".product .available .value:eq(" + productSelectedIndex + ")").html(productSelectedAvailable);

          resetDisplay();
          resetMachine();

          alert("Enjoy your " + productName + ". You get a change of " + getCurrencyValue(change));
        } else {
          alert(data.message);
        }
      },
      "json"
    );
  });

  $("#cancel").click(function() {
    resetDisplay();
    cancelPurchase();
  });

  $("#reload-products").click(function() {
    $.post(
      "/reload-products",
      function(data) {
        getProducts();
      },
      "json"
    );
  });
});
