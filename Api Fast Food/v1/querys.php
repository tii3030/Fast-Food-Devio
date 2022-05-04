<?php

require_once './Connection.class.php';

class Sqls {

    // ALL THE PRODUCTS
    private $all_prod = "SELECT * FROM product WHERE isActive = true";

    // ALL PAYMENT METHODS
    private $all_payment_methods = "SELECT * FROM payment";

    // ALL THE SMASHES
    private $all_smashs = "SELECT * FROM product WHERE typePrd = 1";

    //ALL THE DRINKS
    private $all_drinks = "
        SELECT *
            FROM product A
            LEFT JOIN productType B
            ON A.typePrd = B.id WHERE B.typePrd = 'Bebida'";

    // ALL THE COMBOS
    private $all_combo = "
        SELECT *
            FROM product A
            LEFT JOIN productType B
            ON A.typePrd = B.id WHERE B.typePrd = 'Combo'";

    // ALL THE ACCOMPANIMENT
    private $all_accompaniment = "
        SELECT *
            FROM product A
            LEFT JOIN productType B
            ON A.typePrd = B.id WHERE B.typePrd = 'Acompanhamento'";

    // ALL DESSERT
    private $all_dessert = "
        SELECT *
            FROM product A
            LEFT JOIN productType B
            ON A.typePrd = B.id WHERE B.typePrd = 'sobremesa'";

    // ALL ADDITIONAL
    private $all_additional = "SELECT * FROM additional WHERE isActive = true";

    // SMASH ADDITIONAL
    private $smash_additional = "SELECT * FROM additional WHERE isActive = true AND forTypePrd = 1";

    // ACTIVE AND FINALIZED ORDERS
    private $ordersAF = "
        SELECT 
            (case when isFinished = false  then nameCli else null end) as 'active',
            (case when isFinished = true then nameCli else null end) as 'finished'
        FROM clients A
        LEFT JOIN orders B
            ON A.id = B.clients";


    // --- SETTERS METHODS
    
    public function getAll_prod() {
        return $this->all_prod;
    }

    public function getAll_payment_methods() {
        return $this->all_payment_methods;
    }

    public function getAll_smashs() {
        return $this->all_smashs;
    }

    public function getAll_drinks() {
        return $this->all_drinks;
    }

    public function getAll_combo() {
        return $this->all_combo;
    }

    public function getAll_accompaniment() {
        return $this->all_accompaniment;
    }

    public function getAll_dessert() {
        return $this->all_dessert;
    }

    public function getAll_additional() {
        return $this->all_additional;
    }

    public function getOrdersAF() {
        return $this->ordersAF;
    }

    // CALC AND GET TOTAL PRICE
    public function getTotal_price($products) {

        $total_price = "
            SELECT SUM(price) AS 'total_price' FROM product 
                WHERE id IN ( " . implode(",", filter_var_array($products, FILTER_SANITIZE_NUMBER_INT, FILTER_REQUIRE_ARRAY)) . " )";

        return $total_price;
    }

    // CREATE ORDER
    public function getCreate_order($client_id, $type_pay, $total_price) {

        $create_order = "INSERT INTO orders (clients, typePay, totalPrice, orderDate, isFinished) VALUES ($client_id, $type_pay, $total_price, NOW(), false)";

        return $create_order;
    }

    // METHOD CREATE CONNECTION DATA BASE
    public function createConn() {
        $connObj = new ConnectionMysql();
        $connObj->mysql();
        $conn = $connObj->getConn();

        return $conn;
    }

    // CREATE ORDER - PRODUCT
    public function createOP($client_id, $products) {

        for($i = 0; $i < count($products); $i++) {
            
            try {
                $sql = "INSERT INTO ordersProduct (orderCli, product) VALUES ($client_id, $products[$i])";
            
                $conn = $this->createConn();
                $stmt = $conn->prepare($sql);
                $stmt->execute();
            } catch (PDOException $e){
                return 0;
            }

        }

        return 1;
    }

    // GET MY ORDERS ACTIVE
    public function getMyOrders($client_id) {

        $my_orders = "
            SELECT typePrd, title, descr, img, price, orderCli, isFinished
            FROM
                product A
            RIGHT JOIN ordersProduct B
                ON B.product = A.id   
            LEFT JOIN orders C
                ON C.id = B.orderCli WHERE isFinished = false AND clients = $client_id";
    
        return $my_orders;

    }

    // CHANGE THE ORDER TO FINALIZED
    public function finalize_order($client_id) {

        $finalize_order = "
            UPDATE orders
            SET isFinished = true
            WHERE clients = $client_id";
        
        return $finalize_order;
    }
}

?>