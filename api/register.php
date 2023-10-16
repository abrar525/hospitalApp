<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once('dbConfig.php');
$response = ["status" => false, "message" => ""];

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input["firstName"])) {
    $response["status"] = false;
    $response["message"] = "First name field is not included";
    echo json_encode($response);
    exit;
}

if (!isset($input["lastName"])) {
    $response["status"] = false;
    $response["message"] = "Last name Field is not included";
    echo json_encode($response);
    exit;
}

if (!isset($input["email"])) {
    $response["status"] = false;
    $response["message"] = "Email Field is not included";
    echo json_encode($response);
    exit;
}

if (!isset($input["password"])) {
    $response["status"] = false;
    $response["message"] = "Password field is not included";
    echo json_encode($response);
    exit;
}

try {
    $firstName = $input['firstName'];
    $lastName = $input['lastName'];
    $email = $input['email'];
    $password = $input['password'];
    $password = md5($password);
    $query = "SELECT id FROM users WHERE email = '$email' AND password = '$password'";
    $statement = $pdo->prepare($query);
    $res = $statement->fetch();
    if ($res && $res['id']) {
        $response["status"] = false;
        $response["message"] = $email . " already exists";
        echo json_encode($response);
        exit;
    }
    $insertQuery = "INSERT INTO users(first_name,last_name,email,password) VALUES(?,?,?,?);";

    $stmt = $pdo->prepare($insertQuery);
    $insertRes = $stmt->execute([$firstName, $lastName, $email, $password]);
    if ($insertRes) {
        $response["status"] = true;
        $response["message"] = "User Registered Successfully";
        echo json_encode($response);
        exit;
    }
} catch (Exception $e) {
    $response["status"] = false;
    $response["message"] = "user already registered..";
    echo json_encode($response);
    exit;
}

?>