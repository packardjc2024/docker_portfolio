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
    setTimeout(() => throttled = false, 2000);
});

window.addEventListener('wheel', handleScroll, {passive: false});

function handleScroll(event) {
    // Allow horizontal scrolling
    if (event.deltaX !== 0){
        console.log('x - scroll');
        return;
    }

    // Check if scrolling has been paused
    if (throttled || event.deltaY < 20){
        event.preventDefault();
        return;
    }


    // Scroll Down
    if (event.deltaY > 0){
        let section = $(`#${sections[index].id}`);
        let sectionBottom = section.offset().top + section.outerHeight(true);
        let scrollPosition = $(window).scrollTop();
        let windowBottom = scrollPosition + $(window).height();

        console.log(section);
        console.log(sectionBottom);
        console.log(scrollPosition);
        console.log(windowBottom);
        console.log($(window).height());

        let remaining = sectionBottom - windowBottom

        if (remaining > 0){
            if (remaining - event.deltaY < 0){
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: sectionBottom - $(window).height()
                }, 'slow');
                setTimeout(() => {return;}, 500);
            } else {
                return;
            }
        } else {
            event.preventDefault();
            index++;
            nextSection = $(`#${sections[index].id}`);
            moveTo = nextSection.offset().top;
            $('html, body').animate({
                scrollTop: moveTo
            }, 'slow');
        }
    }

    throttled = true;

    // Set timeout to prevent mulitple quick scrolls
    setTimeout(() => throttled = false, throttleSpeed);
}

//// have to adjust clicks on navbar to change section index


/* original scroll

function handleScroll(event) {
    // ignore horizontal scrolls
    if (event.deltaX !== 0) return;

    // Customize vertical scrolls
    event.preventDefault();
    scrollLength = event.deltaY;

    // Check is scrolling is throttled or for rapid short scrolls
    if (throttled || Math.abs(scrollLength) < 20) return;

    // throttle to prevent multiple scrolls
    throttled = true;

    // Get the scroll direction using the event and perform scroll
    scrollLength > 0 ? scrollDown() : scrollUp();

    // Set timeout to prevent mulitple quick scrolls
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
        // setTimeout(() => {
        //     $('body').addClass(backgrounds[index]);
        //     $('body').removeClass(backgrounds[index + 1]);
        // }, 500);
    } else {
        return;
    }
    $('html, body').animate({
        scrollTop: moveTo
    }, 'slow');
}
    */