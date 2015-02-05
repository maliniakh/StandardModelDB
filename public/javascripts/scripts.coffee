$(document).ready ->
  # watermarking
  watermark = "Particle name..."
  $queryTextbox = $("#queryTextbox")
  if $queryTextbox.val().length is 0
    $queryTextbox.val(watermark).addClass("watermark")

  $("#queryTextbox").blur(->
    if $queryTextbox.val().length is 0
      $queryTextbox.val(watermark).addClass("watermark")
  ).focus ->
    if $queryTextbox.hasClass("watermark")
      $queryTextbox.val("").removeClass("watermark")

  $("#searchDiv").submit ->
    if $queryTextbox.hasClass("watermark")
      $queryTextbox.val("")
    $("#groupCombo option").eq(0).text("")

  # main div width setting (to fit in 3 particle divs in a row)
  $particle = $(".particle")
  if($particle.length > 0)
    width = 3 * $particle.first().outerWidth(true)
    $("#main").width(width)
    $('#searchDiv').width(width);

  $("#groupCombo").change ->
    $("#searchForm").submit();

  $("#groupCombo option").eq(0).text("All particles")