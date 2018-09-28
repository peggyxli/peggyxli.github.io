$(".card-header").click(function() {
    $(this).next().stop(true).slideToggle(500);
    $(this).find("i").toggleClass("rotate-me");
});
