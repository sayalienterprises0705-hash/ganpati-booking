(() => {
  "use strict";

  const OWNER_WHATSAPP = "918856874068";
  const prices = {
    "Eco Ganpati": {"10":1800,"12":2500,"15":4000},
    "Traditional Ganpati": {"10":2500,"12":3500,"15":5000},
    "Premium Ganpati": {"10":4000,"12":6000,"15":9000}
  };

  const $ = (id) => document.getElementById(id);
  const money = (n) => n ? "₹" + Number(n).toLocaleString("en-IN") : "—";

  function makeBookingId() {
    const d = new Date();
    const stamp = String(d.getFullYear()).slice(-2) + String(d.getMonth()+1).padStart(2,"0") + String(d.getDate()).padStart(2,"0");
    return "SBJ" + stamp + Math.floor(1000 + Math.random()*9000);
  }

  // Mobile navigation
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (menu && nav) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });
  }

  // Back to top
  const topBtn = document.querySelector(".top-btn");
  if (topBtn) {
    const updateTop = () => { topBtn.style.display = window.scrollY > 300 ? "block" : "none"; };
    window.addEventListener("scroll", updateTop);
    topBtn.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));
    updateTop();
  }

  // Home hero slider
  const slides = [...document.querySelectorAll(".hero-slide")];
  const dots = document.querySelector(".slider-dots");
  if (slides.length && dots) {
    let index = 0;
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.setAttribute("aria-label", `Show slide ${i+1}`);
      b.addEventListener("click", () => showSlide(i));
      dots.appendChild(b);
    });
    const dotEls = [...dots.children];
    function showSlide(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach((s,n) => s.classList.toggle("active", n === index));
      dotEls.forEach((d,n) => d.classList.toggle("active", n === index));
    }
    showSlide(0);
    setInterval(() => showSlide(index + 1), 5000);
  }

  // Price page
  const priceMurti = $("priceMurti"), priceSize = $("priceSize"), displayPrice = $("displayPrice");
  function updatePricePage() {
    if (!priceMurti || !priceSize || !displayPrice) return;
    const value = prices[priceMurti.value]?.[priceSize.value];
    displayPrice.textContent = value ? money(value) : "—";
  }
  priceMurti?.addEventListener("change", updatePricePage);
  priceSize?.addEventListener("change", updatePricePage);

  // Booking page
  const form = $("bookingForm");
  if (form) {
    const id = makeBookingId();
    $("bookingId").value = id;
    $("summaryId").textContent = id;
    sessionStorage.setItem("lastBookingId", id);

    // Prefill murti from gallery link
    const params = new URLSearchParams(location.search);
    const requestedMurti = params.get("murti");
    if (requestedMurti && [...$("murti").options].some(o => o.value === requestedMurti)) {
      $("murti").value = requestedMurti;
    }

    const updateSummary = () => {
      const murti = $("murti").value;
      const size = $("size").value;
      const qty = Math.max(1, Number($("quantity").value || 1));
      const unit = prices[murti]?.[size] || 0;
      const total = unit * qty;
      $("price").value = total ? String(total) : "";
      $("summaryId").textContent = id;
      $("summaryName").textContent = $("customerName").value.trim() || "—";
      $("summaryMurti").textContent = murti || "—";
      $("summarySize").textContent = size ? size + " Inch" : "—";
      $("summaryQty").textContent = qty;
      $("summaryPrice").textContent = total ? money(total) : "—";
      $("summaryPayment").textContent = $("paymentMode").value || "—";
    };

    ["customerName","murti","size","quantity","paymentMode"].forEach(id => {
      $(id)?.addEventListener("input", updateSummary);
      $(id)?.addEventListener("change", updateSummary);
    });
    updateSummary();

    // Don't allow dates in the past
    const date = $("date");
    if (date) {
      const now = new Date();
      const local = new Date(now.getTime() - now.getTimezoneOffset()*60000).toISOString().slice(0,10);
      date.min = local;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = $("formMessage");
      if (!form.checkValidity()) {
        form.reportValidity();
        msg.textContent = "Please complete all required fields.";
        return;
      }

      const mobile = $("mobile").value.replace(/\D/g, "");
      if (!/^\d{10}$/.test(mobile)) {
        msg.textContent = "Please enter a valid 10-digit mobile number.";
        $("mobile").focus();
        return;
      }

      updateSummary();
      const murti = $("murti").value;
      const size = $("size").value;
      const qty = Number($("quantity").value);
      const total = prices[murti]?.[size] ? prices[murti][size] * qty : 0;
      const advance = Number($("advance").value || 0);
      const note = $("note").value.trim() || "None";
      const address = $("address").value.trim();

      const text =
`🛕 *NEW GANPATI BOOKING*

━━━━━━━━━━━━━━
🆔 *Booking ID:* ${id}

👤 *Name:* ${$("customerName").value.trim()}
📞 *Mobile:* ${mobile}
📧 *Email:* ${$("email").value.trim() || "Not provided"}

🙏 *Murti:* ${murti}
📏 *Size:* ${size} Inch
🔢 *Quantity:* ${qty}
💵 *Total Price:* ${money(total)}
💰 *Advance:* ${money(advance)}
💳 *Payment:* ${$("paymentMode").value}

🚚 *Delivery:* ${$("delivery").value}
📅 *Date:* ${$("date").value}
📍 *Address:* ${address}
📝 *Note:* ${note}

⏳ *Status:* Payment/Booking Pending Approval

━━━━━━━━━━━━━━

🙏 *CUSTOMER CONFIRMATION MESSAGE*

Dear ${$("customerName").value.trim()},

Thank you for your booking request with *S.B. Joshi Enterprises*.

🆔 Booking ID: ${id}
🙏 Murti: ${murti}
📏 Size: ${size} Inch
🔢 Quantity: ${qty}
💵 Total: ${money(total)}

⏳ *Booking Status: Pending Approval*

Your booking will be confirmed after our team reviews the request.

📞 8856874068

Thank you 🙏
*S.B. Joshi Enterprises*`;

      sessionStorage.setItem("lastBookingId", id);
      const wa = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(text)}`;
      msg.textContent = "Opening WhatsApp… Please press Send there to submit your request.";
      window.open(wa, "_blank", "noopener");

      // Navigate only after opening the WhatsApp window.
      setTimeout(() => {
        location.href = `thankyou.html?id=${encodeURIComponent(id)}`;
      }, 700);
    });
  }

  // Contact form -> WhatsApp
  const contactForm = $("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }
      const name = $("contactName").value.trim();
      const mobile = $("contactMobile").value.replace(/\D/g, "");
      const message = $("contactMessage").value.trim();
      const status = $("contactMessageStatus");
      if (!/^\d{10}$/.test(mobile)) { status.textContent = "Enter a valid 10-digit mobile number."; return; }
      const text = `Hello S.B. Joshi Enterprises,\n\nName: ${name}\nMobile: ${mobile}\n\nMessage:\n${message}`;
      window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
      status.textContent = "Opening WhatsApp…";
    });
  }
})();