$(function() {
  $(".coin").click(function() {
    var $this = $(this);
    var coinValue = parseInt($this.data("coin-value"));

    $.post("/update-money", {amount: coinValue});
  });
});
