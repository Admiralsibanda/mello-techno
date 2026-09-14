/* =====================================================
   MELLO TECHNO
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuButton && mobileMenu) {

    menuButton.addEventListener(
        "click",
        function () {

            mobileMenu.classList.toggle("active");

            const isOpen =
                mobileMenu.classList.contains("active");

            menuButton.setAttribute(
                "aria-label",
                isOpen
                    ? "Close menu"
                    : "Open menu"
            );

        }
    );

}


/* =====================================================
   CLOSE MOBILE MENU WHEN LINK IS CLICKED
===================================================== */

const mobileLinks =
    document.querySelectorAll(
        ".mobile-menu a"
    );


mobileLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                if (mobileMenu) {

                    mobileMenu.classList.remove(
                        "active"
                    );

                }

                if (menuButton) {

                    menuButton.setAttribute(
                        "aria-label",
                        "Open menu"
                    );

                }

            }
        );

    }
);


/* =====================================================
   CONTACT FORM
   SEND ENQUIRY TO WHATSAPP
===================================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* -----------------------------------------
               GET FORM ELEMENTS
            ----------------------------------------- */

            const name =
                document.querySelector(
                    '[name="name"]'
                );

            const phone =
                document.querySelector(
                    '[name="phone"]'
                );

            const email =
                document.querySelector(
                    '[name="email"]'
                );

            const service =
                document.querySelector(
                    '[name="service"]'
                );

            const message =
                document.querySelector(
                    '[name="message"]'
                );


            /* -----------------------------------------
               CHECK FORM
            ----------------------------------------- */

            if (
                !name ||
                !phone ||
                !email ||
                !service ||
                !message
            ) {

                alert(
                    "Please complete all required fields."
                );

                return;

            }


            /* -----------------------------------------
               GET VALUES
            ----------------------------------------- */

            const nameValue =
                name.value.trim();

            const phoneValue =
                phone.value.trim();

            const emailValue =
                email.value.trim();

            const serviceValue =
                service.value;

            const messageValue =
                message.value.trim();


            /* -----------------------------------------
               CHECK EMPTY VALUES
            ----------------------------------------- */

            if (
                !nameValue ||
                !phoneValue ||
                !emailValue ||
                !serviceValue ||
                !messageValue
            ) {

                alert(
                    "Please complete all fields before sending your enquiry."
                );

                return;

            }


            /* -----------------------------------------
               MELLO TECHNO WHATSAPP NUMBER

               South Africa:
               +27 78 995 5704

               WhatsApp format:
               27789955704
            ----------------------------------------- */

            const whatsappNumber =
                "27789955704";


            /* -----------------------------------------
               CREATE MESSAGE
            ----------------------------------------- */

            const whatsappMessage =

`Hello Mello Techno,

I would like to enquire about your services.

Name: ${nameValue}

Phone: ${phoneValue}

Email: ${emailValue}

Service Required: ${serviceValue}

Project Details:
${messageValue}`;


            /* -----------------------------------------
               ENCODE MESSAGE
            ----------------------------------------- */

            const encodedMessage =
                encodeURIComponent(
                    whatsappMessage
                );


            /* -----------------------------------------
               CREATE WHATSAPP URL
            ----------------------------------------- */

            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


            /* -----------------------------------------
               OPEN WHATSAPP
            ----------------------------------------- */

            window.open(
                whatsappURL,
                "_blank"
            );


            /* -----------------------------------------
               RESET FORM
            ----------------------------------------- */

            contactForm.reset();

        }
    );

}


/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

const navbar =
    document.querySelector(
        ".navbar"
    );


if (navbar) {

    function updateNavbar() {

        if (window.scrollY > 50) {

            navbar.style.background =
                "rgba(0, 0, 0, 0.98)";

        } else {

            navbar.style.background =
                "rgba(0, 0, 0, 0.94)";

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar
    );


    updateNavbar();

}


/* =====================================================
   SMOOTH SCROLL
===================================================== */

const anchorLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


anchorLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }
);


/* =====================================================
   AUTOMATIC FOOTER YEAR
===================================================== */

const yearElement =
    document.getElementById(
        "year"
    );


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}