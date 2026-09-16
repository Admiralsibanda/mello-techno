/* =====================================================
   MELLO TECHNO
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("active");

        const isOpen = mobileMenu.classList.contains("active");

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );

        menuButton.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );
    });
}


/* =====================================================
   CLOSE MOBILE MENU WHEN LINK IS CLICKED
===================================================== */

const mobileLinks = document.querySelectorAll(".mobile-menu a");

mobileLinks.forEach(function (link) {
    link.addEventListener("click", function () {

        if (mobileMenu) {
            mobileMenu.classList.remove("active");
        }

        if (menuButton) {
            menuButton.setAttribute(
                "aria-label",
                "Open menu"
            );

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    });
});


/* =====================================================
   CONTACT FORM
   SEND ENQUIRY TO WHATSAPP
===================================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        /* -----------------------------------------
           GET FORM ELEMENTS
        ----------------------------------------- */

        const name = contactForm.querySelector('[name="name"]');
        const phone = contactForm.querySelector('[name="phone"]');
        const email = contactForm.querySelector('[name="email"]');
        const service = contactForm.querySelector('[name="service"]');
        const message = contactForm.querySelector('[name="message"]');


        /* -----------------------------------------
           CHECK FORM ELEMENTS
        ----------------------------------------- */

        if (
            !name ||
            !phone ||
            !email ||
            !service ||
            !message
        ) {
            alert(
                "There was a problem with the contact form. Please try again."
            );

            return;
        }


        /* -----------------------------------------
           GET VALUES
        ----------------------------------------- */

        const nameValue = name.value.trim();
        const phoneValue = phone.value.trim();
        const emailValue = email.value.trim();
        const serviceValue = service.value.trim();
        const messageValue = message.value.trim();


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
           BASIC EMAIL VALIDATION
        ----------------------------------------- */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailValue)) {

            alert(
                "Please enter a valid email address."
            );

            return;
        }


        /* -----------------------------------------
           MELLO TECHNO WHATSAPP NUMBER
           South Africa:
           +27 78 995 5704
           WhatsApp:
           27789955704
        ----------------------------------------- */

        const whatsappNumber = "27789955704";


        /* -----------------------------------------
           CREATE WHATSAPP MESSAGE
        ----------------------------------------- */

        const whatsappMessage = `Hello Mello Techno,

I would like to enquire about your services.

Name: ${nameValue}

Phone: ${phoneValue}

Email: ${emailValue}

Service Required: ${serviceValue}

Project Details:

${messageValue}

Thank you.`;


        /* -----------------------------------------
           ENCODE MESSAGE
        ----------------------------------------- */

        const encodedMessage =
            encodeURIComponent(whatsappMessage);


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
            "_blank",
            "noopener,noreferrer"
        );


        /* -----------------------------------------
           RESET FORM
        ----------------------------------------- */

        contactForm.reset();

    });
}


/* =====================================================
   CUSTOMER RATING SYSTEM
===================================================== */

const starRating = document.getElementById("starRating");
const ratingValue = document.getElementById("ratingValue");
const ratingMessage = document.getElementById("ratingMessage");

const reviewForm = document.getElementById("reviewForm");
const reviewName = document.getElementById("reviewName");
const reviewText = document.getElementById("reviewText");
const reviewsGrid = document.getElementById("reviewsGrid");

let selectedRating = 0;


/* =====================================================
   LOAD REVIEWS
===================================================== */

let reviews = [];

try {

    const savedReviews =
        localStorage.getItem("melloTechnoReviews");

    if (savedReviews) {
        reviews = JSON.parse(savedReviews);
    }

} catch (error) {

    console.error(
        "Could not load saved reviews:",
        error
    );

    reviews = [];
}


/* =====================================================
   SAVE REVIEWS
===================================================== */

function saveReviews() {

    try {

        localStorage.setItem(
            "melloTechnoReviews",
            JSON.stringify(reviews)
        );

    } catch (error) {

        console.error(
            "Could not save reviews:",
            error
        );
    }
}


/* =====================================================
   STAR BUTTONS
===================================================== */

