<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
  function showBookingForm() {
    document.getElementById('bookingForm').style.display = 'block';
  }

  document.getElementById("bookingDetails").addEventListener("submit", async function(e) {
    e.preventDefault();

    const response = await fetch('/create-order', { method: 'POST' });
    const data = await response.json();

    const options = {
      key: 'process.env.PAYMENT_ID',
      amount: data.amount,
      currency: 'INR',
      name: 'Wanderlust Booking',
      description: 'Hotel Booking Payment',
      order_id: data.orderId,
      handler: function (response) {
        alert('✅ Payment Successful! Booking Confirmed.');
      },
      prefill: {
        name: document.querySelector('[name="name"]').value,
        email: document.querySelector('[name="email"]').value,
      },
      theme: {
        color: "#ff385c"
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  });

