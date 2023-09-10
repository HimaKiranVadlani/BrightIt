(async function ($) {
    "use strict";

    // Page Loader
    setTimeout(function () {
        if ($('#loader').length > 0) {
            $('#loader').removeClass('show');
            $('input[value=hatchback]').click();
            $('.nav-link[data-page=' + $('html').data('page') + ']').addClass('active');
        }
    }, 200);

    // GET data
    const {
        clientInfo = [],
        services = [],
        bodyTypes = [],
        subscriptionPlans = [],
        bodyTypesPlansPrice = [],
        bodyTypesServicePrices = [],
        plansServices = []
    } = await (await fetch('data.json')).json();

    // Set Primary Contact Details
    Object.entries(clientInfo).forEach(function ([key, val]) {
        $('.brightit-info-single-' + key).html(val[0]);
        $('.brightit-info-' + key).append(val.toString().replaceAll(",", ", "));
        if (key === "whatsapp") {
            $('#link-' + key).attr("href", ("https://api.whatsapp.com/send?phone=" + val));
        } else if (key === "instagram") {
            $('#link-' + key).attr("href", ("https://instagram.com/" + val));
        }
    });

    // Set One Time Services
    function setOneTimeServices() {
        $("#one-time-service-options").html("");
        services.forEach(function (service) {
            const selectedBodyType = $('input[name=car-body-type]:checked').val();
            const selectedBodyPrices = bodyTypesServicePrices.find(b => b.bodyTypeId == selectedBodyType && b.serviceId === service.id)?.price;
            if (selectedBodyPrices) {
                let option = `<label><input type="checkbox" name="one-time-service-option" value="${service.id}">${service.name} @ ₹${bodyTypesServicePrices.find(b => b.bodyTypeId == selectedBodyType && b.serviceId === service.id).price}</label>`;
                $("#one-time-service-options").append(option);
            }
        });
    }
    setOneTimeServices();

    ///////////// SET EVENTS START /////////////

    // Global Book Now click
    $('.global-book-now').click(function () {
        $('html, body').animate({ scrollTop: $("#pricingArea").offset().top - 110 }, 1000);
        return false;
    });

    // Price Model Tabs
    $(".price-model-tab-button").click(function () {
        $(".price-model-tab-button").removeClass('btn-custom');
        $(this).addClass('btn-custom');
        $(".price-model-tab-content").hide();
        $("#price-model-tab-" + $(this).data("tab")).show();
    });
    $("[data-tab='subscription']").click();

    // Body Type Click
    let scrollCounter = 0;
    $('input[name=car-body-type]').click(function (e) {
        const selectedBodyType = bodyTypes.find(b => b.id == [e.target.value]);
        const selectedBodyPrices = bodyTypesPlansPrice.filter(bTPP => bTPP.bodyTypeId === selectedBodyType.id);
        subscriptionPlans.forEach((plan = {}) => {
            const planPrice = (selectedBodyPrices.find(sBP => plan.id === sBP.planId) || {}).price;
            const message = "Hey, I want to subscribe to the Bright It " + plan.name.toUpperCase() + " Membership for my " + selectedBodyType.name.toUpperCase() + ".";
            const encodedMessage = encodeURIComponent(message);
            const whatsappLink = 'https://api.whatsapp.com/send?phone=' + clientInfo.whatsapp + '&text=' + encodedMessage;
            $('#plan-price-' + plan.id).html(planPrice);
            $('#buy-' + plan.id).attr("href", whatsappLink);
        });
        if (scrollCounter) {
            $('html, body').animate({ scrollTop: $("#price-model-tab-contents").offset().top - 190 }, 500);
        }
        scrollCounter++;
        setOneTimeServices();
    });
    $("input[name=car-body-type][value=1]").click();

    // One Time Options Selection Click
    $('[name="one-time-service-option"]').click(function () {
        const checkedOptions = $('[name="one-time-service-option"]:checked');
        if (checkedOptions.length) {
            $('#book-one-time-service-options').show();
        } else {
            $('#book-one-time-service-options').hide();
        }
    })
    $('#book-one-time-service-options').click(function () {
        const selectedBodyType = $('input[name=car-body-type]:checked').val();
        const checkedOptions = $('[name="one-time-service-option"]:checked');
        const message = "Hey, I want to book Bright It " + Array.from(checkedOptions).map(op => services.find(service => service.id == op.value).name).join(', ') + " services for my " + bodyTypes.find(bodyType => bodyType.id == selectedBodyType).name.toUpperCase() + ".";
        const encodedMessage = encodeURIComponent(message);
        const whatsappLink = 'https://api.whatsapp.com/send?phone=' + clientInfo.whatsapp + '&text=' + encodedMessage;
        $('#book-one-time-service-options').attr("href", whatsappLink);
    });
    $('[name="one-time-service-option"][value=1]').click();

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

    // Pricing counter
    $('[data-toggle="counter-up-fast"]').counterUp({
        delay: 10,
        time: 500
    });

    ///////////// SET EVENTS END /////////////

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

})(jQuery);

