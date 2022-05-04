<?php 

class ConnectionMysql {

    private $servername = "10.0.0.180";
    private $username = "tiagopereira";
    private $password = "Hi_GtILvhlQ0";
    // $dbname = "ebi";

    private $conn;

    public function mysql() {
        try {

            $conn = new PDO("mysql:host=$this->servername;dbname=ebi", $this->username, $this->password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $this->conn = $conn;

        } catch(PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    // GETTER METHOD
    public function getConn() {
        return $this->conn;
    }

    public function execute($sql) {

        try {
           $select = $this->conn->query($sql);
           $result = $select->fetchAll(PDO::FETCH_ASSOC);

           return $result;

        } catch (PDOException $err) {
           //ReportErro("ERRO PDO -> ".$err->getMessage()." SQL -> ".$sql."\n");
           exit;
        }
    }
}

?>