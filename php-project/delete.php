<?php
include('item.php');

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents('php://input'));
$item = new Item();
$response = null;
switch ($method) {
    case 'POST':
        $itemSkus = $data->itemSkus;
        $response = $item->deleteItems($itemSkus);
        break;
}

// Output JSON response
echo json_encode($response);
?>
