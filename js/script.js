document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE MENU
  ========================== */
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      siteNav.classList.toggle("open");
      menuToggle.setAttribute(
        "aria-expanded",
        siteNav.classList.contains("open")
      );
    });
  }


  /* =========================
     BACK TO TOP
  ========================== */
  const topButton = document.querySelector(".top-btn");

  if (topButton) {
    topButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }


  /* =========================
     NORMAL GANPATI BOOKING
  ========================== */
  const bookingForm = document.getElementById("bookingForm");

  if (bookingForm) {

    bookingForm.addEventListener("submit", (event) => {

      event.preventDefault();

      if (!bookingForm.checkValidity()) {
        bookingForm.reportValidity();
        return;
      }

      const getValue = (id) => {
        const element = document.getElementById(id);
        return element ? element.value.trim() : "";
      };

      const message =
`🙏 NEW GANPATI BOOKING

Name: ${getValue("name")}
Mobile: ${getValue("mobile")}
Email: ${getValue("email") || "Not provided"}
Murti: ${getValue("murti") || "Not specified"}
Size: ${getValue("size") || "Not specified"}
Quantity: ${getValue("qty") || "1"}
Payment: ${getValue("payment") || "Not specified"}
Delivery: ${getValue("delivery") || "Not specified"}
Preferred Date: ${getValue("date") || "Not specified"}
Address: ${getValue("address") || "Not provided"}
Note: ${getValue("note") || "None"}

Status: Pending manual confirmation

S.B. Joshi Enterprises
1237 Matruchaya Apartment,
Krantivir Vasudev Balvant Phadke Road,
Opp. Khunya Murlidhar Mandir,
Sadashiv Peth, Pune 411030`;

      const messageBox = document.getElementById("msg");

      if (messageBox) {
        messageBox.textContent = "Opening WhatsApp…";
      }

      window.open(
        "https://wa.me/918857874068?text=" +
        encodeURIComponent(message),
        "_blank"
      );

    });

  }


  /* =========================
     POOJA PRODUCT OPTIONS
  ========================== */

  const productOptions = `
    <option value="">Select Product</option>
    <option value="Agarbatti">Agarbatti</option>
    <option value="Dhup">Dhup</option>
    <option value="Kapoor">Kapoor</option>
    <option value="Wati">Wati</option>
    <option value="Halad">Halad</option>
    <option value="Kunku">Kunku</option>
    <option value="Attar">Attar</option>
    <option value="Ashtgandha">Ashtgandha</option>
    <option value="Vastramal">Vastramal</option>
  `;


  /* =========================
     POOJA PRODUCT ROW
  ========================== */

  const itemRows = document.getElementById("itemRows");
  const addProductButton = document.getElementById("addPoojaItem");


  function addRemoveButton(row) {

    const removeButton =
      row.querySelector(".remove-item");

    if (!removeButton) return;

    removeButton.addEventListener("click", () => {

      if (itemRows && itemRows.children.length > 1) {

        row.remove();

      } else {

        const product =
          row.querySelector(".poojaProduct");

        if (product) {
          product.value = "";
        }

      }

    });

  }


  /* Bind existing row */
  if (itemRows) {

    const existingRows =
      itemRows.querySelectorAll(".pooja-item-row");

    existingRows.forEach(row => {
      addRemoveButton(row);
    });

  }


  /* =========================
     ADD ANOTHER PRODUCT
  ========================== */

  if (addProductButton && itemRows) {

    addProductButton.addEventListener("click", () => {

      const newRow =
        document.createElement("div");

      newRow.className = "pooja-item-row";

      newRow.innerHTML = `
        <label>
          Product Name *
          <select class="poojaProduct" required>
            ${productOptions}
          </select>
        </label>

        <label>
          Qty *
          <input
            class="poojaQty"
            type="number"
            min="1"
            value="1"
            required
          >
        </label>

        <label>
          Size
          <select class="poojaSize">
            <option value="100 gm">100 gm</option>
            <option value="200 gm">200 gm</option>
            <option value="500 gm">500 gm</option>
            <option value="1 kg">1 kg</option>
          </select>
        </label>

        <button
          type="button"
          class="remove-item"
          aria-label="Remove product"
        >
          ×
        </button>
      `;

      itemRows.appendChild(newRow);

      addRemoveButton(newRow);

    });

  }


  /* =========================
     POOJA ARTICLE BOOKING
  ========================== */

  const poojaForm =
    document.getElementById("poojaBookingForm");


  if (poojaForm) {

    poojaForm.addEventListener("submit", (event) => {

      event.preventDefault();

      if (!poojaForm.checkValidity()) {

        poojaForm.reportValidity();
        return;

      }


      const getPoojaValue = (id) => {

        const element =
          document.getElementById(id);

        return element
          ? element.value.trim()
          : "";

      };


      /* Contact number validation */

      const mobile =
        getPoojaValue("poojaMobile");

      if (!/^\d{10}$/.test(mobile)) {

        const message =
          document.getElementById("poojaMsg");

        if (message) {
          message.textContent =
            "Please enter a valid 10-digit contact number.";
        }

        return;
      }


      /* Collect products */

      const rows =
        Array.from(
          document.querySelectorAll(
            ".pooja-item-row"
          )
        );


      const products = [];


      rows.forEach((row) => {

        const product =
          row.querySelector(".poojaProduct");

        const quantity =
          row.querySelector(".poojaQty");

        const size =
          row.querySelector(".poojaSize");


        if (
          product &&
          product.value.trim() !== ""
        ) {

          products.push({
            name: product.value.trim(),

            quantity:
              quantity
                ? quantity.value
                : "1",

            size:
              size
                ? size.value
                : "Not specified"
          });

        }

      });


      if (products.length === 0) {

        const message =
          document.getElementById("poojaMsg");

        if (message) {
          message.textContent =
            "Please select at least one product.";
        }

        return;

      }


      /* Create product message */

      const productMessage =
        products
          .map((product, index) => {

            return (
              `${index + 1}. ${product.name}` +
              ` — Qty: ${product.quantity}` +
              ` — Size: ${product.size}`
            );

          })
          .join("\n");


      /* WhatsApp message */

      const message =
`🙏 NEW POOJA SAHITYA BOOKING

Customer Name:
${getPoojaValue("poojaName")}

Contact Number:
${mobile}

PRODUCTS:
${productMessage}

Delivery:
${getPoojaValue("poojaDelivery")}

Address:
${getPoojaValue("poojaAddress") || "Not provided"}

Note:
${getPoojaValue("poojaNote") || "None"}

Status:
Pending manual confirmation

S.B. Joshi Enterprises
Ganpati Bappa Morya 🙏`;


      const messageBox =
        document.getElementById("poojaMsg");


      if (messageBox) {

        messageBox.textContent =
          "Opening WhatsApp…";

      }


      window.open(
        "https://wa.me/918857874068?text=" +
        encodeURIComponent(message),
        "_blank"
      );

    });

  }


  /* =========================
     IMAGE LIGHTBOX / ZOOM
  ========================== */

  const lightbox =
    document.getElementById("poojaLightbox");

  const lightboxImage =
    document.getElementById("lbImage");

  const lightboxCaption =
    document.getElementById("lbCaption");


  const galleryImages =
    Array.from(
      document.querySelectorAll(
        "img[data-lightbox]"
      )
    );


  let currentImage = 0;


  function openLightbox(index) {

    if (
      !lightbox ||
      !lightboxImage ||
      galleryImages.length === 0
    ) {
      return;
    }


    currentImage =
      (index + galleryImages.length) %
      galleryImages.length;


    const image =
      galleryImages[currentImage];


    lightboxImage.src =
      image.currentSrc ||
      image.src;


    lightboxImage.alt =
      image.alt || "";


    if (lightboxCaption) {

      lightboxCaption.textContent =
        image.dataset.caption ||
        image.alt ||
        "";

    }


    lightbox.classList.add("show");

    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "no-scroll"
    );

  }


  function closeLightbox() {

    if (!lightbox) return;


    lightbox.classList.remove(
      "show"
    );

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "no-scroll"
    );

  }


  function nextImage() {

    openLightbox(
      currentImage + 1
    );

  }


  function previousImage() {

    openLightbox(
      currentImage - 1
    );

  }


  /* Product/Gallery image click */

  galleryImages.forEach(
    (image, index) => {

      image.addEventListener(
        "click",
        () => {

          openLightbox(index);

        }
      );

    }
  );


  /* Close */

  if (lightbox) {

    const closeButton =
      lightbox.querySelector(
        ".lb-close"
      );

    if (closeButton) {

      closeButton.addEventListener(
        "click",
        closeLightbox
      );

    }


    const previousButton =
      lightbox.querySelector(
        ".lb-prev"
      );

    if (previousButton) {

      previousButton.addEventListener(
        "click",
        previousImage
      );

    }


    const nextButton =
      lightbox.querySelector(
        ".lb-next"
      );

    if (nextButton) {

      nextButton.addEventListener(
        "click",
        nextImage
      );

    }


    /* Click outside image */

    lightbox.addEventListener(
      "click",
      (event) => {

        if (
          event.target === lightbox
        ) {

          closeLightbox();

        }

      }
    );

  }


  /* =========================
     KEYBOARD CONTROLS
  ========================== */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        !lightbox ||
        !lightbox.classList.contains(
          "show"
        )
      ) {
        return;
      }


      if (event.key === "Escape") {

        closeLightbox();

      }


      if (
        event.key === "ArrowRight"
      ) {

        nextImage();

      }


      if (
        event.key === "ArrowLeft"
      ) {

        previousImage();

      }

    }
  );

});
