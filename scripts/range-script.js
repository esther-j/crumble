// from https://codepen.io/andreruffert/pen/yyEVrE
document.addEventListener("DOMContentLoaded", function(event) {
  var $r = $('input[type="range"]');
  var $ruler = $('<div class="rangeslider__ruler" />');
  // Initialize
  $r.rangeslider({
    polyfill: false,
    onInit: function() {
      $ruler[0].innerHTML = getRulerRange(this.min, this.max, this.step);
      this.$range.prepend($ruler);}
  });

  function getRulerRange(min, max, step) {
    return "<0.5mi 0.5-1mi 1-2mi 2-3mi >3mi";
  }
});