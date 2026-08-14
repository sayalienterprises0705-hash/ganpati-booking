<!doctype html>
<html lang="en">

<head>

<meta charset="utf-8">

<meta name="viewport"
      content="width=device-width,initial-scale=1">

<meta name="description"
      content="Ganpati Bappa Murti Booking by S.B. Joshi Enterprises. Book your Ganpati Murti online and submit your booking request on WhatsApp.">

<title>Booking | S.B. Joshi Enterprises</title>

<link rel="stylesheet" href="css/style.css">

<script src="js/script.js" defer></script>

</head>


<body class="booking-page">


<!-- =====================================================
     HEADER
===================================================== -->

<header class="site-header">

<a class="brand" href="index.html">

<span class="brand-mark">ॐ</span>

<span>S.B. Joshi Enterprises</span>

</a>


<button
class="menu-toggle"
type="button"
aria-label="Open menu"
aria-expanded="false">

☰

</button>


<nav class="site-nav">

<a href="index.html">
Home
</a>

<a href="about.html">
About
</a>

<a href="gallery.html">
Gallery
</a>

<a href="price.html">
Pooja Articles
</a>

<a href="booking.html" class="active">
Booking
</a>

<a href="reviews.html">
Reviews
</a>

<a href="faq.html">
FAQ
</a>

<a href="contact.html">
Contact
</a>

</nav>

</header>


<!-- =====================================================
     MARQUEE
===================================================== -->

<div class="marquee">

🙏 गणपती बाप्पा मोरया! •

Ganpati Murti Booking Open •

S.B. Joshi Enterprises •

Booking & Enquiries: 8856874068 •

🙏 शुभ मंगलमूर्ती 🙏

</div>


<main>


<!-- =====================================================
     BOOKING HERO
===================================================== -->

<section class="pooja-hero booking-hero">

<div class="pooja-hero-overlay">

<p class="eyebrow">
Ganpati Bappa • Booking 2026
</p>

<h1>
🙏 Book Your Ganpati Murti
</h1>

<p>
आपल्या आवडत्या गणपती बाप्पाची मूर्ती
आत्ताच बुक करा.
</p>

<div class="hero-actions">

<a
class="btn"
href="#bookingFormSection">

Book Now

</a>

<a
class="btn light"
href="gallery.html">

View Gallery

</a>

</div>

</div>

</section>


<!-- =====================================================
     INTRODUCTION
===================================================== -->

<section class="section section-heading">

<p class="eyebrow">
Ganpati Murti Booking
</p>

<h2>
Reserve Your Bappa With Us
</h2>

<p>

Select your Murti details, enter your contact
information and submit your booking request.

</p>

<div class="clay-badge">

🙏 भक्ती • परंपरा • विश्वास • गणपती बाप्पा मोरया 🙏

</div>

</section>


<!-- =====================================================
     BOOKING SECTION
===================================================== -->

<section
class="section booking"
id="bookingFormSection">


<!-- =====================================================
     BOOKING FORM
===================================================== -->

<form
id="bookingForm"
class="card">


<div class="section-heading form-heading">

<p class="eyebrow">
Ganpati Murti Booking Form
</p>

<h2>
Book Your Ganpati Murti
</h2>

<p>

Please enter correct details.
Your booking request will be sent to
S.B. Joshi Enterprises on WhatsApp.

</p>

</div>


<!-- CUSTOMER NAME -->

<label>

Customer Name *

<input
id="customerName"
name="customerName"
type="text"
autocomplete="name"
placeholder="Enter your full name"
required>

</label>


<!-- MOBILE -->

<label>

Contact Number *

<input
id="mobile"
name="mobile"
type="tel"
inputmode="numeric"
maxlength="10"
pattern="[6-9][0-9]{9}"
autocomplete="tel"
placeholder="10 digit mobile number"
required>

</label>


<!-- EMAIL -->

<label>

Email Address

<input
id="email"
name="email"
type="email"
autocomplete="email"
placeholder="Enter your email address">

</label>


<!-- MURTI -->

<label>

Murti Type *

<select
id="murtiType"
name="murtiType"
required>

<option value="">
Select Murti Type
</option>

<option value="Eco Ganpati">
Eco Ganpati
</option>

<option value="Shadu Mati Ganpati">
Shadu Mati Ganpati
</option>

<option value="Traditional Ganpati">
Traditional Ganpati
</option>

</select>

</label>


<!-- SIZE -->

<label>

Murti Size *

<select
id="murtiSize"
name="murtiSize"
required>

<option value="">
Select Size
</option>

<option value="10 Inch">
10 Inch
</option>

<option value="12 Inch">
12 Inch
</option>

<option value="15 Inch">
15 Inch
</option>

<option value="18 Inch">
18 Inch
</option>

