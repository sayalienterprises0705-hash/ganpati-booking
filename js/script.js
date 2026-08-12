/* =========================================================
   S.B. JOSHI ENTERPRISES - WEBSITE JAVASCRIPT
   Fixed booking + Pooja Article WhatsApp handlers
========================================================= */

const WHATSAPP_NUMBER = "918857874068";

function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
}

function focusField(id) {
    const el = document.getElementById(id);
    if (el) el.focus();
}

function formatDate(dateString) {
    if (!dateString) return "";
    const parts = dateString.split("-");
    return parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : dateString;
}

function setMinimumBookingDate() {
    const input = document.getElementById("bookingDate");
    if (!input) return;
    const d = new Date();
    input.min = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/* =========================================================
   MOBILE MENU / BACK TO TOP
========================================================= */
function setupMobileMenu() {
    const button = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");
    if (!button || !nav) return;
    button.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        button.setAttribute("aria-expanded", open ? "true" : "false");
        document.body.classList.toggle("no-scroll", open);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
        nav.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
    }));
}

function setupBackToTop() {
    const button = document.querySelector(".top-btn");
    if (!button) return;
    const update = () => {
        const visible = window.scrollY > 300;
        button.style.opacity = visible ? "1" : "0";
        button.style.pointerEvents = visible ? "auto" : "none";
    };
    update();
    window.addEventListener("scroll", update);
    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* =========================================================
   GANPATI BOOKING FORM
========================================================= */
function setupBookingForm() {
    const form = document.getElementById("bookingForm");
    if (!form) return;

    /* Use our own validation so the click always produces feedback. */
    form.noValidate = true;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const customerName = getValue("customerName");
        const mobile = getValue("mobile").replace(/\D/g, "");
        const email = getValue("email");
        const murtiType = getValue("murtiType");
        const murtiSize = getValue("murtiSize");
        const price = getValue("price");
        const quantity = getValue("quantity");
        const paymentMode = getValue("paymentMode");
        const advance = getValue("advance");
        const delivery = getValue("delivery");
        const bookingDate = getValue("bookingDate");
        const address = getValue("address");
        const note = getValue("note");
        const photoInput = document.getElementById("finalPhoto");

        if (!customerName) { alert("Please enter customer name."); focusField("customerName"); return; }
        if (mobile.length !== 10) { alert("Please enter a valid 10 digit mobile number."); focusField("mobile"); return; }
        if (!murtiType) { alert("Please select Murti Type."); focusField("murtiType"); return; }
        if (!murtiSize) { alert("Please select Murti Size."); focusField("murtiSize"); return; }
        if (!quantity || Number(quantity) < 1) { alert("Please enter a valid quantity."); focusField("quantity"); return; }
        if (!paymentMode) { alert("Please select Payment Mode."); focusField("paymentMode"); return; }
        if (!advance || Number(advance) < 1) { alert("Please enter the advance amount."); focusField("advance"); return; }
        if (!delivery) { alert("Please select Delivery / Collection option."); focusField("delivery"); return; }
        if (!bookingDate) { alert("Please select your preferred date."); focusField("bookingDate"); return; }
        if (!address) { alert("Please enter your address."); focusField("address"); return; }
        if (photoInput && photoInput.required && !photoInput.files.length) {
            alert("Please upload the Final Idol Photo before submitting the booking.");
            photoInput.focus();
            return;
        }

        let message = "🙏 *NEW GANPATI BOOKING REQUEST* 🙏\n\n";
        message += "*S.B. Joshi Enterprises*\n\n";
        message += "👤 *Customer Details*\n";
        message += `Name: ${customerName}\nMobile: ${mobile}\n`;
        if (email) message += `Email: ${email}\n`;
        message += "\n🪔 *Murti Details*\n";
        message += `Murti: ${murtiType}\nSize: ${murtiSize}\nPrice: ${price ? "₹" + price : "Not specified"}\nQuantity: ${quantity}\n`;
        message += "\n💳 *Payment Details*\n";
        message += `Payment Mode: ${paymentMode}\nAdvance: ${advance ? "₹" + advance : "Not specified"}\n`;
        message += "\n📦 *Collection Details*\n";
        message += `Delivery: ${delivery}\nPreferred Date: ${formatDate(bookingDate)}\n`;
        message += `\n📍 *Address*\n${address}\n`;
        if (note) message += `\n📝 *Note*\n${note}\n`;
        if (photoInput && photoInput.files.length) message += `\n📷 Final Idol Photo: ${photoInput.files[0].name}\n`;
        message += "\n━━━━━━━━━━━━━━━━━━\nBooking Status: *Pending Approval*\n━━━━━━━━━━━━━━━━━━\n\nGanpati Bappa Morya! 🙏";

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        const confirmed = window.confirm("Your booking details are ready.\n\nClick OK to open WhatsApp and send your booking request.");
        if (!confirmed) return;

        const msg = document.getElementById("msg");
        if (msg) msg.textContent = "Opening WhatsApp with your booking details…";

        /* On supported phones, also offer the selected photo through the native share sheet. */
        if (photoInput && photoInput.files.length && navigator.share && navigator.canShare) {
            const file = photoInput.files[0];
            try {
                if (navigator.canShare({ files: [file] })) {
                    navigator.share({ title: "Ganpati Booking", text: message, files: [file] })
                        .catch(() => window.open(url, "_blank"));
                    return;
                }
            } catch (e) { /* fall back to WhatsApp */ }
        }
        window.open(url, "_blank", "noopener");
    });
}

