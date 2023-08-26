(function ($) {
    "use strict";

    // loader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
                $('input[value=hatchback]').click();
                $('.nav-link[data-page=' + $('html').data('page') + ']').addClass('active');
            }
        }, 100);
    };
    loader();

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Book now slide 
    $('.global-book-now').click(function () {
        $('html, body').animate({ scrollTop: $("#pricingArea").offset().top - 100 }, 1000);
        return false;
    });

    // Primary Contact Details
    const clientInfo = {
        "phone": ["+91 9459184999", "+91 9459185999"],
        "whatsapp": "919459184999",
        "instagram": "",
        "email": ["info@brightit.in"],
        "address": ["1st floor, Yalamanchili Towers, Sri Anjaneya Township, Edupugallu, Vijayawada, 521151"],
        "workinghours": ["8:00 AM - 6:00 PM"]
    }
    Object.entries(clientInfo).forEach(function ([key, val]) {
        $('.brightit-info-single-' + key).html(val[0]);
        $('.brightit-info-' + key).append(val.toString().replaceAll(",", ", "));
        if (key === "whatsapp") {
            $('#link-' + key).attr("href", ("https://api.whatsapp.com/send?phone=" + val));
        }
    });

    // Choose plan body type
    const prices = {
        "hatchback": {
            "name": "",
            "plans": {
                "silver": 1049,
                "gold": 1349,
                "platinum": 1649
            }
        },
        "sedan-MUV": {
            "name": "",
            "plans": {
                "silver": 1249,
                "gold": 1549,
                "platinum": 1749
            }
        },
        "SUV": {
            "name": "",
            "plans": {
                "silver": 1449,
                "gold": 1749,
                "platinum": 1950
            },
        },
    }
    let scrollCounter = 0;
    $('input[name=car-body-type]').click(function (e) {
        const selectedBodyPrices = prices[e.target.value]?.["plans"] || {};
        Object.entries(selectedBodyPrices).forEach(function ([subscription, price]) {
            $('#price-' + subscription).html(price);
            const message = "Hey, I want to subscribe to the Bright It " + subscription.toUpperCase() + " Membership for my " + e.target.value.toUpperCase() + ".";
            const encodedMessage = encodeURIComponent(message);
            const whatsappLink = 'https://api.whatsapp.com/send?phone=' + clientInfo.whatsapp + '&text=' + encodedMessage;
            $('#buy-' + subscription).attr("href", whatsappLink);
        });
        if (scrollCounter) {
            $('html, body').animate({ scrollTop: $("#choosePlan").offset().top - 130 }, 500);
        }
        scrollCounter++;
    });

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 90) {
            $('.nav-bar').addClass('nav-sticky');
            $('.carousel, .page-header').css("margin-top", "73px");
        } else {
            $('.nav-bar').removeClass('nav-sticky');
            $('.carousel, .page-header').css("margin-top", "0");
        }
    });


    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Main carousel
    $(".carousel .owl-carousel").owlCarousel({
        autoplay: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 1,
        smartSpeed: 300,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ]
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Pricing counter
    $('[data-toggle="counter-up-fast"]').counterUp({
        delay: 10,
        time: 500
    });



    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        center: true,
        autoplay: true,
        smartSpeed: 2000,
        dots: true,
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });


    // Related post carousel
    $(".related-slider").owlCarousel({
        autoplay: true,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });

})(jQuery);

