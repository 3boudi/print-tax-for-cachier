<?php
session_start();
require('fpdf186/fpdf.php');

if (!isset($_SESSION['cart']) || empty($_SESSION['cart'])) {
    die("Error: No items in the cart!");
}

$cashier_id = rand(1000, 9999);
$date = date('Y-m-d H:i:s');
$store_name = "MARKETCORP"; 
$store_logo = "logo.png"; 
$store_address = "123 Main Street, Qaïs";
$store_phone = "+213 555 123 456";

$pdf = new FPDF('P', 'mm', 'A4');
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 20);
$pdf->SetTextColor(50, 50, 50);

if (file_exists($store_logo)) {
    $pdf->Image($store_logo, 10, 10, 40);
}

$pdf->Cell(190, 15, $store_name, 0, 1, 'C');
$pdf->SetFont('Arial', '', 12);
$pdf->Cell(190, 8, $store_address, 0, 1, 'C');
$pdf->Cell(190, 8, "Phone: $store_phone", 0, 1, 'C');
$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 18);
$pdf->SetFillColor(200, 220, 255);
$pdf->Cell(190, 12, 'Invoice', 0, 1, 'C', true);
$pdf->SetFont('Arial', '', 14);
$pdf->Cell(95, 8, "Date: $date", 0, 0, 'L');
$pdf->Cell(95, 8, "Cashier ID: $cashier_id", 0, 1, 'R');
$pdf->Ln(5);

$pdf->SetFont('Arial', 'B', 14);
$pdf->SetFillColor(100, 149, 237);
$pdf->SetTextColor(255, 255, 255);
$pdf->Cell(100, 12, 'Product Name', 1, 0, 'C', true);
$pdf->Cell(40, 12, 'Price (DA)', 1, 0, 'C', true);
$pdf->Cell(50, 12, 'Quantity', 1, 1, 'C', true);

$pdf->SetFont('Arial', '', 14);
$pdf->SetTextColor(0, 0, 0);
$total_price = 0;

foreach ($_SESSION['cart'] as $item) {
    $pdf->Cell(100, 12, $item['name'], 1, 0, 'C');
    $pdf->Cell(40, 12, number_format($item['price'], 2), 1, 0, 'C');
    $pdf->Cell(50, 12, $item['quantity'], 1, 1, 'C');
    $total_price += $item['price'] * $item['quantity'];
}

$pdf->SetFont('Arial', 'B', 14);
$pdf->SetFillColor(255, 215, 0);
$pdf->Cell(140, 12, 'Total', 1, 0, 'C', true);
$pdf->Cell(50, 12, number_format($total_price, 2) . ' DA', 1, 1, 'C', true);

$pdf->Output();

exit;
?>
