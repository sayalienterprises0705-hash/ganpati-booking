/* =========================================================
   S.B. JOSHI ENTERPRISES
   Main Website JavaScript
   ========================================================= */


/* =========================================================
   BUSINESS SETTINGS
========================================================= */

const WHATSAPP_NUMBER = "918857874068";


/* =========================================================
   PAGE READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    setupMobileMenu();

    setupBackToTop();

    setupBookingForm();

    setupImageLightbox();

    setupGalleryImages();

    setMinimumBookingDate();

});


/* =========================================================
   MOBILE MENU
========================================================= */

function setupMobileMenu() {

    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");

    if (!menuButton || !nav) {
        return;
    }

    menuButton.addEventListener("click", function () {

        const isOpen = nav.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        document.body.classList.toggle(
            "no-scroll",
            isOpen
        );

    });


    /* Close menu after clicking a navigation link */

    const navLinks = nav.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            nav.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "no-scroll"
            );

        });

    });

}


/* =========================================================
   BACK TO TOP
========================================================= */

function setupBackToTop() {

    const topButton =
        document.querySelector(".top-btn");

    if (!topButton) {
        return;
    }


    /* Hide button initially */

    topButton.style.opacity = "0";
    topButton.style.pointerEvents = "none";


    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {

            topButton.style.opacity = "1";
            topButton.style.pointerEvents = "auto";

        } else {

            topButton.style.opacity = "0";
            topButton.style.pointerEvents = "none";

        }

    });


    topButton.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   BOOKING FORM
========================================================= */

function setupBookingForm() {

    const form =
        document.getElementById("bookingForm");

    if (!form) {
        return;
    }


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        /* =============================================
           GET FORM VALUES
        ============================================= */

        const customerName =
            getValue("customerName");

        const mobile =
            getValue("mobile");

        const email =
            getValue("email");

        const murtiType =
            getValue("murtiType");

        const murtiSize =
            getValue("murtiSize");

        const price =
            getValue("price");

        const quantity =
            getValue("quantity");

        const paymentMode =
            getValue("paymentMode");

        const advance =
            getValue("advance");

        const delivery =
            getValue("delivery");

        const bookingDate =
            getValue("bookingDate");

        const address =
            getValue("address");

        const note =
            getValue("note");


        /* =============================================
           BASIC VALIDATION
        ============================================= */

        if (!customerName) {

            alert(
                "Please enter customer name."
            );

            focusField("customerName");

            return;
        }


        if (!mobile) {

            alert(
                "Please enter mobile number."
            );

            focusField("mobile");

            return;
        }


        /* Mobile number validation */

        const cleanMobile =
            mobile.replace(/\D/g, "");


        if (cleanMobile.length !== 10) {

            alert(
                "Please enter a valid 10 digit mobile number."
            );

            focusField("mobile");

            return;
        }


        if (!murtiType) {

            alert(
                "Please select Murti Type."
            );

            focusField("murtiType");

            return;
        }


        if (!murtiSize) {

            alert(
                "Please select Murti Size."
            );

            focusField("murtiSize");

            return;
        }


        if (!quantity || Number(quantity) < 1) {

            alert(
                "Please enter a valid quantity."
            );

            focusField("quantity");

            return;
        }


        if (!paymentMode) {

            alert(
                "Please select Payment Mode."
            );

            focusField("paymentMode");

            return;
        }


        if (!delivery) {

            alert(
                "Please select Delivery / Collection option."
            );

            focusField("delivery");

            return;
        }


        if (!bookingDate) {

            alert(
                "Please select your preferred date."
            );

            focusField("bookingDate");

            return;
        }


        if (!address) {

            alert(
                "Please enter your address."
            );

            focusField("address");

            return;
        }


        /* =============================================
           FORMAT DATE
        ============================================= */

        const formattedDate =
            formatDate(bookingDate);


        /* =============================================
           PREPARE WHATSAPP MESSAGE
        ============================================= */

        let message = "";

        message +=
            "🙏 *NEW GANPATI BOOKING REQUEST* 🙏\n\n";

        message +=
            "*S.B. Joshi Enterprises*\n\n";


        message +=
            "👤 *Customer Details*\n";

        message +=
            "Name: " +
            customerName +
            "\n";

        message +=
            "Mobile: " +
            cleanMobile +
            "\n";


        if (email) {

            message +=
                "Email: " +
                email +
                "\n";

        }


        message +=
            "\n";


        message +=
            "🪔 *Murti Details*\n";

        message +=
            "Murti: " +
            murtiType +
            "\n";

        message +=
            "Size: " +
            murtiSize +
            "\n";

        message +=
            "Price: " +
            (price ? "₹" + price : "Not specified") +
            "\n";

        message +=
            "Quantity: " +
            quantity +
            "\n";


        message +=
            "\n";


        message +=
            "💳 *Payment Details*\n";

        message +=
            "Payment Mode: " +
            paymentMode +
            "\n";

        message +=
            "Advance: " +
            (advance ? "₹" + advance : "Not specified") +
            "\n";


        message +=
            "\n";


        message +=
            "📦 *Collection Details*\n";

        message +=
            "Delivery: " +
            delivery +
            "\n";

        message +=
            "Preferred Date: " +
            formattedDate +
            "\n";


        message +=
            "\n";


        message +=
            "📍 *Address*\n";

        message +=
            address +
            "\n";


        if (note) {

            message +=
                "\n";

            message +=
                "📝 *Note*\n";

            message +=
                note +
                "\n";

        }


        message +=
            "\n";

        message +=
            "━━━━━━━━━━━━━━━━━━\n";

        message +=
            "Booking Status: *Pending Approval*\n";

        message +=
            "━━━━━━━━━━━━━━━━━━\n\n";

        message +=
            "Ganpati Bappa Morya! 🙏";


        /* =============================================
           CREATE WHATSAPP URL
        ============================================= */

        const whatsappURL =
            "https://wa.me/" +
            WHATSAPP_NUMBER +
            "?text=" +
            encodeURIComponent(message);


        /* =============================================
           CONFIRM BEFORE OPENING WHATSAPP
        ============================================= */

        const confirmed =
            window.confirm(
                "Your booking details are ready.\n\n" +
                "Click OK to open WhatsApp and send your booking request."
            );


        if (!confirmed) {
            return;
        }


        /* =============================================
           OPEN WHATSAPP
        ============================================= */

        window.open(
            whatsappURL,
            "_blank",
            "noopener"
        );

    });

}


