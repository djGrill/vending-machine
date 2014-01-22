$(function() {
  $(".coin").click(function() {
    var $this = $(this);
    var coinValue = parseFloat($this.data("coin-value"));

    $.post(
      "/update-money",
      {
        amount: coinValue
      },
      function(data) {
        $("#display .money-inserted").html("&#xa3;" + data.amount_available.toString());
      }
    );
  });
});
