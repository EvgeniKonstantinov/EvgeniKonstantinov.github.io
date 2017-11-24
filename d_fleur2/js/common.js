var isMobile = false;
$(document).ready(function() {

    $('#catalog_grid').mixItUp({
        load: {
            filter:'.category-1'
        }
    });

    $('.filter_div li').click(function () {
        $('.s_catalog li').removeClass("active");
        $(this).addClass("active");
    });


    if ($('body').width() <= 986){
        isMobile = true;
    }
    if (isMobile) {
        $(this)

    }
    if (!isMobile) {
        $('#item1 div').animated("fadeInDown","fadeOutUp");
        $('#item3 div').animated("fadeInDown","fadeOutUp");
    }
    $('.popup').magnificPopup({type:'image'});
    $('.popup_content').magnificPopup({type: "inline", midClick: true, closeOnContentClick: true});
    $('.top_text h1').animated("fadeInDown","fadeOutUp");
    $('.top_text p').animated("fadeInUp","fadeOutDown");
    $('.section_heder').animated("fadeInUp", "fadeOutDown");

    function heightDetect() {
        $(".main_head").css('height', $(window).height());
    }
    heightDetect();
	$(window).resize(function () {
        heightDetect();
    });

    $(function () { $("input,select,textarea").not("[type=submit]").jqBootstrapValidation(); } );
});

$(window).load(function() {
    $(".loader_inner").fadeOut();
    $(".loader").delay(400).fadeOut("slow");
});
$("#item1").click(function () {
    console.log("click");
    $('#item1_1').css("display", "block");
    $('.items').css("display", "none");


});

$("#close_item1").click(function () {
    $(".items").css("display", "block");
    $("#item1_1").css("display", "none");
});

$("#item2").click(function () {
    console.log("click");
    $(".items").css("display", "none");
    $("#item2_1").css("display", "block");
});

$("#close_item2").click(function () {
    $(".items").css("display", "block");
    $("#item2_1").css("display", "none");
});

$("#item3").click(function () {
    console.log("click");
    $(".items").css("display", "none");
    $("#item3_1").css("display", "block");
});

$("#close_item3").click(function () {
    $(".items").css("display", "block");
    $("#item3_1").css("display", "none");
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

