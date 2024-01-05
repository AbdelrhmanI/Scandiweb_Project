<?php
include('core.php');

class Database {
    protected $db;

    public function __construct($dbhost, $dbuser, $dbpass, $dbName) {
        $this->db = mysqli_connect($dbhost, $dbuser, $dbpass, $dbName);
        if (!$this->db) {
            die("Database connection failed!");
        }
    }
     public function getConnection() {
        return $this->db;
    }
    public function closeConnection() {
        mysqli_close($this->db);
    }
}

?>
