
document.addEventListener("DOMContentLoaded",()=>{
  const toggle=document.querySelector(".menu-toggle"), nav=document.querySelector(".site-nav");
  if(toggle&&nav){toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",open)})}
  const top=document.querySelector(".top-btn"); if(top) top.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

  const prices={
    "Eco Ganpati":{"10":"Contact for Price","12":"Contact for Price","15":"Contact for Price"},
    "Traditional Ganpati":{"10":"Contact for Price","12":"Contact for Price","15":"Contact for Price"},
    "Premium Ganpati":{"10":"Contact for Price","12":"Contact for Price","15":"Contact for Price"}
  };
  const form=document.getElementById("bookingForm");
  if(form){
    const $=id=>document.getElementById(id);
    const id="SBJ-"+Date.now().toString().slice(-8);
    $("bookingId").value=id; $("summaryId").textContent=id;
    function update(){
      const name=$("customerName").value.trim(), murti=$("murti").value, size=$("size").value, qty=$("quantity").value||1;
      $("summaryName").textContent=name||"—"; $("summaryMurti").textContent=murti||"—"; $("summarySize").textContent=size?size+" Inch":"—";
      $("summaryQty").textContent=qty; $("summaryPayment").textContent=$("paymentMode").value;
      $("price").value=(murti&&size&&prices[murti]&&prices[murti][size])||"";
      $("summaryPrice").textContent=$("price").value||"—";
    }
    ["customerName","murti","size","quantity","paymentMode"].forEach(x=>$(x).addEventListener("input",update));
    form.addEventListener("submit",e=>{
      e.preventDefault();
      if(!form.checkValidity()){form.reportValidity();return}
      const v=id=>$(id).value.trim();
      const message =
`🙏 NEW GANPATI BOOKING
Booking ID: ${v("bookingId")}
Name: ${v("customerName")}
Mobile: ${v("mobile")}
Email: ${v("email")||"Not provided"}
Murti: ${v("murti")}
Size: ${v("size")} Inch
Price: ${v("price")||"To be confirmed"}
Quantity: ${v("quantity")}
Payment: ${v("paymentMode")}
Advance: ₹${v("advance")||"0"}
Delivery: ${v("delivery")}
Date: ${v("date")}
Address: ${v("address")}
Note: ${v("note")||"None"}

Status: Payment/Booking Pending
S.B. Joshi Enterprises
Sadashiv Peth, Pune
Customer can send payment screenshot separately on WhatsApp if required.`;
      const url="https://wa.me/918856874068?text="+encodeURIComponent(message);
      $("formMessage").textContent="Booking details prepared. WhatsApp will open now.";
      window.open(url,"_blank");
    });
    update();
  }

  const cf=document.getElementById("contactForm");
  if(cf) cf.addEventListener("submit",e=>{
    e.preventDefault();
    if(!cf.checkValidity()){cf.reportValidity();return}
    const name=document.getElementById("contactName").value.trim();
    const mobile=document.getElementById("contactMobile").value.trim();
    const msg=document.getElementById("contactMessage").value.trim();
    const text=`Hello S.B. Joshi Enterprises,%0AName: ${encodeURIComponent(name)}%0AMobile: ${encodeURIComponent(mobile)}%0AMessage: ${encodeURIComponent(msg)}`;
    document.getElementById("contactMessageStatus").textContent="Opening WhatsApp…";
    window.open("https://wa.me/918856874068?text="+text,"_blank");
  });
});
