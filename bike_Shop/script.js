$(function () {
  $("#datepicker").datepicker();
});
$(function () {
  var availableBikes = [
    "Quinn",
    "Raven ",
    "Pegasus",
    "Bumblebee",
    "Bucephalus",
    "Bonnie++",
    "Led Zepplin",
    "Apache",
    "Regalia",
  ];
  $("#bikes").autocomplete({
    source: availableBikes,
  });
});