if (starRating) {

    const starButtons =
        starRating.querySelectorAll("button");

    starButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            selectedRating =
                Number(this.dataset.rating);

            if (ratingValue) {
                ratingValue.value = selectedRating;
            }

            updateStarDisplay();

        });


        button.addEventListener("mouseenter", function () {

            const hoverRating =
                Number(this.dataset.rating);

            highlightStars(hoverRating);

        });

    });


    starRating.addEventListener(
        "mouseleave",
        function () {
            updateStarDisplay();
        }
    );
}


/* =====================================================
   HIGHLIGHT STARS
===================================================== */

function highlightStars(rating) {

    if (!starRating) {
        return;
    }

    const buttons =
        starRating.querySelectorAll("button");

    buttons.forEach(function (button) {

        const buttonRating =
            Number(button.dataset.rating);

        if (buttonRating <= rating) {

            button.classList.add("active");

        } else {

            button.classList.remove("active");

        }

    });
}


/* =====================================================
   UPDATE STAR DISPLAY
===================================================== */

function updateStarDisplay() {

    highlightStars(selectedRating);

    if (!ratingMessage) {
        return;
    }

    if (selectedRating === 0) {

        ratingMessage.textContent =
            "Select a rating from 1 to 5 stars.";

        return;
    }


    const messages = {

        1: "1 star — We're sorry your experience wasn't better.",

        2: "2 stars — Thank you for your feedback.",

        3: "3 stars — Thank you for your feedback.",

        4: "4 stars — We're glad you had a good experience!",

        5: "5 stars — Thank you! We're glad you loved our service!"

    };


    ratingMessage.textContent =
        messages[selectedRating];
}


/* =====================================================
   DISPLAY REVIEWS
===================================================== */

function displayReviews() {

    if (!reviewsGrid) {
        return;
    }

    reviewsGrid.innerHTML = "";


    if (reviews.length === 0) {

        const emptyMessage =
            document.createElement("div");

        emptyMessage.className = "no-reviews";

        emptyMessage.textContent =
            "Be the first customer to leave a review.";

        reviewsGrid.appendChild(emptyMessage);

        return;
    }


    /* -----------------------------------------
       SHOW MOST RECENT REVIEWS FIRST
    ----------------------------------------- */

    const sortedReviews =
        [...reviews].reverse();


    sortedReviews.forEach(function (review) {

        const reviewCard =
            document.createElement("article");

        reviewCard.className = "review-card";


        /* -----------------------------------------
           STARS
        ----------------------------------------- */

        const rating =
            Number(review.rating);

        const safeRating =
            Math.max(1, Math.min(5, rating));

        const stars =
            "★".repeat(safeRating) +
            "☆".repeat(5 - safeRating);


        /* -----------------------------------------
           DATE
        ----------------------------------------- */

        let formattedDate = "";

        if (review.date) {

            const date =
                new Date(review.date);

            if (!isNaN(date.getTime())) {

                formattedDate =
                    date.toLocaleDateString(
                        "en-ZA",
                        {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                        }
                    );
            }
        }


        /* -----------------------------------------
           CARD HTML
        ----------------------------------------- */

        reviewCard.innerHTML = `

            <div
                class="review-stars"
                aria-label="${safeRating} out of 5 stars"
            >
                ${stars}
            </div>

            <p class="review-text"></p>

            <div class="review-author"></div>

            <span class="review-date">
                ${formattedDate}
            </span>

        `;


        /* -----------------------------------------
           SAFELY INSERT USER CONTENT
        ----------------------------------------- */

        const textElement =
            reviewCard.querySelector(".review-text");

        const authorElement =
            reviewCard.querySelector(".review-author");


        if (textElement) {

            textElement.textContent =
                `"${review.text}"`;

        }


        if (authorElement) {

            authorElement.textContent =
                review.name;

        }


        reviewsGrid.appendChild(reviewCard);

    });
}


/* =====================================================
   SUBMIT REVIEW
===================================================== */

