// $(document).ready(function(){
//     changeHeaderHeight();
//     changeFooterHeight();
// });

// $(window).on('resize', function(){
//     changeHeaderHeight();
//     changeFooterHeight();
// });


// function changeHeaderHeight(){
//     let headerHeight = $('.top-navbar').height();
//     $('#main').css('margin-top', `${headerHeight}px`);
// }


// function changeFooterHeight(){
//     let footerHeight = $('.bottom-navbar').height();
//     $('#main').css('margin-bottom', `${footerHeight}px`);
// }


// Throttle the scrolling on the page.
let throttled;
let sections;
let direction;
let index;
let throttleSpeed;
let scrollLength;
let scrollMove;
let backgrounds;

$(document).ready(() => {
    throttled = true;
    index = 0;
    direction = 1;
    throttleSpeed = 500;
    scrollMove = 100;
    scrollMove = $(window).height() / 2;
    sections = document.querySelectorAll(".section");
    backgrounds = [
        'black',
        'purple',
        'blue',
        'green',
        'black'
    ];
    setTimeout(() => throttled = false, 3000);
});

window.addEventListener('wheel', handleScroll, {passive: false});

function handleScroll(event) {
    // Prevent default scrolling behavior
    event.preventDefault();
    scrollLength = event.deltaY;

    // Check is scrolling is throttled or for rapid short scrolls
    if (throttled || Math.abs(scrollLength) < 20) return;

    // Get the scroll direction using the event
    throttled = true;
    // direction = event.deltaY > 0 ? 1 : -1;
    scrollLength > 0 ? scrollDown() : scrollUp();

    setTimeout(() => throttled = false, throttleSpeed);
}

function scrollDown(){
    let moveTo;
    let nextSection;
    let section = $(`#${sections[index].id}`);
    let sectionBottom = section.offset().top + section.outerHeight(true);
    let scrollPosition = $(window).scrollTop();
    let windowBottom = scrollPosition + $(window).height();

    // Check if at bottom of section
    if (windowBottom + scrollLength <= sectionBottom){
        moveTo = `+=${scrollMove}px`;
    } else if (index + 1 < sections.length) {
        index++;
        nextSection = $(`#${sections[index].id}`);
        moveTo = nextSection.offset().top;
        // setTimeout(() => {
        //     $('body').addClass(backgrounds[index]);
        //     $('body').removeClass(backgrounds[index - 1]);
        // }, 500);
    } else {
        return;
    }
    $('html, body').animate({
        scrollTop: moveTo
    }, 'slow');
}


 function scrollUp(){
    let moveTo;
    let nextSection;
    let section = $(`#${sections[index].id}`);
    let sectionTop = section.offset().top;
    let scrollPosition = $(window).scrollTop();

    // check if at top of section
    if(scrollPosition + scrollLength >= sectionTop){
        moveTo = `-=${scrollMove}px`;
    } else if (index > 0){
        index--;
        nextSection = $(`#${sections[index].id}`);
        moveTo = nextSection.offset().top;
        setTimeout(() => {
            $('body').addClass(backgrounds[index]);
            $('body').removeClass(backgrounds[index + 1]);
        }, 500);
    } else {
        return;
    }
    $('html, body').animate({
        scrollTop: moveTo
    }, 'slow');
}

// $(document).ready(() => {
//     $('body').on('mouseenter', function(){
//         $(this).css(
//             'animation', 'purple-animation 5s infinite alternate'
//         );
//     });
// });