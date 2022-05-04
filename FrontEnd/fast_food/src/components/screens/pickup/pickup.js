import React, { useState, useEffect } from "react";
import api from "../../service/axios";

function Pickup() {

    const [data, setData] = useState([]);

    useEffect(() => {

        let connection = new WebSocket('ws://10.0.0.180:8080');

        getOrders();

        connection.onmessage = (message) => {
            setData(JSON.parse(message.data));
        };
        
    }, []);

    useEffect(() => {
        setData(data);
    }, [data]);

    function getOrders() {

        api
        .post("https://bi.eletrosom.com/api_fast_food/v1/api.php",{
            "screen": "pickUp"
        },
        {
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
        .then((response) => setData(response.data))
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });

    }

  return (
    <div style={{display: 'flex'}}>
      
        <div style={{height: '100vh', width: '50%', padding: '60px', boxSizing: 'border-box', textAlign: 'center'}}>
            <h1>Preparando</h1>

            {data.length != 0 && data.active.map(
                item => 
                    <p key={Math.random().toString(36).substring(3,9)} style={{fontSize: '30px',fontWeight: 'bold', color: '#797979'}}>{item}</p>
            )}

        </div>

        <div style={{borderRadius: '8px', width: '8px', background: 'rgb(55, 55, 55)', position: 'absolute', top: '50%', left: '50%', marginRight: '-50%', transform: 'translate(-50%, -50%)', height: '60%'}}>


        </div>

        <div style={{height: '100vh', width: '50%', padding: '60px', boxSizing: 'border-box', textAlign: 'center'}}>
            <h1>Pronto</h1>

            {data.length != 0 && data.finished.map(
                item => 
                    <p key={Math.random().toString(36).substring(3,9)} style={{fontSize: '30px',fontWeight: 'bold', color: '#797979'}}>{item}</p>
                )}
        </div>

    </div>
  );
}

export default Pickup;
