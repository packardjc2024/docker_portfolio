$(document).ready(function(){
    changeHeaderHeight();
    changeFooterHeight();
});

$(window).on('resize', function(){
    changeHeaderHeight();
    changeFooterHeight();
});


function changeHeaderHeight(){
    let headerHeight = $('.top-navbar').height();
    $('#main').css('margin-top', `${headerHeight}px`);
}


function changeFooterHeight(){
    let footerHeight = $('.bottom-navbar').height();
    $('#main').css('margin-bottom', `${footerHeight}px`);
}