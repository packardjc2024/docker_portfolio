$(document).ready(function(){
    setTimeout(function(){
        setupAnimation();
    }, 100);

    setTimeout(function(){
        typewriter();
    }, 1000);
});

/******************************************************************************
Logo animation related functions
*******************************************************************************/

function setupAnimation(){
    let containers = document.getElementsByClassName('logos-container');
    for (let container of containers){
        animateLogos(container);
    }

}

function animateLogos(containerElement){
// Declares all the variables and calls all functions in the correct order
    let logoElements = containerElement.getElementsByClassName('moving-logo');

    let logos = [];
    for (let logo of logoElements){
        logos.push({
            'element': logo,
            'distanceX': 2,
            'distanceY': 2,
            'containerWidth': containerElement.offsetWidth,
            'containerHeight': containerElement.offsetHeight,
            'logoHeight': calculateLogoHeight(logoElements),
            'logoWidth': calculateLogoWidth(logoElements)
        });
    }
    
    arrangeLogos(logos, containerElement);

    setTimeout(function(){
        for (let logo of logos){
            moveLogo(logo, containerElement);
        }
    }, 5000);
}


function arrangeLogos(logosArray, containerElement){
// Arranges the logos' starting points based on the max size
    let initialTop = 10;
    let initialLeft = 10;
    for (let i=0; i<logosArray.length; i++){
        // Set every other logo to move the opposite direction
        if (i % 2 != 0){
            logosArray[i]['distanceX'] = -logosArray[i]['distanceX'];
            logosArray[i]['distanceY'] = -logosArray[i]['distanceY'];
        }
        // Start a new row at the end of the container width
        if (i != 0){
            if (initialLeft + logosArray[i]['element'].offsetWidth >= containerElement.offsetWidth){
                initialLeft = 10;
                initialTop = initialTop + logosArray[i]['logoHeight'] + 10;
            }
        }

        // Make the initial placement
        logosArray[i]['element'].style.left = initialLeft + 'px';
        logosArray[i]['element'].style.top = initialTop + 'px';

        // Update the intitial left position
        initialLeft = initialLeft + logosArray[i]['logoWidth'] + 10;
    }
}


function moveLogo(logoObject, containerElement){
    // Animation function that makes the logos move
    let x = logoObject['element'].offsetLeft;
    let y = logoObject['element'].offsetTop;

    x += logoObject['distanceX'];
    y += logoObject['distanceY'];

    if (x + logoObject['element'].offsetWidth >= containerElement.offsetWidth || x <= 0){
        logoObject['distanceX'] = -logoObject['distanceX'];
    }
    if (y + logoObject['element'].offsetHeight >= containerElement.offsetHeight || y <= 0){
        logoObject['distanceY'] = -logoObject['distanceY'];
    }

    logoObject['element'].style.left = x + 'px';
    logoObject['element'].style.top = y + 'px';

    requestAnimationFrame(() => moveLogo(logoObject, containerElement));
}


function calculateLogoHeight(logosArray){
    // Returns the max height and width of the logos
    let maxHeight = 0;
    for (let logo of logosArray){
        if (logo.offsetHeight > maxHeight){
            maxHeight = logo.offsetHeight;
        }
    }
    return maxHeight;
}


function calculateLogoWidth(logosArray){
    // Returns the max height and width of the logos
    let maxWidth = 0;
    for (let logo of logosArray){
        if (logo.offsetWidth > maxWidth){
            maxWidth = logo.offsetWidth;
        }
    }
    return maxWidth;
}


/******************************************************************************
Typewriter related functions
*******************************************************************************/

function typewriter(){
    let line1 = 'Hello, World!';
    let line2 = "I'm Jeremy.";
    let helloElement = $('#hello-container');
    let nameElement = $('#name-container');
    let speed = 75;
    let duration = speed * line2.length + 1400;
    type(helloElement, line1, speed);
    setTimeout(function(){
        helloElement.removeClass('caret-container');
        nameElement.addClass('caret-container');
        type(nameElement, line2, speed);
    }, duration);
    setTimeout(() => {
        erase(nameElement, line2, speed);
        setTimeout(() => {
            nameElement.removeClass('caret-container');
            helloElement.addClass('caret-container');
        }, duration);
    }, duration * 2);
    setTimeout(() => {
        erase(helloElement, line1, speed);
    }, duration * 3 + 300);
    setTimeout(() => typewriter(), duration * 4);
}

function type(elementObject, elementString, speed){
    let index = 0;
    let typeInterval = setInterval(function(){
        if (index <= elementString.length){
            elementObject.html(elementString.slice(0, index));
            index++;
        }
    }, speed);
}

function erase(elementObject, elementString, speed){
    let index = elementString.length - 1;
    let typeInterval = setInterval(function(){
        if (index >= 0){
            elementObject.html(elementString.slice(0, index));
            index--;
        }
    }, speed);
}

/******************************************************************************
About Container
*******************************************************************************/
let categories;
let isFront;
let flip;

function hideContent(){
    for (let category of categories){
        $(`#${category}-card`).removeClass('show-content');
        $(`#${category}-card`).addClass('hide-content');
    }
}

$(document).ready(() => {
    isFront = true;
    flip = 0;
    categories = [
        'goals',
        'work-experience',
        'education'
    ];
    $('.about-category').on('click', function() {
        let categoryElement = $(this);
        aboutCardFlip(categoryElement);
    });
});


function aboutCardFlip(category){
    let categoryName = category;
    let categoryCard = $(`#${$(category).attr('id')}-card`);

    // If the click is on the already selected category
    if (categoryName.hasClass('clicked')){
        flip += 180;
        categoryName.removeClass('clicked');
        $('#about-flip-card').css({
            'transition': 'transform 1s',
            'transform': `rotateY(${flip}deg)`
        });
        hideContent();
        isFront = true;
        return;
    }

    // Deselect all categories
    $('.about-card > h3').removeClass('clicked');
    
    // Highlight the name
    categoryName.addClass('clicked');
    
    // Rotate the card based on which side is showing
    if (isFront) {
        flip += 180;
        hideContent();
        categoryCard.removeClass('hide-content');
        categoryCard.addClass('show-content');
        $('#about-flip-card').css({
            'transition': 'transform 1s',
            'transform': `rotateY(${flip}deg)`
        });
        isFront = false;
    } else {
        flip += 180;
        $('#about-flip-card').css({
            'transition': 'transform 1s',
            'transform': `rotateY(${flip}deg)`
        });
        setTimeout(() => {
            hideContent();
            categoryCard.removeClass('hide-content');
            categoryCard.addClass('show-content');
        }, 500);
        flip += 180;
        $('#about-flip-card').css({
            'transition': 'transform 1s',
            'transform': `rotateY(${flip}deg)`
        });
    }
}
