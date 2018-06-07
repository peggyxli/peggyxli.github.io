$(".card button").click(function() {
    $(this).parent().next().stop(true).slideToggle(500);
    $(this).toggleClass("rotate-me");
});
