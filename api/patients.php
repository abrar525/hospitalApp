<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once("dbConfig.php");

$response = ["status" => false, "message" => "", "data" => []];

try {

    $patientsQuery = "SELECT * FROM patients";
    $stmt = $pdo->prepare($patientsQuery);
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