/* =========================================================
   GET FORM VALUE
========================================================= */

function getValue(id) {

    const element =
        document.getElementById(id);

    if (!element) {
        return "";
    }

    return element.value.trim();

}


/* =========================================================
   FOCUS FIELD
========================================================= */

function focusField(id) {

    const element =
        document.getElementById(id);

    if (element) {

        element.focus();

    }

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(dateString) {

    if (!dateString) {
        return "";
    }


    const parts =
        dateString.split("-");


    if (parts.length !== 3) {
        return dateString;
    }


    return (
        parts[2] +
        "-" +
        parts[1] +
        "-" +
        parts[0]
    );

}


/* =========================================================
   MINIMUM BOOKING DATE
========================================================= */

function setMinimumBookingDate() {

    const dateInput =
        document.getElementById("bookingDate");

    if (!dateInput) {
        return;
    }


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    const minimumDate =
        year +
        "-" +
        month +
        "-" +
        day;


    dateInput.min =
        minimumDate;

}


/* =========================================================
   IMAGE LIGHTBOX
========================================================= */

function setupImageLightbox() {

    const images =
        document.querySelectorAll(
            ".gallery img, " +
            ".product-gallery img, " +
            ".pooja-products-grid img, " +
            ".about-bappa"
        );


    if (!images.length) {
        return;
    }


    createLightbox();


    images.forEach(function (image) {

        image.addEventListener(
            "click",
            function () {

                openLightbox(
                    image.src,
                    image.alt
                );

            }
        );

    });

}


/* =========================================================
   CREATE LIGHTBOX
========================================================= */

function createLightbox() {

    if (
        document.getElementById(
            "siteLightbox"
        )
    ) {
        return;
    }


    const lightbox =
        document.createElement("div");


    lightbox.id =
        "siteLightbox";


    lightbox.className =
        "lightbox";


    lightbox.innerHTML = `

        <button
            class="lb-close"
            type="button"
            aria-label="Close image">
            ×
        </button>

        <button
            class="lb-prev"
            type="button"
            aria-label="Previous image">
            ‹
        </button>

        <div class="lightbox-content">

            <img
                id="lbImage"
                src=""
                alt="">

            <div
                id="lbCaption"
                class="lb-caption">
            </div>

        </div>

        <button
            class="lb-next"
            type="button"
            aria-label="Next image">
            ›
        </button>

    `;


    document.body.appendChild(
        lightbox
    );


    /* Close button */

    const closeButton =
        lightbox.querySelector(
            ".lb-close"
        );


    closeButton.addEventListener(
        "click",
        closeLightbox
    );


    /* Click background to close */

    lightbox.addEventListener(
        "click",
        function (event) {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );


    /* Previous / next */

    const previousButton =
        lightbox.querySelector(
            ".lb-prev"
        );


    const nextButton =
        lightbox.querySelector(
            ".lb-next"
        );


    previousButton.addEventListener(
        "click",
        showPreviousImage
    );


    nextButton.addEventListener(
        "click",
        showNextImage
    );


    /* Keyboard controls */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !lightbox.classList.contains(
                    "show"
                )
            ) {
                return;
            }


            if (
                event.key === "Escape"
            ) {

                closeLightbox();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                showPreviousImage();

            }


            if (
                event.key === "ArrowRight"
            ) {

                showNextImage();

            }

        }
    );

}


