<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require  'src/Exception.php';
require  'src/PHPMailer.php';
require  'src/SMTP.php';

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions

$name = htmlspecialchars(trim($_POST['name']));
$email = htmlspecialchars(trim($_POST['email']));
$phone = htmlspecialchars(trim($_POST['phone']));
$subject = htmlspecialchars(trim($_POST['subject']));
$file = $_FILES['upload'];

try {
    //Server settings
    $mail->SMTPDebug = 2;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'silkits.dev@gmail.com';                 // SMTP username
    $mail->Password = '1q2w3e4r1q2w3e4r';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('silkits.dev@gmail.com');
    $mail->addAddress('Elena357910@yandex.com');

    $mail->addAttachment($_FILES['upload']['tmp_name'], $_FILES['upload']['name']);

    // for ($ct = 0; $ct < count($_FILES['upload']['tmp_name']); $ct++) {
    //     $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['upload']['name'][$ct]));
    //     $filename = $_FILES['upload']['name'][$ct];
    //     if (move_uploaded_file($_FILES['upload']['tmp_name'][$ct], $uploadfile)) {
    //         $mail->addAttachment($uploadfile, $filename);
    //     } else {
    //         $msg .= 'Failed to move file to ' . $uploadfile;
    //     }
    // }

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = $subject;
    $mail->Body    = '<b>Имя:</b> ' . $name . '<br> <b>Email:</b> ' . $email . '<br><b>Телефон:</b> ' .  $phone;
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

header('Location: thank-you.html');

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo 'Загрузите файл: ', $mail->ErrorInfo;
}
