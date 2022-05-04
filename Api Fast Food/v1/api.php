<?php

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    set_time_limit(600);

    // RECEIVE THE DATA AND CONVERTS IT IN OBJECTS
    $input = json_decode(file_get_contents('php://input'));
    isset($input->screen) ? $screen = $input->screen : $screen = "";
    isset($input->action) ? $action = $input->action : $action = "";
    isset($input->client_id) ? $client_id = $input->client_id : $client_id = "";
    isset($input->type_pay) ? $type_pay = $input->type_pay : $type_pay = "";
    isset($input->products) ? $products = $input->products : $products = [];

    require_once './Connection.class.php';
    require_once './querys.php';

    $connObj = new ConnectionMysql();
    $connObj->mysql();
    $conn = $connObj->getConn();

    // SET HEADER
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: GET, POST");


    $sqls = new Sqls();

    if($screen == "orders") {

        switch ($action) {
            case "all_prod":

                $result = $connObj->execute($sqls->getAll_prod());
                echo json_encode($result);

                break;

            case "all_payment_methods":

                $sql = "SELECT * FROM payment";
                $result = $connObj->execute($sqls->getAll_payment_methods());
                echo json_encode($result);

                break;

            case "all_smashs":
                
                $result = $connObj->execute($sqls->getAll_smashs());
                echo json_encode($result);

                break;

            case "all_drinks":
            
                $result = $connObj->execute($sqls->getAll_drinks());
                echo json_encode($result);

                break;

            case "all_combo":
        
                $result = $connObj->execute($sqls->getAll_combo());
                echo json_encode($result);

                break;

            case "all_accompaniment":

                $result = $connObj->execute($sqls->getAll_accompaniment());
                echo json_encode($result);

                break;
                
            case "all_dessert":

                $result = $connObj->execute($sqls->getAll_dessert());
                echo json_encode($result);

                break;

            case "all_additional":

                $result = $connObj->execute($sqls->getAll_additional());
                echo json_encode($result);

                break;
    
            case "create_order":

                // GET TOTAL PRICE
                $total_price = ($connObj->execute($sqls->getTotal_price($products))[0]["total_price"]);
                            
                //CREATE ORDER
                $stmt = $conn->prepare($sqls->getCreate_order($client_id, $type_pay, $total_price));
                $stmt->execute();

                if($stmt) {
                    // CREATE ORDER-PRODUCT
                    $sqls->createOP($conn->lastInsertId(), $products);
                    echo json_encode(['Order_Created' => 1]);
                    die();
                }

                break;

            case "my_orders":

                $result = $connObj->execute($sqls->getMyOrders($client_id));
                echo json_encode($result);

                break;
                
        }
    }

    else if($screen == "kitchen") {

        $result = $connObj->execute($sqls->finalize_order($client_id));
        echo json_encode(['Order_Finished' => 1]);
        die();

    }

    else if($screen == "pickUp") {
        $result = $connObj->execute($sqls->getOrdersAF());

        foreach($result as $value){
            $value["active"] != null && $active[] = $value["active"];
            $value["finished"] != null && $finished[] = $value["finished"];
        }
        
        $rst = array(
            'active' => $active,
            'finished' => $finished
        );
        
        echo json_encode($rst);
    }
?>