<option value="21 Inch">
21 Inch
</option>

<option value="24 Inch">
24 Inch
</option>

</select>

</label>


<!-- PRICE -->

<label>

Price

<input
id="price"
name="price"
type="text"
placeholder="Price will be confirmed manually">

</label>


<!-- QUANTITY -->

<label>

Quantity *

<input
id="quantity"
name="quantity"
type="number"
min="1"
value="1"
required>

</label>


<!-- PAYMENT -->

<label>

Payment Option *

<select
id="paymentMode"
name="paymentMode"
required>

<option value="">
Select Payment Option
</option>

<option value="Online Payment">
Online Payment
</option>

</select>

</label>


<!-- ADVANCE -->

<label>

Advance Amount *

<input
id="advance"
name="advance"
type="number"
min="1"
placeholder="Enter advance amount"
required>

</label>


<!-- DELIVERY -->

<label>

Delivery / Collection *

<select
id="delivery"
name="delivery"
required>

<option value="">
Select Delivery / Collection
</option>

<option value="Shop Pickup — Free">
Shop Pickup — Free
</option>

<option value="Home Delivery — Chargeable">
Home Delivery — Chargeable
</option>

</select>

</label>


<!-- DATE -->

<label>

Required Date *

<input
id="bookingDate"
name="bookingDate"
type="date"
required>

</label>


<!-- ADDRESS -->

<label>

Address *

<textarea
id="address"
name="address"
rows="4"
placeholder="Enter your complete address"
required></textarea>

</label>


<!-- NOTE -->

<label>

Special Note

<textarea
id="note"
name="note"
rows="4"
placeholder="Any special requirement"></textarea>

</label>


<!-- =====================================================
     FINAL IDOL PHOTO
===================================================== -->

<label>

Upload Your Final Idol Photo *

<input
id="finalPhoto"
name="finalPhoto"
type="file"
accept="image/*"
required>

</label>


<div class="booking-warning">

<strong>
📷 Upload Your Final Idol Photo
</strong>

<br><br>

The selected photo is for sending to
S.B. Joshi Enterprises only.

It will not be displayed publicly on the website
or sent back to the customer.

<br><br>

On supported phones, WhatsApp's share screen
may allow you to send the photo together with
your booking message.

</div>


<!-- =====================================================
     DELIVERY INFORMATION
===================================================== -->

<div class="booking-warning">

<strong>
🚚 Delivery Information
</strong>

<br><br>

🏪 <b>Shop Pickup — Free:</b>

You may collect your Ganpati Bappa Idol
directly from our shop at no additional charge.

<br><br>

🚚 <b>Home Delivery — Chargeable:</b>

Home delivery is available on request and will
attract additional charges based on the delivery
location and idol size.

<br><br>

Delivery charges will be communicated and confirmed
before final booking confirmation.

</div>


<!-- =====================================================
     PAYMENT INFORMATION
===================================================== -->

<div class="booking-warning">

<strong>
💳 Online Payment Information
</strong>

<br><br>

Payment option:

<b>
Online Payment
</b>

<br><br>

The amount paid at the time of booking will be
treated as an <b>advance payment</b>.

<br><br>

Please make payment only after your booking details
and final amount are confirmed by
S.B. Joshi Enterprises.

<br><br>

Payment status will be verified manually.

</div>


<!-- =====================================================
     IMPORTANT BOOKING INFORMATION
===================================================== -->

<div class="booking-warning">

<strong>
🙏 Important Booking Information
</strong>

<br><br>

Thank you for choosing
<b>S.B. Joshi Enterprises.</b>

<br><br>

The amount paid at the time of booking will be
treated as an <b>advance payment</b>, and your
Ganpati Bappa Idol booking will therefore be
considered <b>partially confirmed</b> at this stage.

<br><br>

Your booking will receive <b>final confirmation
only after the complete payment has been received.</b>

Kindly pay the remaining balance and share the
payment confirmation with us to complete your booking.

<br><br>

Thank you for your understanding and cooperation.
We look forward to celebrating Ganpati with you. 🙏

</div>


<!-- =====================================================
     IMAGE & COLOUR DISCLAIMER
===================================================== -->

<div class="booking-warning">

<strong>
🖼️ Image & Colour Disclaimer
</strong>

<br><br>

Please note that the colours, shades, decorations,
and overall appearance of the Ganpati Bappa Idol
shown in the images may vary slightly from the
actual idol.

<br><br>

Such variations may occur due to device screen
settings, browser rendering, photography and
lighting conditions, and display quality.

<br><br>

The images are provided for
<b>reference purposes only.</b>

<br><br>

Thank you for your understanding. 🙏

</div>


<!-- =====================================================
     SHADU MATI INFORMATION
===================================================== -->

<div class="booking-warning">

