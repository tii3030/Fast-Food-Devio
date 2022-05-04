<?php

$server = new swoole_websocket_server("0.0.0.0", 8080);

$server->on('open', function($server, $req){
    // echo "connection open: {$req->fd}\n";
});

$server->on('message', function($server, $frame){

    $received_m = $frame->data;
    $origin = $frame->fd;
    $conexoes = $server->connections;

    foreach ($conexoes as $conexao) {

        $origin != $conexao && $server->push($conexao, ($received_m));

    }
});

$server->on('close', function($server, $fd){
    // echo "connection close: {$fd}\n";
});

$server->start();