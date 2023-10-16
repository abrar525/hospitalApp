<?php
error_reporting(E_ALL);
ini_set("display_errors", "1");

include 'dbConfig.php';

$response = ["status" => false, "message" => "", "user_name" => "", "data" => []];

try {
    $query = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';";
    $stmt = $pdo->query($query);
    $tableNames = $stmt->fetchAll(PDO::FETCH_COLUMN);

    $response["status"] = true;
    $response["message"] = "Successful!";
    $response["data"] = $tableNames;

    if (isset($_GET['userToken'])) {
        $token = $_GET['userToken'];
        $userQuery = "SELECT first_name,last_name FROM users WHERE token = ?";
        $stmt = $pdo->prepare($userQuery);
        $stmt->execute([$token]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            $response["user_name"] = $result['first_name'] . ' ' . $result["last_name"];
        } else {
            $response["status"] = false;
            $response["message"] = "User not found.";
        }
    }

} catch (Exception $e) {
    $response["message"] = $e->getMessage();
}

echo json_encode($response);
?>