if (reviewForm) {

    reviewForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* -----------------------------------------
               GET VALUES
            ----------------------------------------- */

            const name =
                reviewName
                    ? reviewName.value.trim()
                    : "";


            const text =
                reviewText
                    ? reviewText.value.trim()
                    : "";


            /* -----------------------------------------
               VALIDATION
            ----------------------------------------- */

            if (!name) {

                alert(
                    "Please enter your name."
                );

                if (reviewName) {
                    reviewName.focus();
                }

                return;
            }


            if (!selectedRating) {

                alert(
                    "Please select a rating from 1 to 5 stars."
                );

                return;
            }


            if (!text) {

                alert(
                    "Please write a short review."
                );

                if (reviewText) {
                    reviewText.focus();
                }

                return;
            }


            if (text.length < 5) {

                alert(
                    "Please write a little more about your experience."
                );

                if (reviewText) {
                    reviewText.focus();
                }

                return;
            }


            /* -----------------------------------------
               CREATE REVIEW
            ----------------------------------------- */

            const newReview = {

                name: name,

                rating: selectedRating,

                text: text,

                date: new Date().toISOString()

            };


            /* -----------------------------------------
               ADD REVIEW
            ----------------------------------------- */

            reviews.push(newReview);

            saveReviews();

            displayReviews();

            updateRatingSummary();


            /* -----------------------------------------
               RESET
            ----------------------------------------- */

            reviewForm.reset();

            selectedRating = 0;

            if (ratingValue) {
                ratingValue.value = "";
            }

            updateStarDisplay();


            /* -----------------------------------------
               SUCCESS MESSAGE
            ----------------------------------------- */

            alert(
                "Thank you for your review!"
            );

        }
    );
}


/* =====================================================
   UPDATE RATING SUMMARY
===================================================== */

function updateRatingSummary() {

    const averageRatingElement =
        document.getElementById(
            "averageRating"
        );


    const starsDisplay =
        document.getElementById(
            "starsDisplay"
        );


    const ratingCount =
        document.getElementById(
            "ratingCount"
        );


    /* -----------------------------------------
       NO REVIEWS
    ----------------------------------------- */

    if (reviews.length === 0) {

        if (averageRatingElement) {

            averageRatingElement.textContent =
                "0.0";

        }


        if (starsDisplay) {

            starsDisplay.textContent =
                "☆☆☆☆☆";

        }


        if (ratingCount) {

            ratingCount.textContent =
                "No reviews yet";

        }


        updateRatingBars();

        return;
    }


    /* -----------------------------------------
       CALCULATE AVERAGE
    ----------------------------------------- */

    const total =
        reviews.reduce(
            function (sum, review) {

                return sum + Number(review.rating);

            },
            0
        );


    const average =
        total / reviews.length;


    /* -----------------------------------------
       UPDATE AVERAGE
    ----------------------------------------- */

    if (averageRatingElement) {

        averageRatingElement.textContent =
            average.toFixed(1);

    }


    /* -----------------------------------------
       UPDATE STARS
    ----------------------------------------- */

    if (starsDisplay) {

        const rounded =
            Math.round(average);

        starsDisplay.textContent =
            "★".repeat(rounded) +
            "☆".repeat(5 - rounded);

    }


    /* -----------------------------------------
       UPDATE REVIEW COUNT
    ----------------------------------------- */

    if (ratingCount) {

        ratingCount.textContent =
            `${reviews.length} ${
                reviews.length === 1
                    ? "customer review"
                    : "customer reviews"
            }`;

    }


    updateRatingBars();
}


/* =====================================================
   UPDATE RATING BARS
===================================================== */

function updateRatingBars() {

    const totalReviews =
        reviews.length;


    for (let rating = 5; rating >= 1; rating--) {

        const count =
            reviews.filter(
                function (review) {

                    return Number(review.rating) === rating;

                }
            ).length;


        const percentage =
            totalReviews > 0
                ? (count / totalReviews) * 100
                : 0;


        const bar =
            document.querySelector(
                `.rating-bar-fill[data-rating="${rating}"]`
            );


        const countElement =
            document.querySelector(
                `.rating-count[data-rating="${rating}"]`
            );


        if (bar) {

            bar.style.width =
                `${percentage}%`;

        }


        if (countElement) {

            countElement.textContent =
                count;

        }

    }
}


/* =====================================================
   INITIALISE REVIEWS
===================================================== */

displayReviews();

updateRatingSummary();

updateStarDisplay();


/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

const navbar =
    document.querySelector(".navbar");


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


anchorLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            let target = null;


            try {

                target =
                    document.querySelector(
                        targetId
                    );

            } catch (error) {

                console.warn(
                    "Invalid anchor:",
                    targetId
                );

                return;
            }


            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

});


/* =====================================================
   AUTOMATIC FOOTER YEAR
===================================================== */

const yearElement =
    document.getElementById("year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}
