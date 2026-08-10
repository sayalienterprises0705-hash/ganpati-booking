# S.B. Joshi Enterprises — Ganpati Booking Website

A static Ganpati Murti booking website built with HTML, CSS and JavaScript.

## No database / no admin panel

This version does not store bookings online. A completed booking opens WhatsApp with a pre-filled booking request.

## WhatsApp number

The booking destination is **+91 8856874068**.

## Important

A GitHub Pages static website cannot attach a selected payment screenshot to a WhatsApp `wa.me` link. The screenshot field is therefore only a local file picker. If you need it, send the screenshot separately in WhatsApp.

## Folder structure

```text
ganpati-booking/
├── index.html
├── about.html
├── gallery.html
├── price.html
├── booking.html
├── reviews.html
├── faq.html
├── contact.html
├── thankyou.html
├── terms.html
├── privacy.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
└── images/
    └── payment-qr.png   # optional; replace placeholder if desired
```

## Deploy to GitHub Pages

1. Create a GitHub repository.
2. Upload all files and folders, preserving the structure above.
3. Open repository **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your main branch and `/ (root)`.
6. Save and wait for GitHub Pages to publish.
7. Open the Pages URL shown by GitHub.

## Customizing prices

Edit the `prices` object near the top of `js/script.js`:

```js
const prices = {
  "Eco Ganpati": {"10":1800,"12":2500,"15":4000},
  "Traditional Ganpati": {"10":2500,"12":3500,"15":5000},
  "Premium Ganpati": {"10":4000,"12":6000,"15":9000}
};
```

## Customizing business details

The WhatsApp destination is in `js/script.js`:

```js
const OWNER_WHATSAPP = "918856874068";
```

The displayed phone, email and address are in the HTML files.

## Images

The project deliberately uses emoji-based placeholders so the site works immediately without copyrighted stock images. You can add your own `logo.png`, banners and Ganpati photos to the `images/` folder and reference them from your HTML.

## License

Prepared for S.B. Joshi Enterprises.