/* =========================================================
   LIGHTBOX STATE
========================================================= */

let currentImageIndex = 0;

let lightboxImages = [];


/* =========================================================
   OPEN LIGHTBOX
========================================================= */

function openLightbox(
    source,
    caption
) {

    const lightbox =
        document.getElementById(
            "siteLightbox"
        );


    if (!lightbox) {
        return;
    }


    lightboxImages =
        Array.from(
            document.querySelectorAll(
                ".gallery img, " +
                ".product-gallery img, " +
                ".pooja-products-grid img, " +
                ".about-bappa"
            )
        );


    currentImageIndex =
        lightboxImages.findIndex(
            function (image) {

                return (
                    image.src === source
                );

            }
        );


    if (
        currentImageIndex < 0
    ) {

        currentImageIndex = 0;

    }


    updateLightbox();


    lightbox.classList.add(
        "show"
    );


    document.body.classList.add(
        "no-scroll"
    );

}


/* =========================================================
   UPDATE LIGHTBOX
========================================================= */

function updateLightbox() {

    const lightbox =
        document.getElementById(
            "siteLightbox"
        );


    if (!lightbox) {
        return;
    }


    if (!lightboxImages.length) {
        return;
    }


    const image =
        lightboxImages[
            currentImageIndex
        ];


    const lightboxImage =
        document.getElementById(
            "lbImage"
        );


    const caption =
        document.getElementById(
            "lbCaption"
        );


    lightboxImage.src =
        image.src;


    lightboxImage.alt =
        image.alt || "Image";


    caption.textContent =
        image.alt || "";


    /* Hide arrows when there is only one image */

    const previousButton =
        lightbox.querySelector(
            ".lb-prev"
        );


    const nextButton =
        lightbox.querySelector(
            ".lb-next"
        );


    if (
        lightboxImages.length <= 1
    ) {

        previousButton.style.display =
            "none";

        nextButton.style.display =
            "none";

    } else {

        previousButton.style.display =
            "grid";

        nextButton.style.display =
            "grid";

    }

}


/* =========================================================
   CLOSE LIGHTBOX
========================================================= */

function closeLightbox() {

    const lightbox =
        document.getElementById(
            "siteLightbox"
        );


    if (!lightbox) {
        return;
    }


    lightbox.classList.remove(
        "show"
    );


    document.body.classList.remove(
        "no-scroll"
    );

}


/* =========================================================
   PREVIOUS IMAGE
========================================================= */

function showPreviousImage() {

    if (!lightboxImages.length) {
        return;
    }


    currentImageIndex--;


    if (
        currentImageIndex < 0
    ) {

        currentImageIndex =
            lightboxImages.length - 1;

    }


    updateLightbox();

}


/* =========================================================
   NEXT IMAGE
========================================================= */

function showNextImage() {

    if (!lightboxImages.length) {
        return;
    }


    currentImageIndex++;


    if (
        currentImageIndex >=
        lightboxImages.length
    ) {

        currentImageIndex = 0;

    }


    updateLightbox();

}


/* =========================================================
   GALLERY IMAGE FALLBACK
========================================================= */

function setupGalleryImages() {

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(function (image) {

        image.addEventListener(
            "error",
            function () {

                /*
                 Do not repeatedly trigger
                 the error event.
                */

                image.dataset.imageError =
                    "true";

            }
        );

    });

}


/* =========================================================
   END OF SCRIPT
========================================================= */