/* =========================================================
   POOJA ARTICLE BOOKING FORM
========================================================= */
function setupPoojaBookingForm() {
    const form = document.getElementById("poojaBookingForm");
    if (!form) return;

    form.noValidate = true;
    const rows = document.getElementById("itemRows");
    const addButton = document.getElementById("addPoojaItem");

    function bindRow(row) {
        const remove = row.querySelector(".remove-item");
        if (remove) {
            remove.addEventListener("click", () => {
                const all = rows.querySelectorAll(".pooja-item-row");
                if (all.length === 1) {
                    row.querySelector(".poojaProduct").value = "";
                    row.querySelector(".poojaQty").value = "1";
                    row.querySelector(".poojaSize").selectedIndex = 0;
                } else {
                    row.remove();
                }
            });
        }
    }

    if (rows) rows.querySelectorAll(".pooja-item-row").forEach(bindRow);

    if (addButton && rows) {
        addButton.addEventListener("click", () => {
            const first = rows.querySelector(".pooja-item-row");
            if (!first) return;
            const clone = first.cloneNode(true);
            clone.querySelector(".poojaProduct").value = "";
            clone.querySelector(".poojaQty").value = "1";
            clone.querySelector(".poojaSize").selectedIndex = 0;
            rows.appendChild(clone);
            bindRow(clone);
            clone.querySelector(".poojaProduct").focus();
        });
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = getValue("poojaName");
        const mobile = getValue("poojaMobile").replace(/\D/g, "");
        const delivery = getValue("poojaDelivery");
        const address = getValue("poojaAddress");
        const note = getValue("poojaNote");
        const rowsList = rows ? Array.from(rows.querySelectorAll(".pooja-item-row")) : [];

        if (!name) { alert("Please enter customer name."); focusField("poojaName"); return; }
        if (mobile.length !== 10) { alert("Please enter a valid 10 digit mobile number."); focusField("poojaMobile"); return; }
        if (!rowsList.length) { alert("Please add at least one product."); return; }

        const products = [];
        for (let i = 0; i < rowsList.length; i++) {
            const product = rowsList[i].querySelector(".poojaProduct")?.value.trim();
            const qty = rowsList[i].querySelector(".poojaQty")?.value.trim();
            const size = rowsList[i].querySelector(".poojaSize")?.value.trim();
            if (!product) {
                alert(`Please select Product ${i + 1}.`);
                rowsList[i].querySelector(".poojaProduct")?.focus();
                return;
            }
            if (!qty || Number(qty) < 1) {
                alert(`Please enter a valid quantity for ${product}.`);
                rowsList[i].querySelector(".poojaQty")?.focus();
                return;
            }
            products.push(`${i + 1}. ${product} | Qty: ${qty} | Size: ${size}`);
        }

        if (delivery.includes("Home Delivery") && !address) {
            alert("Please enter the delivery address for Home Delivery.");
            focusField("poojaAddress");
            return;
        }

        let message = "🙏 *NEW POOJA ARTICLE BOOKING REQUEST* 🙏\n\n";
        message += "*S.B. Joshi Enterprises*\n\n";
        message += `👤 *Customer Details*\nName: ${name}\nMobile: ${mobile}\n\n`;
        message += "🪔 *Selected Pooja Articles*\n" + products.join("\n") + "\n\n";
        message += `📦 *Delivery*\n${delivery}\n`;
        if (address) message += `\n📍 *Address*\n${address}\n`;
        if (note) message += `\n📝 *Special Note*\n${note}\n`;
        message += "\n━━━━━━━━━━━━━━━━━━\nBooking Status: *Pending Approval*\nFinal product price, availability and delivery charges will be confirmed manually.\n━━━━━━━━━━━━━━━━━━\n\nGanpati Bappa Morya! 🙏";

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        const confirmed = window.confirm("Your Pooja Article booking details are ready.\n\nClick OK to open WhatsApp. Then press Send to submit your booking request.");
        if (!confirmed) return;

        const msg = document.getElementById("poojaMsg");
        if (msg) msg.textContent = "Opening WhatsApp with your Pooja Article booking…";
        window.open(url, "_blank", "noopener");
    });
}

