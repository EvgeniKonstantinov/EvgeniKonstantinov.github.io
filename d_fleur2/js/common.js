$(document).ready(function() {

    $('.top_text h1').animated("fadeInDown","fadeOutUp");
    $('.top_text p').animated("fadeInUp","fadeOutDown");
    $('.section_heder').animated("fadeInUp", "fadeOutDown")

    function heightDetect() {
        $(".main_head").css('height', $(window).height());
    }
    heightDetect();
	$(window).resize(function () {
        heightDetect();
    })
});

$(window).load(function() {
    $(".loader_inner").fadeOut();
    $(".loader").delay(400).fadeOut("slow");
});

$('.toggle_menu').click(function () {
    if ($('.top_menu').is(":visible")){
        $('.top_menu').fadeOut(600);
        $('.top_menu li a').removeClass("fadeInUp animated");
    } else{
        $('.top_menu').fadeIn(600);
        $('.top_menu li a').addClass("fadeInUp animated");
    }
});

$(".toggle_menu").click(function() {
    $(".sandwich").toggleClass("active");
}
);

$('.top_menu ul a').click(function () {
    $('.top_menu').fadeOut(600);
    $(".sandwich").toggleClass("active");

});

