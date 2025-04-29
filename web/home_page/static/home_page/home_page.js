$(document).ready(function(){
    setTimeout(function(){
        setupAnimation();
    }, 100);
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



/*
$(document).ready(function(){
    setTimeout(function(){
        // animateLogos();
        setupAnimation();
    }, 100);
});

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
            'containerWidth': $('#logos-container').width(),
            'containerHeight': $('#logos-container').height(),
            'logoHeight': calculateLogoHeight(logoElements),
            'logoWidth': calculateLogoWidth(logoElements)
        });
    }
    
    arrangeLogos(logos);

    setTimeout(function(){
        for (let logo of logos){
            moveLogo(logo);
        }
    }, 3000);
}


function arrangeLogos(logosArray){
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
            if (initialLeft + logosArray[i]['element'].offsetWidth >= logosArray[i]['containerWidth']){
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


function moveLogo(logoObject){
    // Animation function that makes the logos move
    let x = logoObject['element'].offsetLeft;
    let y = logoObject['element'].offsetTop;

    x += logoObject['distanceX'];
    y += logoObject['distanceY'];

    if (x + logoObject['element'].offsetWidth >= logoObject['containerWidth'] || x <= 0){
        logoObject['distanceX'] = -logoObject['distanceX'];
    }
    if (y + logoObject['element'].offsetHeight >= logoObject['containerHeight'] || y <= 0){
        logoObject['distanceY'] = -logoObject['distanceY'];
    }

    logoObject['element'].style.left = x + 'px';
    logoObject['element'].style.top = y + 'px';

    requestAnimationFrame(() => moveLogo(logoObject));
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
*/