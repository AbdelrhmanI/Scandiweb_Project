<?php
require_once('database_class.php');
require_once('abstract_items.php');

class DVDItem extends AbstractItem
{
    protected function generateSize($user)
    {
        return "Size: " . $user['size'] . "MB";
    }

    protected function insertItem($sku, $name, $price, $size)
    {
        // DVDItem Insertion in Database 
        $db = new Database("localhost", "root", "", "project");
        $sql = "INSERT INTO items (sku, name, price, size) VALUES (?, ?, ?, ?)";
        $stmt = mysqli_prepare($db->getConnection(), $sql);

        if (!$stmt) {
            $response = 'Failed to prepare statement';
        } else {
            mysqli_stmt_bind_param($stmt, "ssis", $sku, $name, $price, $size);

            if(mysqli_stmt_execute($stmt)) {
                $response = 'Inserted Successfully';
            } else {
                $response = 'Failed to create Record';
            }
            mysqli_stmt_close($stmt);
        }

        return $response;
    }
}

class BookItem extends AbstractItem
{
    protected function generateSize($user)
    {
        return "Weight: " . $user['weight'] . "KG";
    }

    protected function insertItem($sku, $name, $price, $size)
    {
        // BookItem Insertion In Database
        $db = new Database("localhost", "root", "", "project");
        $sql = "INSERT INTO items (sku, name, price, size) VALUES (?, ?, ?, ?)";
        $stmt = mysqli_prepare($db->getConnection(), $sql);

        if (!$stmt) {
            $response = 'Failed to prepare statement';
        } else {
            mysqli_stmt_bind_param($stmt, "ssis", $sku, $name, $price, $size);

            if(mysqli_stmt_execute($stmt)) {
                $response = 'Inserted Successfully';
            } else {
                $response = 'Failed to create Record';
            }
            mysqli_stmt_close($stmt);
        }
        return $response;
    }
}

class FurnitureItem extends AbstractItem
{
    protected function generateSize($user)
    {
        return "Dimension: " . $user['height'] . "x" . $user['width'] . "x" . $user['length'];
    }

    protected function insertItem($sku, $name, $price, $size)
    {
        // FurnitureItem Insertion In Database
        $db = new Database("localhost", "root", "", "project");
        $sql = "INSERT INTO items (sku, name, price, size) VALUES (?, ?, ?, ?)";
        $stmt = mysqli_prepare($db->getConnection(), $sql);

        if (!$stmt) {
            $response = 'Failed to prepare statement';
        } else {
            mysqli_stmt_bind_param($stmt, "ssis", $sku, $name, $price, $size);

            if(mysqli_stmt_execute($stmt)) {
                $response = 'Inserted Successfully';
            } else {
                $response = 'Failed to create Record';
            }
            mysqli_stmt_close($stmt);
        }
        return $response;
    }
}

class Item extends Database
{
    protected $db;
    public function __construct()
    {
        parent::__construct("localhost", "root", "", "project");
        $this->db = $this->getConnection();
    }

    public function insertItem($user)
    {
        $productType = $user['productType'];
        $className = ucfirst($productType) . 'Item';
        //Makeing an Object ('dvd','book','furniture') according to the selected productType to avoid using conditional statement & Switches as required
        if (class_exists($className)) {
            $item = new $className($this->db); 
            return $item->processInput($user);
        }else {
            return "Invalid productType";
        }
    }

    //Deleting Checked Items from Database
    public function deleteItems($itemSkus)
    {
        $itemSkus = array_map(function ($sku) {
            return "'" . mysqli_real_escape_string($this->db, $sku) . "'";
        }, $itemSkus);

        $placeholders = implode(',', $itemSkus);
        $sql = "DELETE FROM items WHERE sku IN ($placeholders)";
        $stmt = mysqli_prepare($this->db, $sql);

        if ($stmt && mysqli_stmt_execute($stmt)) {
            $response = ['Items deleted successfully'];
        } else {
            $response = ['Failed to delete items'];
        }
        return $response;
    }

    //Fetching Data from Database
    public function getItems()
    {
        $sql = "SELECT * FROM items ORDER BY sku ASC";
        $result = mysqli_query($this->db, $sql);
        $json_array = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $json_array[] = $row;
        }
        return $json_array;
    }
}

?>
