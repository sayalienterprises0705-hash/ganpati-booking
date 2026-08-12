document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     MOBILE MENU
  ====================================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (menuToggle && siteNav) {

    menuToggle.addEventListener("click", function () {

      siteNav.classList.toggle("open");

      const expanded =
        siteNav.classList.contains("open");

      menuToggle.setAttribute(
        "aria-expanded",
        expanded ? "true" : "false"
      );

    });

  }


  /* =====================================================
     BACK TO TOP
  ====================================================== */

  const topButton =
    document.querySelector(".top-btn");

  if (topButton) {

    topButton.addEventListener(
      "click",
      function () {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  }


  /* =====================================================
     PRODUCT OPTIONS
  ====================================================== */

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


  /* =====================================================
     POOJA PRODUCT ROW
  ====================================================== */

  const itemRows =
    document.getElementById("itemRows");

  const addProductButton =
    document.getElementById("addPoojaItem");


  function addRemoveButton(row) {

    const removeButton =
      row.querySelector(".remove-item");

    if (!removeButton) {
      return;
    }


    removeButton.addEventListener(
      "click",
      function () {

        if (
          itemRows &&
          itemRows.children.length > 1
        ) {

          row.remove();

        } else {

          const product =
            row.querySelector(".poojaProduct");

          const quantity =
            row.querySelector(".poojaQty");

          if (product) {
            product.value = "";
          }

          if (quantity) {
            quantity.value = "1";
          }

        }

      }
    );

  }


  /* =====================================================
     EXISTING PRODUCT ROWS
  ====================================================== */

  if (itemRows) {

    const rows =
      itemRows.querySelectorAll(
        ".pooja-item-row"
      );

    rows.forEach(function (row) {

      addRemoveButton(row);

    });

  }


  /* =====================================================
     ADD ANOTHER PRODUCT
  ====================================================== */

  if (
    addProductButton &&
    itemRows
  ) {

    addProductButton.addEventListener(
      "click",
      function () {

        const newRow =
          document.createElement("div");

        newRow.className =
          "pooja-item-row";


        newRow.innerHTML = `

          <label>

            Product Name *

            <select
              class="poojaProduct"
              required
            >

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

            <select
              class="poojaSize"
            >

              <option value="">
                Select Size
              </option>

              <option value="Small">
                Small
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Large">
                Large
              </option>

              <option value="100 gm">
                100 gm
              </option>

              <option value="200 gm">
                200 gm
              </option>

              <option value="500 gm">
                500 gm
              </option>

              <option value="1 kg">
                1 kg
              </option>

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

      }
    );

  }


  /* =====================================================
     NORMAL GANPATI BOOKING
  ====================================================== */

  const bookingForm =
    document.getElementById("bookingForm");


  if (bookingForm) {

    bookingForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        if (!bookingForm.checkValidity()) {

          bookingForm.reportValidity();

          return;

        }


        function value(id) {

          const element =
            document.getElementById(id);

          return element
            ? element.value.trim()
            : "";

        }


        const customerName =
          value("name");


        const mobile =
          value("mobile");


        const email =
          value("email");


        const murti =
          value("murti");


        const size =
          value("size");


        const quantity =
          value("qty") || "1";


        const payment =
          value("payment");


        const advance =
          value("advance");


        const delivery =
          value("delivery");


        const date =
          value("date");


        const address =
          value("address");


        const note =
          value("note");


        const message =

`🙏 NEW GANPATI BOOKING

Customer Name: ${customerName}

Mobile: ${mobile}

Email: ${email || "Not provided"}

Murti: ${murti || "Not specified"}

Size: ${size || "Not specified"}

Quantity: ${quantity}

Payment: ${payment || "Payment Pending"}

Advance: ${advance || "Not specified"}

Delivery: ${delivery || "Not specified"}

Date: ${date || "Not specified"}

Address: ${address || "Not provided"}

Note: ${note || "None"}

Status: Pending manual confirmation

S.B. Joshi Enterprises
Ganpati Bappa Morya 🙏`;


        const messageBox =
          document.getElementById("msg");


        if (messageBox) {

          messageBox.textContent =
            "Opening WhatsApp…";

        }


        window.open(

          "https://wa.me/918857874068?text=" +
          encodeURIComponent(message),

          "_blank"

        );

      }
    );

  }


  /* =====================================================
     POOJA ARTICLES BOOKING
  ====================================================== */

  const poojaForm =
    document.getElementById(
      "poojaBookingForm"
    );


  if (poojaForm) {

    poojaForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        if (!poojaForm.checkValidity()) {

          poojaForm.reportValidity();

          return;

        }


        function poojaValue(id) {

          const element =
            document.getElementById(id);

          return element
            ? element.value.trim()
            : "";

        }


        const customerName =
          poojaValue("poojaName");


        const mobile =
          poojaValue("poojaMobile");


        /* 10 digit validation */

        if (!/^[0-9]{10}$/.test(mobile)) {

          const messageBox =
            document.getElementById(
              "poojaMsg"
            );


          if (messageBox) {

            messageBox.textContent =
              "Please enter a valid 10-digit contact number.";

          }

          return;

        }


        /* =================================================
           COLLECT ALL PRODUCTS
        ================================================== */

        const rows =
          Array.from(
            document.querySelectorAll(
              ".pooja-item-row"
            )
          );


        const products = [];


        rows.forEach(
          function (row) {

            const product =
              row.querySelector(
                ".poojaProduct"
              );


            const quantity =
              row.querySelector(
                ".poojaQty"
              );


            const size =
              row.querySelector(
                ".poojaSize"
              );


            if (
              product &&
              product.value.trim() !== ""
            ) {

              products.push({

                name:
                  product.value.trim(),

                quantity:
                  quantity
                    ? quantity.value
                    : "1",

                size:
                  size &&
                  size.value
                    ? size.value
                    : "Not specified"

              });

            }

          }
        );


        if (products.length === 0) {

          const messageBox =
            document.getElementById(
              "poojaMsg"
            );


          if (messageBox) {

            messageBox.textContent =
              "Please select at least one Pooja Article.";

          }

          return;

        }


        /* =================================================
           PRODUCT MESSAGE
        ================================================== */

        const productMessage =
          products
            .map(
              function (product, index) {

                return (

                  `${index + 1}. ` +
                  `${product.name} ` +
                  `— Qty: ${product.quantity} ` +
                  `— Size: ${product.size}`

                );

              }
            )
            .join("\n");


        const delivery =
          poojaValue(
            "poojaDelivery"
          );


        const address =
          poojaValue(
            "poojaAddress"
          );


        const note =
          poojaValue(
            "poojaNote"
          );


        /* =================================================
           WHATSAPP MESSAGE
        ================================================== */

        const message =

`🙏 NEW POOJA SAHITYA BOOKING

Customer Name:
${customerName}

Contact Number:
${mobile}

PRODUCTS:

${productMessage}

Delivery:
${delivery || "Not specified"}

Address:
${address || "Not provided"}

Note:
${note || "None"}

Status:
Pending manual confirmation

S.B. Joshi Enterprises
Ganpati Bappa Morya 🙏`;


        const messageBox =
          document.getElementById(
            "poojaMsg"
          );


        if (messageBox) {

          messageBox.textContent =
            "Opening WhatsApp…";

        }


        window.open(

          "https://wa.me/918857874068?text=" +
          encodeURIComponent(message),

          "_blank"

        );

      }
    );

  }


  /* =====================================================
     IMAGE LIGHTBOX / ZOOM
  ====================================================== */

  const lightbox =
    document.getElementById(
      "poojaLightbox"
    );


  const lightboxImage =
    document.getElementById(
      "lbImage"
    );


  const lightboxCaption =
    document.getElementById(
      "lbCaption"
    );


  /*
     Supports BOTH:
     data-lightbox="gallery"
     data-lightbox="pooja"
  */

  const galleryImages =
    Array.from(
      document.querySelectorAll(
        "img[data-lightbox]"
      )
    );


  let currentImage = 0;


  /* =====================================================
     OPEN LIGHTBOX
  ====================================================== */

  function openLightbox(index) {

    if (
      !lightbox ||
      !lightboxImage ||
      galleryImages.length === 0
    ) {

      return;

    }


    currentImage =
      (
        index +
        galleryImages.length
      ) %
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


    lightbox.classList.add(
      "show"
    );


    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.classList.add(
      "no-scroll"
    );

  }


  /* =====================================================
     CLOSE LIGHTBOX
  ====================================================== */

  function closeLightbox() {

    if (!lightbox) {

      return;

    }


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


  /* =====================================================
     NEXT IMAGE
  ====================================================== */

  function nextImage() {

    if (
      galleryImages.length === 0
    ) {

      return;

    }


    openLightbox(
      currentImage + 1
    );

  }


  /* =====================================================
     PREVIOUS IMAGE
  ====================================================== */

  function previousImage() {

    if (
      galleryImages.length === 0
    ) {

      return;

    }


    openLightbox(
      currentImage - 1
    );

  }


  /* =====================================================
     IMAGE CLICK
  ====================================================== */

  galleryImages.forEach(
    function (image, index) {

      image.style.cursor =
        "zoom-in";


      image.addEventListener(
        "click",
        function () {

          openLightbox(index);

        }
      );

    }
  );


  /* =====================================================
     LIGHTBOX BUTTONS
  ====================================================== */

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
      function (event) {

        if (
          event.target === lightbox
        ) {

          closeLightbox();

        }

      }
    );

  }


  /* =====================================================
     KEYBOARD CONTROLS
  ====================================================== */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        !lightbox ||
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


  /* =====================================================
     TOUCH SWIPE FOR MOBILE
  ====================================================== */

  let touchStartX = 0;
  let touchEndX = 0;


  if (lightbox) {

    lightbox.addEventListener(
      "touchstart",
      function (event) {

        touchStartX =
          event.changedTouches[0].screenX;

      },
      { passive: true }
    );


    lightbox.addEventListener(
      "touchend",
      function (event) {

        touchEndX =
          event.changedTouches[0].screenX;


        const difference =
          touchEndX - touchStartX;


        if (
          Math.abs(difference) < 50
        ) {

          return;

        }


        if (difference < 0) {

          nextImage();

        } else {

          previousImage();

        }

      },
      { passive: true }
    );

  }


});
