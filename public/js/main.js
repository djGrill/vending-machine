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
          $("#display .product-price").html("&#xa3;" + data.productPrice);
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
          console.log(data);

          var productName = data.productName;
          var change = data.change;

          $("#display .money-inserted").html("&#xa3;0");
          alert("Enjoy your " + productName + ". You get a change of £" + Math.round(change * 100) / 100)
        } else {
          alert(data.message);
        }
      },
      "json"
    );
  });
});
