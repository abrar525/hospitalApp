<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once("dbConfig.php");

$response = ["status" => false, "message" => "", "data" => []];

try {
    $appointmentsQuery = "SELECT appointments.id,patients.patient_name,doctors.doctor_name,appointments.appointment_date,hospitals.hospital_name,hospitals.id AS hospital_id FROM appointments LEFT JOIN patients ON appointments.patient_id = patients.id LEFT JOIN doctors ON appointments.doctor_id = doctors.id LEFT JOIN hospitals ON doctors.hospital_id = hospitals.id;";
    $stmt = $pdo->prepare($appointmentsQuery);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response['status'] = true;
    $response['message'] = 'Data fetched successfully';
    $response['data'] = $result;
    echo json_encode($response);
    exit;
} catch (Exception $e) {
    $response['message'] = $e->getMessage();
    echo json_encode($response);
    exit;
}

?>