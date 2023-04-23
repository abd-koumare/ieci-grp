var hamburgerBtn = document.querySelector("#hamburger-btn");
var mobileNavigation = document.querySelector("#mobile-nav");

hamburgerBtn.addEventListener("click", function () {
    // add .is_activated which cause display of navigation container using css sibling selector '+'
    this.classList.toggle("is_activated");

    // remove .has_shadow when hamburger is activated
    mobileNavigation.classList.toggle("has_shadow");
})


var mobileNavigationContext = document.querySelector("#mobile-menu-container");

document.addEventListener('click', function (event) {

    // Check if the target of the click is inside the navigation context
    const isClickInsideNav = mobileNavigationContext.contains(event.target) || hamburgerBtn.contains(event.target);

    // If the target of the click is outside the navigation context, close the hamburger menu
    if (!isClickInsideNav) {
        hamburgerBtn.classList.remove('is_activated');
        mobileNavigation.classList.toggle("has_shadow");
    }
});


document.querySelector('.contact-btn').addEventListener('click', function(e){
    hamburgerBtn.classList.remove('is_activated');
    mobileNavigation.classList.toggle("has_shadow");
})


// Closing the menu when the menu anchor link is clicked
var deactivateMenuAtClickBtn = document.querySelectorAll('.close-mobile-menu-trg');

deactivateMenuAtClickBtn.forEach(function (el) {
    el.addEventListener('click', function () {
        hamburgerBtn.classList.remove('is_activated');
    })
})





const GA_MEASUREMENT_ID =  'G-5TJ6JV3KNZ';
const GA_MEASUREMENT_URL = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
// Check if the user has previously accepted cookies
const cookieAccepted = localStorage.getItem('cookieAccepted');

if (cookieAccepted) {
    // User has already accepted cookies, enable Google Analytics
    enableGoogleAnalytics();
} else {
    // User has not yet accepted cookies, show the cookie agreement modal
    const cookieModal = document.getElementById('cookie-modal');
    cookieModal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    const acceptButton = document.getElementById('accept-cookies');
    acceptButton.addEventListener('click', () => {
        // User accepts cookies, enable Google Analytics and save acceptance to localStorage
        enableGoogleAnalytics();
        localStorage.setItem('cookieAccepted', true);

        // Close the modal
        cookieModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    const declineButton = document.getElementById('decline-cookies');
    declineButton.addEventListener('click', () => {
        // User declines cookies, disable Google Analytics and do not save acceptance to localStorage
        disableGoogleAnalytics();
        localStorage.setItem('cookieAccepted', false);
        // Close the modal
        cookieModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

function enableGoogleAnalytics() {
    // Show the Google Analytics scripts
    const googleAnalyticsScripts = document.querySelectorAll('.google-analytics');
    googleAnalyticsScripts.forEach((script) => {
        script.style.display = 'block';
    });

    // Insert the Google Analytics tracking code into the document
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = GA_MEASUREMENT_URL
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
}

function disableGoogleAnalytics() {
    // Hide the Google Analytics scripts
    const googleAnalyticsScripts = document.querySelectorAll('.google-analytics');
    googleAnalyticsScripts.forEach((script) => {
        script.style.display = 'none';
    });

    // Remove the Google Analytics tracking code from the document

    const gaScript = document.querySelector('script[src=GA_MEASUREMENT_URL]');
    if (gaScript) {
        gaScript.remove();
    }

    // Remove any existing Google Analytics cookies
    document.cookie.split(";").forEach(function (cookie) {
        const cookieName = cookie.split("=")[0];
        if (cookieName.indexOf("_ga") === 0 || cookieName.indexOf("_gid") === 0) {
            document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
    });
}