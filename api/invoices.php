<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

require_once("dbConfig.php");

$response = ["status" => false, "message" => "", "data" => ""];

try {
    $invoiceQuery = "SELECT patients.patient_name,hospitals.hospital_name,invoices.invoice_date FROM invoices LEFT JOIN appointments ON invoices.appointment_id = appointments.id LEFT JOIN patients ON appointments.patient_id = patients.id LEFT JOIN doctors ON doctors.id = appointments.doctor_id LEFT JOIN hospitals ON doctors.hospital_id = hospitals.id;";
    $stmt = $pdo->prepare($invoiceQuery);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response['status'] = true;
    $response['message'] = "Data fetched successfully";
    $response['data'] = $result;
    echo json_encode($response);
    exit;

} catch (Exception $e) {
    $response['message'] = $e->getMessage();
    echo json_encode($response);
    exit;
}


?>