<strong>
🌿 Shadu Mati Information
</strong>

<br><br>

All Ganpati Bappa Idols offered by
<b>S.B. Joshi Enterprises</b> are crafted exclusively
using <b>Shadu Mati (natural clay)</b>, keeping
traditional craftsmanship and care for nature
in mind.

<br><br>

🙏 गणपती बाप्पा मोरया 🙏

</div>


<!-- =====================================================
     WHATSAPP SUBMISSION INFORMATION
===================================================== -->

<div class="booking-warning">

<strong>
📲 WhatsApp Booking Submission
</strong>

<br><br>

After clicking the submit button, WhatsApp will
open with your booking details.

<br><br>

Please press <b>Send</b> on WhatsApp to submit
your booking request.

<br><br>

Your booking request will be sent to:

<b>
8856874068
</b>

<br><br>

Your booking is not finally confirmed immediately.
Final confirmation will be provided manually by
S.B. Joshi Enterprises.

</div>


<!-- =====================================================
     SUBMIT
===================================================== -->

<button
class="btn"
type="submit">

Submit Booking on WhatsApp

</button>


<p
id="msg"
class="small"
aria-live="polite">
</p>


</form>


<!-- =====================================================
     PAYMENT CARD
===================================================== -->

<aside class="card pooja-payment">


<h2>
💳 Online Payment
</h2>


<img
src="images/payment-qr.png"
alt="Online payment UPI QR code"
class="qr">


<p>

<b>
UPI ID:
</b>

<br>

8856874068@okbizaxis

</p>


<p class="small">

Online Payment / UPI

</p>


<div class="payment-note">

🙏 Please confirm your booking amount
before making payment.

</div>


<p class="small">

After payment, keep your transaction
screenshot ready for verification.

</p>


<a
class="btn"
href="https://wa.me/91885687068"
target="_blank"
rel="noopener">

Send Payment Screenshot on WhatsApp

</a>


</aside>


</section>


<!-- =====================================================
     BOOKING PROCESS
===================================================== -->

<section class="section">

<div class="section-heading">

<p class="eyebrow">
Simple Booking Process
</p>

<h2>
How Booking Works
</h2>

</div>


<div class="slogan-grid">


<article class="slogan-card">

<span>
📝
</span>

<h3>
1. Fill the Form
</h3>

<p>

Enter your name, mobile number,
Murti details and booking information.

</p>

</article>


<article class="slogan-card">

<span>
📲
</span>

<h3>
2. Submit on WhatsApp
</h3>

<p>

WhatsApp will open with your booking
details. Press Send to submit.

</p>

</article>


<article class="slogan-card">

<span>
🙏
</span>

<h3>
3. Manual Confirmation
</h3>

<p>

S.B. Joshi Enterprises will check
availability and confirm your booking.

</p>

</article>


</div>

</section>


<!-- =====================================================
     CONTACT CTA
===================================================== -->

<section class="section section-heading">

<p class="eyebrow">
Need Help?
</p>

<h2>
Contact S.B. Joshi Enterprises
</h2>

<p>

For Murti availability, price, delivery
or booking questions, contact us directly.

</p>


<div class="hero-actions">

<a
class="btn"
href="tel:+91885687068">

📞 Call 8856874068

</a>


<a
class="btn light"
href="https://wa.me/91885687068"
target="_blank"
rel="noopener">

💬 WhatsApp Us

</a>

</div>

</section>


</main>


<!-- =====================================================
     FOOTER
===================================================== -->

<footer class="site-footer">


<div>

<h3>
S.B. Joshi Enterprises
</h3>

<p>

1237 Matruchaya Apartment,
Krantivir Vasudev Balvant Phadke Road,
Opp. Khunya Murlidhar Mandir,
Sadashiv Peth, Pune 411030

</p>

</div>


<div>

<p>

📞

<a href="tel:+91885687068">
8856874068
</a>

</p>


<p>

✉️

<a href="mailto:sayalij.joshi7@gmail.com">
sayalij.joshi7@gmail.com
</a>

</p>

</div>


<div>

<p>

<a href="terms.html">
Terms
</a>

·

<a href="privacy.html">
Privacy
</a>

</p>

</div>


<p class="copyright">

© 2026 S.B. Joshi Enterprises ·
Ganpati Bappa Morya 🙏

</p>


</footer>


<!-- =====================================================
     BACK TO TOP
===================================================== -->

<button
class="top-btn"
type="button"
aria-label="Back to top">

↑

</button>


<!-- =====================================================
     WHATSAPP FLOATING BUTTON
===================================================== -->

<a
class="wa"
href="https://wa.me/91885687068"
target="_blank"
rel="noopener"
aria-label="Contact S.B. Joshi Enterprises on WhatsApp">

◉

</a>


</body>

</html>
