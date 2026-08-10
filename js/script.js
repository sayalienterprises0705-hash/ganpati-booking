(() => {
  "use strict";

  // Business WhatsApp number: 8856874068
  // India country code = 91
  const OWNER_WHATSAPP = "918856874068";

  const prices = {
    "Eco Ganpati": {
      "10": 1800,
      "12": 2500,
      "15": 4000
    },
    "Traditional Ganpati": {
      "10": 2500,
      "12": 3500,
      "15": 5000
    },
    "Premium Ganpati": {
      "10": 4000,
      "12": 6000,
      "15": 9000
    }
  };

  const $ = (id) => document.getElementById(id);

  const money = (n) =>
    n ? "₹" + Number(n).toLocaleString("en-IN") : "—";

  function makeBookingId() {
    const d = new Date();

    const stamp =
      String(d.getFullYear()).slice(-2) +
      String(d.getMonth() + 1).padStart(2, "0") +
      String(d.getDate()).padStart(2, "0");

    return "SBJ" + stamp + Math.floor(1000 + Math.random() * 9000);
  }

  /* ================================
     MOBILE MENU
  ================================= */

  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (menu && nav) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });
  }

  /* ================================
     BACK TO TOP
  ================================= */

  const topBtn = document.querySelector(".top-btn");

  if (topBtn) {
    const updateTop = () => {
      topBtn.style.display =
        window.scrollY > 300 ? "block" : "none";
    };

    window.addEventListener("scroll", updateTop);

    topBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    updateTop();
  }

  /* ================================
     HERO SLIDER
  ================================= */

  const slides = [
    ...document.querySelectorAll(".hero-slide")
  ];

  const dots = document.querySelector(".slider-dots");

  if (slides.length && dots) {
    let index = 0;

    slides.forEach((_, i) => {
      const button = document.createElement("button");

      button.setAttribute(
        "aria-label",
        `Show slide ${i + 1}`
      );

      button.addEventListener("click", () => {
        showSlide(i);
      });

      dots.appendChild(button);
    });

    const dotEls = [...dots.children];

    function showSlide(i) {
      index = (i + slides.length) % slides.length;

      slides.forEach((slide, n) => {
        slide.classList.toggle(
          "active",
          n === index
        );
      });

      dotEls.forEach((dot, n) => {
        dot.classList.toggle(
          "active",
          n === index
        );
      });
    }

    showSlide(0);

    setInterval(() => {
      showSlide(index + 1);
    }, 5000);
  }

  /* ================================
     PRICE PAGE
  ================================= */

  const priceMurti = $("priceMurti");
  const priceSize = $("priceSize");
  const displayPrice = $("displayPrice");

  function updatePricePage() {
    if (!priceMurti || !priceSize || !displayPrice) {
      return;
    }

    const value =
      prices[priceMurti.value]?.[priceSize.value];

    displayPrice.textContent =
      value ? money(value) : "—";
  }

  priceMurti?.addEventListener(
    "change",
    updatePricePage
  );

  priceSize?.addEventListener(
    "change",
    updatePricePage
  );

  /* ================================
     BOOKING PAGE
  ================================= */

  const form = $("bookingForm");

  if (form) {
    const id = makeBookingId();

    if ($("bookingId")) {
      $("bookingId").value = id;
    }

    if ($("summaryId")) {
      $("summaryId").textContent = id;
    }

    sessionStorage.setItem(
      "lastBookingId",
      id
    );

    /* Prefill Murti from URL */

    const params =
      new URLSearchParams(location.search);

    const requestedMurti =
      params.get("murti");

    if (
      requestedMurti &&
      $("murti") &&
      [...$("murti").options].some(
        (option) =>
          option.value === requestedMurti
      )
    ) {
      $("murti").value =
        requestedMurti;
    }

    /* ================================
       UPDATE BOOKING SUMMARY
    ================================= */

    const updateSummary = () => {
      const murti =
        $("murti")?.value || "";

      const size =
        $("size")?.value || "";

      const qty = Math.max(
        1,
        Number($("quantity")?.value || 1)
      );

      const unit =
        prices[murti]?.[size] || 0;

      const total =
        unit * qty;

      if ($("price")) {
        $("price").value =
          total ? String(total) : "";
      }

      if ($("summaryId")) {
        $("summaryId").textContent =
          id;
      }

      if ($("summaryName")) {
        $("summaryName").textContent =
          $("customerName")?.value.trim() ||
          "—";
      }

      if ($("summaryMurti")) {
        $("summaryMurti").textContent =
          murti || "—";
      }

      if ($("summarySize")) {
        $("summarySize").textContent =
          size ? size + " Inch" : "—";
      }

      if ($("summaryQty")) {
        $("summaryQty").textContent =
          qty;
      }

      if ($("summaryPrice")) {
        $("summaryPrice").textContent =
          total ? money(total) : "—";
      }

      if ($("summaryPayment")) {
        $("summaryPayment").textContent =
          $("paymentMode")?.value ||
          "—";
      }
    };

    [
      "customerName",
      "murti",
      "size",
      "quantity",
      "paymentMode"
    ].forEach((fieldId) => {
      $(fieldId)?.addEventListener(
        "input",
        updateSummary
      );

      $(fieldId)?.addEventListener(
        "change",
        updateSummary
      );
    });

    updateSummary();

    /* ================================
       PREVENT PAST DATES
    ================================= */

    const date = $("date");

    if (date) {
      const now = new Date();

      const local =
        new Date(
          now.getTime() -
          now.getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, 10);

      date.min = local;
    }

    /* ================================
       BOOKING SUBMIT
    ================================= */

    form.addEventListener(
      "submit",
      (e) => {
        e.preventDefault();

        const msg =
          $("formMessage");

        if (!form.checkValidity()) {
          form.reportValidity();

          if (msg) {
            msg.textContent =
              "Please complete all required fields.";
          }

          return;
        }

        const mobile =
          $("mobile")
            .value
            .replace(/\D/g, "");

        if (!/^\d{10}$/.test(mobile)) {
          if (msg) {
            msg.textContent =
              "Please enter a valid 10-digit mobile number.";
          }

          $("mobile").focus();

          return;
        }

        updateSummary();

        const customerName =
          $("customerName")
            .value
            .trim();

        const email =
          $("email")?.value.trim() ||
          "Not provided";

        const murti =
          $("murti").value;

        const size =
          $("size").value;

        const qty =
          Math.max(
            1,
            Number(
              $("quantity").value || 1
            )
          );

        const total =
          prices[murti]?.[size]
            ? prices[murti][size] * qty
            : 0;

        const advance =
          Number(
            $("advance")?.value || 0
          );

        const paymentMode =
          $("paymentMode")?.value ||
          "Not selected";

        const delivery =
          $("delivery")?.value ||
          "Not selected";

        const deliveryDate =
          $("date")?.value ||
          "Not selected";

        const address =
          $("address")?.value.trim() ||
          "Not provided";

        const note =
          $("note")?.value.trim() ||
          "None";

        /*
         * IMPORTANT
         *
         * ONLY THE BOOKING DETAILS ARE
         * SENT TO YOUR BUSINESS WHATSAPP.
         *
         * NO CUSTOMER CONFIRMATION MESSAGE
         * IS SENT AUTOMATICALLY.
         */

        const text =
`🛕 *NEW GANPATI BOOKING*

━━━━━━━━━━━━━━
🆔 *Booking ID:* ${id}

👤 *Customer Name:* ${customerName}
📞 *Mobile:* ${mobile}
📧 *Email:* ${email}

🙏 *Murti:* ${murti}
📏 *Size:* ${size} Inch
🔢 *Quantity:* ${qty}

💵 *Total Price:* ${money(total)}
💰 *Advance:* ${money(advance)}
💳 *Payment Mode:* ${paymentMode}

🚚 *Delivery:* ${delivery}
📅 *Delivery Date:* ${deliveryDate}

📍 *Address:*
${address}

📝 *Note:*
${note}

⏳ *Booking Status:* PENDING APPROVAL

━━━━━━━━━━━━━━`;

        sessionStorage.setItem(
          "lastBookingId",
          id
        );

        /*
         * WhatsApp opens ONLY for your
         * business number.
         */

        const wa =
          `https://wa.me/${OWNER_WHATSAPP}` +
          `?text=${encodeURIComponent(text)}`;

        if (msg) {
          msg.textContent =
            "Opening WhatsApp… Please press Send there to submit your booking.";
        }

        window.open(
          wa,
          "_blank",
          "noopener"
        );

        /*
         * Customer sees only the website
         * Thank You page.
         *
         * No second WhatsApp message.
         */

        setTimeout(() => {
          location.href =
            `thankyou.html?id=${encodeURIComponent(id)}`;
        }, 700);
      }
    );
  }

  /* ================================
     CONTACT FORM
  ================================= */

  const contactForm =
    $("contactForm");

  if (contactForm) {
    contactForm.addEventListener(
      "submit",
      (e) => {
        e.preventDefault();

        if (!contactForm.checkValidity()) {
          contactForm.reportValidity();
          return;
        }

        const name =
          $("contactName")
            .value
            .trim();

        const mobile =
          $("contactMobile")
            .value
            .replace(/\D/g, "");

        const message =
          $("contactMessage")
            .value
            .trim();

        const status =
          $("contactMessageStatus");

        if (!/^\d{10}$/.test(mobile)) {
          if (status) {
            status.textContent =
              "Enter a valid 10-digit mobile number.";
          }

          return;
        }

        const text =
`Hello S.B. Joshi Enterprises,

Name: ${name}
Mobile: ${mobile}

Message:
${message}`;

        window.open(
          `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(text)}`,
          "_blank",
          "noopener"
        );

        if (status) {
          status.textContent =
            "Opening WhatsApp…";
        }
      }
    );
  }

})();
