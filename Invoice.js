// Include jsPDF library
const { jsPDF } = window.jspdf;

// ✅ Sample cart data (Replace with actual session data)
const cart = [
    { name: "Product 1", price: 150.00, quantity: 2 },
    { name: "Product 2", price: 250.00, quantity: 1 }
];

if (!cart || cart.length === 0) {
    alert("Error: No items in the cart!");
    throw new Error("No items in the cart!");
}

// ✅ Invoice details
const cashierId = Math.floor(1000 + Math.random() * 9000);
const date = new Date().toLocaleString();
const storeName = "MARKETCORP";
const storeAddress = "123 Main Street, Qaïs";
const storePhone = "+213 555 123 456";
const storeLogo = "logo.png"; // Ensure the image is accessible

// ✅ Initialize jsPDF
const pdf = new jsPDF();
pdf.setFont("helvetica", "bold");
pdf.setTextColor(50, 50, 50);

// ✅ Add store logo (if available)
const img = new Image();
img.src = storeLogo;
img.onload = function () {
    pdf.addImage(img, "PNG", 10, 10, 40, 40);
    generateInvoice();
};
img.onerror = function () {
    generateInvoice();
};

// ✅ Generate the invoice
function generateInvoice() {
    pdf.setFontSize(20);
    pdf.text(storeName, 105, 20, { align: "center" });
    pdf.setFontSize(12);
    pdf.text(storeAddress, 105, 30, { align: "center" });
    pdf.text(`Phone: ${storePhone}`, 105, 38, { align: "center" });

    // ✅ Invoice title
    pdf.setFontSize(18);
    pdf.setFillColor(200, 220, 255);
    pdf.rect(10, 50, 190, 10, "F");
    pdf.setTextColor(0);
    pdf.text("Invoice", 105, 57, { align: "center" });

    // ✅ Invoice details
    pdf.setFontSize(14);
    pdf.text(`Date: ${date}`, 10, 70);
    pdf.text(`Cashier ID: ${cashierId}`, 150, 70);

    // ✅ Product Table Header
    pdf.setFontSize(14);
    pdf.setFillColor(100, 149, 237);
    pdf.setTextColor(255, 255, 255);
    pdf.rect(10, 80, 100, 10, "F");
    pdf.rect(110, 80, 40, 10, "F");
    pdf.rect(150, 80, 50, 10, "F");
    pdf.text("Product Name", 20, 87);
    pdf.text("Price (DA)", 120, 87);
    pdf.text("Quantity", 170, 87);

    let yPos = 95;
    let totalPrice = 0;
    pdf.setTextColor(0);

    cart.forEach((item) => {
        pdf.text(item.name, 20, yPos);
        pdf.text(item.price.toFixed(2) + " DA", 120, yPos);
        pdf.text(item.quantity.toString(), 170, yPos);
        totalPrice += item.price * item.quantity;
        yPos += 10;
    });

    // ✅ Total Amount
    pdf.setFillColor(255, 215, 0);
    pdf.rect(10, yPos, 140, 10, "F");
    pdf.rect(150, yPos, 50, 10, "F");
    pdf.setTextColor(0);
    pdf.text("Total", 80, yPos + 7);
    pdf.text(totalPrice.toFixed(2) + " DA", 170, yPos + 7);

    // ✅ Show PDF
    pdf.output("dataurlnewwindow");
}


