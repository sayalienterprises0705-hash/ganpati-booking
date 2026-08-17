/* =========================================================
   S.B. JOSHI ENTERPRISES - WEBSITE JAVASCRIPT
   Mobile menu + Ganpati WhatsApp booking
   ========================================================= */
(function () {
  "use strict";

  // Business WhatsApp number: +91 88568 74068
  const WHATSAPP_NUMBER = "918856874068";

  function byId(id) { return document.getElementById(id); }

  function normalizeMobile(value) {
    let digits = String(value || "").replace(/\D/g, "");
    if (digits.startsWith("91") && digits.length === 12) digits = digits.slice(2);
    if (digits.startsWith("0") && digits.length === 11) digits = digits.slice(1);
    return digits;
  }

  function isValidIndianMobile(value) {
    return /^[6-9]\d{9}$/.test(normalizeMobile(value));
  }

  function installMobileMenuStyles() {
    if (document.getElementById("sbj-mobile-menu-styles")) return;
    const style = document.createElement("style");
    style.id = "sbj-mobile-menu-styles";
    style.textContent = `
      @media (max-width: 900px) {
        .site-header { position: sticky !important; top: 0 !important; z-index: 5000 !important; }
        .menu-toggle { display: block !important; position: relative !important; z-index: 5002 !important; min-width: 44px; min-height: 44px; border: 0 !important; background: transparent !important; cursor: pointer !important; touch-action: manipulation; }
        .site-nav { display: none !important; position: absolute !important; top: 100% !important; left: 0 !important; right: 0 !important; z-index: 5001 !important; flex-direction: column !important; align-items: stretch !important; gap: 0 !important; padding: 8px 12px !important; margin: 0 !important; background: #fff8f0 !important; border-top: 1px solid #ead7c6 !important; box-shadow: 0 12px 25px rgba(59,33,24,.18) !important; }
        .site-nav.open { display: flex !important; }
        .site-nav a { display: block !important; width: 100% !important; padding: 13px 14px !important; border-bottom: 1px solid #ead7c6 !important; text-align: left !important; }
      }
      @media (min-width: 901px) { .menu-toggle { display: none !important; } .site-nav { display: flex !important; } }
    `;
    document.head.appendChild(style);
  }

  function setupMobileMenu() {
    installMobileMenuStyles();
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");
    if (!toggle || !nav || toggle.dataset.menuReady === "true") return;
    toggle.dataset.menuReady = "true";

    function closeMenu() {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      document.body.classList.remove("no-scroll");
    }

    toggle.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      const open = !nav.classList.contains("open");
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.classList.toggle("no-scroll", open);
    }, { passive: false });

    nav.querySelectorAll("a").forEach(function (link) { link.addEventListener("click", closeMenu); });
    document.addEventListener("click", function (event) {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
    document.addEventListener("keydown", function (event) { if (event.key === "Escape") closeMenu(); });
    window.addEventListener("resize", function () { if (window.innerWidth > 900) closeMenu(); });
  }

  function setMinimumBookingDate() {
    const date = byId("bookingDate");
    if (!date) return;
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    date.min = local;
  }

  function setupBackToTop() {
    const button = document.querySelector(".top-btn");
    if (!button) return;
    function update() { button.classList.toggle("show", window.scrollY > 400); }
    window.addEventListener("scroll", update, { passive: true });
    button.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    update();
  }

  function setupBookingForm() {
    const form = byId("bookingForm");
    if (!form || form.dataset.whatsappReady === "true") return;
    form.dataset.whatsappReady = "true";
    const messageBox = byId("msg");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      const mobile = normalizeMobile(byId("mobile")?.value);
      if (!isValidIndianMobile(mobile)) {
        if (messageBox) messageBox.textContent = "Please enter a valid 10 digit Indian mobile number.";
        byId("mobile")?.focus();
        return;
      }

      const photo = byId("finalPhoto");
      const photoName = photo?.files?.length ? photo.files[0].name : "Not provided";
      const value = id => String(byId(id)?.value || "").trim();

      const message = [
        "🙏 *GANPATI BAPPA BOOKING REQUEST* 🙏", "", "*S.B. Joshi Enterprises*", "------------------------------",
        "Customer Name: " + value("customerName"), "Customer Mobile: " + mobile,
        "Email: " + (value("email") || "Not provided"), "Murti Type: " + value("murtiType"),
        "Murti Size: " + value("murtiSize"), "Price: " + (value("price") || "To be confirmed"),
        "Quantity: " + value("quantity"), "Payment Option: " + value("paymentMode"),
        "Advance Amount: ₹" + value("advance"), "Collection / Delivery: " + value("delivery"),
        "Required Date: " + value("bookingDate"), "Address: " + value("address"),
        "Special Note: " + (value("note") || "None"), "Final Idol Photo: " + photoName, "",
        "Booking Status: Pending manual confirmation", "Please check availability and confirm this booking. 🙏"
      ].join("\n");

      const whatsappUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
      if (messageBox) messageBox.textContent = "Opening WhatsApp for S.B. Joshi Enterprises. Please press Send to submit your booking request.";
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

  function init() {
    setupMobileMenu();
    setMinimumBookingDate();
    setupBookingForm();
    setupBackToTop();
    setupSmoothAnchors();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
