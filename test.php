<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json'); // Set response type to JSON

// Check if request is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $text_name = $_POST['text-name'] ?? null;
    $text_email = $_POST['text-email'] ?? null;
    $text_subject = $_POST['text-subject'] ?? null;
    $text_message = $_POST['text-message'] ?? null;

    // Log the received data (for debugging)
    error_log("Received Data: Name=$text_name, Email=$text_email, Subject=$text_subject, Message=$text_message");

    // Return received data as JSON (for debugging)
    echo json_encode([
        "status" => "success",
        "message" => "Data received",
        "data" => $_POST
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method"
    ]);
}
?>
