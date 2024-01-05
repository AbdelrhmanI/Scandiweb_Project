<?php
include('item.php');

$item = new Item();
$json_array = $item->getItems();
echo json_encode($json_array);
?>
