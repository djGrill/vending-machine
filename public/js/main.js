function getCurrencyValue(number) {
  return("£" + parseFloat(Math.round(number * 100) / 100).toFixed(2));
}

$(function() {
  $(".product").click(function() {
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

          $("#display .money-inserted").html("&#xa3;0.00");
          alert("Enjoy your " + productName + ". You get a change of " + getCurrencyValue(change));
        } else {
          alert(data.message);
        }
      },
      "json"
    );
  });
});