/* =========================================================
   IMAGE LIGHTBOX
========================================================= */
let currentImageIndex = 0;
let lightboxImages = [];

function setupImageLightbox() {
    const images = document.querySelectorAll(".gallery img, .product-gallery img, .pooja-products-grid img, .about-bappa, [data-lightbox]");
    if (!images.length) return;
    createLightbox();
    images.forEach(image => image.addEventListener("click", () => openLightbox(image)));
}

function createLightbox() {
    if (document.getElementById("siteLightbox")) return;
    const box = document.createElement("div");
    box.id = "siteLightbox";
    box.className = "lightbox";
    box.innerHTML = `
        <button class="lb-close" type="button" aria-label="Close image">×</button>
        <button class="lb-prev" type="button" aria-label="Previous image">‹</button>
        <div class="lightbox-content"><img id="lbImage" src="" alt=""><div id="lbCaption" class="lb-caption"></div></div>
        <button class="lb-next" type="button" aria-label="Next image">›</button>`;
    document.body.appendChild(box);
    box.querySelector(".lb-close").addEventListener("click", closeLightbox);
    box.querySelector(".lb-prev").addEventListener("click", showPreviousImage);
    box.querySelector(".lb-next").addEventListener("click", showNextImage);
    box.addEventListener("click", e => { if (e.target === box) closeLightbox(); });
    document.addEventListener("keydown", e => {
        if (!box.classList.contains("show")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") showPreviousImage();
        if (e.key === "ArrowRight") showNextImage();
    });
}

function openLightbox(image) {
    const box = document.getElementById("siteLightbox");
    if (!box) return;
    lightboxImages = Array.from(document.querySelectorAll(".gallery img, .product-gallery img, .pooja-products-grid img, .about-bappa, [data-lightbox]"));
    currentImageIndex = Math.max(0, lightboxImages.indexOf(image));
    updateLightbox();
    box.classList.add("show");
    document.body.classList.add("no-scroll");
}

function updateLightbox() {
    const box = document.getElementById("siteLightbox");
    if (!box || !lightboxImages.length) return;
    const image = lightboxImages[currentImageIndex];
    document.getElementById("lbImage").src = image.src;
    document.getElementById("lbImage").alt = image.alt || "Image";
    document.getElementById("lbCaption").textContent = image.dataset.caption || image.alt || "";
    const showArrows = lightboxImages.length > 1;
    box.querySelector(".lb-prev").style.display = showArrows ? "grid" : "none";
    box.querySelector(".lb-next").style.display = showArrows ? "grid" : "none";
}

function closeLightbox() {
    const box = document.getElementById("siteLightbox");
    if (!box) return;
    box.classList.remove("show");
    document.body.classList.remove("no-scroll");
}

function showPreviousImage() {
    if (!lightboxImages.length) return;
    currentImageIndex = (currentImageIndex - 1 + lightboxImages.length) % lightboxImages.length;
    updateLightbox();
}

function showNextImage() {
    if (!lightboxImages.length) return;
    currentImageIndex = (currentImageIndex + 1) % lightboxImages.length;
    updateLightbox();
}

function setupGalleryImages() {
    document.querySelectorAll("img").forEach(image => image.addEventListener("error", () => image.dataset.imageError = "true"));
}

/* =========================================================
   PAGE READY
========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    setupMobileMenu();
    setupBackToTop();
    setupBookingForm();
    setupPoojaBookingForm();
    setupImageLightbox();
    setupGalleryImages();
    setMinimumBookingDate();
});
