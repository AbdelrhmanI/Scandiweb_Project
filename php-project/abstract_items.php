<?php
abstract class AbstractItem
{
    abstract protected function generateSize($user);

    abstract protected function insertItem($sku, $name, $price, $size);

    public function processInput($user)
    {
        $size = $this->generateSize($user);
        return $this->insertItem($user['sku'], $user['name'], $user['price'], $size);
    }
}

?>