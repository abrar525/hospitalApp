<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once("dbConfig.php");


$response = ['status' => false, 'message' => '', 'data' => []];

if (!isset($_GET["hospitalId"])) {
    $response['message'] = "hospital_id is a required field";
    echo json_encode($response);
    exit;
}

try {

    $hospitalId = $_GET['hospitalId'];

    $getDoctorsQuery = "SELECT doctors.doctor_name FROM doctors WHERE hospital_id = ?";
    $stmt = $pdo->prepare($getDoctorsQuery);
    $stmt->execute([$hospitalId]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response['status'] = true;
    $response['message'] = "data fetched successfully";
    $response['data'] = $result;
    echo json_encode($response);
    exit;

} catch (Exception $e) {
    $response['message'] = $e->getMessage();
    echo json_encode($response);
    exit;
}


?>