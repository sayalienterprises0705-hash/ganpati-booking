document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    // Close the mobile menu after selecting a page
    siteNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  // Back-to-top button
  const topButton = document.querySelector(".top-btn");
  if (topButton) {
    topButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Ganpati booking form
  const bookingForm = document.getElementById("bookingForm");

  if (bookingForm) {
    bookingForm.addEventListener("submit", event => {
      event.preventDefault();

      if (!bookingForm.checkValidity()) {
        bookingForm.reportValidity();
        return;
      }

      const value = id => {
        const element = document.getElementById(id);
        return element ? element.value.trim() : "";
      };

      const message = `🙏 NEW GANPATI BOOKING

Customer Name: ${value("customerName")}
Contact Number: ${value("mobile")}
Email: ${value("email") || "Not provided"}
Murti Type: ${value("murtiType")}
Murti Size: ${value("murtiSize")}
Price: ${value("price") || "To be confirmed"}
Quantity: ${value("quantity")}
Payment Option: ${value("paymentMode")}
Advance Amount: ${value("advance")}
Delivery / Collection: ${value("delivery")}
Required Date: ${value("bookingDate")}
Address: ${value("address")}
Special Note: ${value("note") || "None"}

Status: Pending manual confirmation

S.B. Joshi Enterprises
1237 Matruchaya Apartment, Krantivir Vasudev Balvant Phadke Road,
Opp. Khunya Murlidhar Mandir, Sadashiv Peth, Pune 411030`;

      const msg = document.getElementById("msg");
      if (msg) msg.textContent = "Opening WhatsApp…";

      window.open(
        "https://wa.me/91885687068?text=" + encodeURIComponent(message),
        "_blank",
        "noopener"
      );
    });
  }

  // Pooja Articles catalogue
  const POOJA_CATALOG = [
    { category: "Agarbatti", image: "agarbatti.svg", name: "Agarbatti", description: "Devotional incense sticks for a fragrant Ganesh puja.", price: "₹ —" },
    { category: "Dhup", image: "dhup.svg", name: "Dhup", description: "Traditional dhoop for a calm and auspicious pooja atmosphere.", price: "₹ —" },
    { category: "Kapoor", image: "kapoor.svg", name: "Kapoor", description: "Camphor for a bright, traditional Ganesh aarti.", price: "₹ —" },
    { category: "Wati", image: "wati.svg", name: "Wati", description: "Cotton wicks for diyas used during puja and aarti.", price: "₹ —" },
    { category: "Attar", image: "attar.svg", name: "Attar", description: "Fragrant attar for traditional devotional use.", price: "₹ —" },
    { category: "Javnijod", image: "javnijod.svg", name: "Javnijod", description: "Traditional pooja samagri used for auspicious rituals.", price: "₹ —" },
    { category: "Vastramal", image: "vastramal.svg", name: "Vastramal", description: "Traditional pooja/decorative material for Ganesh festival rituals.", price: "₹ —" },
    { category: "Halad", image: "halad.svg", name: "Halad", description: "Auspicious turmeric used in traditional pooja ceremonies.", price: "₹ —" },
    { category: "Kunku", image: "kunku.svg", name: "Kunku", description: "Traditional kumkum for Ganesh puja and auspicious occasions.", price: "₹ —" }
  ];

  function renderPoojaProducts() {
    const target = document.getElementById("productCategories");
    if (!target) return;

    const groups = {};
    POOJA_CATALOG.forEach(product => {
      if (!groups[product.category]) groups[product.category] = [];
      groups[product.category].push(product);
    });

    target.innerHTML = Object.entries(groups).map(([category, items]) => `
      <section class="pooja-category">
        <div class="category-title">
          <h3>${category}</h3>
          <span>Ganesh Pooja Essential</span>
        </div>
        <div class="product-gallery">
          ${items.map(product => `
            <article class="product-card">
              <img src="images/${product.image}" alt="${product.name} pooja article">
              <div class="product-info">
                <p class="eyebrow">${product.category}</p>
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p class="price-line"><strong>Price:</strong> ${product.price}</p>
                <p class="size-line"><strong>Available sizes:</strong> 100 gm / 200 gm</p>
                <button type="button" class="btn choose-pooja" data-product="${product.name}">
                  Choose for Booking
                </button>
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    `).join("");

    target.querySelectorAll(".choose-pooja").forEach(button => {
      button.addEventListener("click", () => {
        const select = document.querySelector(".poojaProduct");
        if (select) {
          select.value = button.dataset.product;
          document.getElementById("poojaBooking")?.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  function setupPoojaBooking() {
    const form = document.getElementById("poojaBookingForm");
    if (!form) return;

    const fillProduct = select => {
      select.innerHTML = POOJA_CATALOG
        .map(product => `<option value="${product.name}">${product.name} — ${product.category}</option>`)
        .join("");
    };

    const first = form.querySelector(".poojaProduct");
    if (first) fillProduct(first);

    const addButton = document.getElementById("addPoojaItem");
    const rows = document.getElementById("itemRows");

    addButton?.addEventListener("click", () => {
      if (!rows) return;

      const row = document.createElement("div");
      row.className = "pooja-item-row";
      row.innerHTML = `
        <label>Product Name *
          <select class="poojaProduct" required></select>
        </label>
        <label>Qty *
          <input class="poojaQty" type="number" min="1" value="1" required>
        </label>
        <label>Size *
          <select class="poojaSize" required>
            <option value="100 gm">100 gm</option>
            <option value="200 gm">200 gm</option>
          </select>
        </label>
        <button type="button" class="remove-item" aria-label="Remove item">×</button>
      `;

      rows.appendChild(row);
      fillProduct(row.querySelector(".poojaProduct"));
    });

    rows?.addEventListener("click", event => {
      if (event.target.classList.contains("remove-item")) {
        const allRows = rows.querySelectorAll(".pooja-item-row");
        if (allRows.length > 1) {
          event.target.closest(".pooja-item-row").remove();
        }
      }
    });

    form.addEventListener("submit", event => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const value = id => (document.getElementById(id)?.value || "").trim();

      const items = [...form.querySelectorAll(".pooja-item-row")]
        .map((row, index) => {
          const product = row.querySelector(".poojaProduct")?.value || "";
          const qty = row.querySelector(".poojaQty")?.value || "";
          const size = row.querySelector(".poojaSize")?.value || "";
          return `${index + 1}. ${product} — ${qty} × ${size}`;
        })
        .join("\n");

      const delivery = value("poojaDelivery");
      const address = value("poojaAddress") ||
        (delivery.startsWith("Shop") ? "Not required — Shop Pickup" : "Not provided");

      const message = `🙏 NEW POOJA ARTICLE BOOKING

Customer Name: ${value("poojaName")}
Contact No: ${value("poojaMobile")}

Selected Products:
${items}

Delivery Mode: ${delivery}
Address: ${address}
Note: ${value("poojaNote") || "None"}

Status: Pending manual confirmation

S.B. Joshi Enterprises
1237 Matruchaya Apartment, Krantivir Vasudev Balvant Phadke Road,
Opp. Khunya Murlidhar Mandir, Sadashiv Peth, Pune 411030`;

      const messageElement = document.getElementById("poojaMsg");
      if (messageElement) messageElement.textContent = "Opening WhatsApp…";

      window.open(
        "https://wa.me/91885687068?text=" + encodeURIComponent(message),
        "_blank",
        "noopener"
      );
    });
  }

  renderPoojaProducts();
  setupPoojaBooking();
});
