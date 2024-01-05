<?php
include('item.php');
//include('database.php');

$method = $_SERVER['REQUEST_METHOD'];
$user = file_get_contents('php://input');
$item = new Item();

switch ($method) {
    case "POST":
        $user = json_decode(file_get_contents('php://input'), true);
        $response = $item->insertItem($user);
        break;
}
// Close the database connection
$dbConnection->closeConnection();

// Output JSON response
echo json_encode($response);
?>
