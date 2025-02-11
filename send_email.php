<?php

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set("display_errors", 1);

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json'); // Ensure JSON response


//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $response = [];

    $text_name = trim($_POST['text-name']);
    $text_email = trim($_POST['text-email']);
    $text_subject = trim($_POST['text-subject']);
    $text_message = trim($_POST['text-message']);

    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'abdorizak264@gmail.com';                     //SMTP username
        $mail->Password   = 'vctilcoluqdsprau';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $mail->setFrom($text_email, $text_name);
        $mail->addAddress('abdorizak264@gmail.com', 'Abdirizak Hassan Osman');     //Add a recipient
        $mail->addReplyTo($text_email, $text_name);

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = $text_subject;
        $mail->Body    = nl2br(htmlspecialchars($text_message)); // Prevent XSS
        $mail->AltBody = strip_tags($text_message);

        ($mail->send()) 
        ? $response = ["success" => true, "message" => "Message has been sent successfully!"] 
        : $response = ["success" => false, "error" => "Mail could not be sent."];

    } catch (Exception $e) {
        $response = ["success" => false, "error" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"];
    }

    echo json_encode($response);
    exit();
}