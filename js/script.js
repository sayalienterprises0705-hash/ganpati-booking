/* =========================================================
   S.B. JOSHI ENTERPRISES - WEBSITE JAVASCRIPT
   Fixed mobile menu + Ganpati WhatsApp booking
   ========================================================= */

(function () {
  "use strict";

  const WHATSAPP_NUMBER = "91885687068";

  function byId(id) {
    return document.getElementById(id);
  }

  function normalizeMobile(value) {
    let digits = String(value || "").replace(/\D/g, "");
    if (digits.startsWith("91") && digits.length === 12) digits = digits.slice(2);
    if (digits.startsWith("0") && digits.length === 11) digits = digits.slice(1);
    return digits;
  }

  function isValidIndianMobile(value) {
    return /^[6-9]\d{9}$/.test(normalizeMobile(value));
  }

  function setupMobileMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");
    if (!toggle || !nav) return;

    const closeMenu = function () {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
    };

    toggle.addEventListener("click", function (event) {
      event.stopPropagation();
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("no-scroll", open);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (event) {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  function setMinimumBookingDate() {
    const date = byId("bookingDate");
    if (!date) return;
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString().slice(0, 10);
    date.min = local;
  }

  function setupBackToTop() {
    const button = document.querySelector(".top-btn");
    if (!button) return;
    const update = function () {
      button.classList.toggle("show", window.scrollY > 400);
    };
    window.addEventListener("scroll", update, { passive: true });
    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    update();
  }

  function setupBookingForm() {
    const form = byId("bookingForm");
    if (!form) return;

    const messageBox = byId("msg");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const mobile = normalizeMobile(byId("mobile")?.value);
      if (!isValidIndianMobile(mobile)) {
        if (messageBox) messageBox.textContent = "Please enter a valid 10 digit Indian mobile number.";
        byId("mobile")?.focus();
        return;
      }

      const photo = byId("finalPhoto");
      const photoName = photo && photo.files && photo.files.length
        ? photo.files[0].name
        : "Not provided";

      const value = function (id) {
        const el = byId(id);
        return el ? String(el.value || "").trim() : "";
      };

      const lines = [
        "🙏 *GANPATI BAPPA BOOKING REQUEST* 🙏",
        "",
        "*S.B. Joshi Enterprises*",
        "------------------------------",
        "Customer Name: " + value("customerName"),
        "Customer Mobile: " + mobile,
        "Email: " + (value("email") || "Not provided"),
        "Murti Type: " + value("murtiType"),
        "Murti Size: " + value("murtiSize"),
        "Price: " + (value("price") || "To be confirmed"),
        "Quantity: " + value("quantity"),
        "Payment Option: " + value("paymentMode"),
        "Advance Amount: ₹" + value("advance"),
        "Collection / Delivery: " + value("delivery"),
        "Required Date: " + value("bookingDate"),
        "Address: " + value("address"),
        "Special Note: " + (value("note") || "None"),
        "Final Idol Photo: " + photoName,
        "",
        "Booking Status: Pending manual confirmation",
        "",
        "Please check availability and confirm this booking. 🙏"
      ];

      const message = lines.join("\n");
      const whatsappUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);

      if (messageBox) {
        messageBox.textContent = "Opening WhatsApp with your booking details... Please press Send to submit the order.";
      }

      // Direct wa.me link is the most reliable mobile-compatible method.
      // WhatsApp does not allow a website to silently send a message.
      window.location.href = whatsappUrl;
    });
  }

  function setupSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        const id = link.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupMobileMenu();
    setMinimumBookingDate();
    setupBookingForm();
    setupBackToTop();
    setupSmoothAnchors();
  });
})();
