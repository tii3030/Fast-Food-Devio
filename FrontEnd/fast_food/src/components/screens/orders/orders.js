import React, { useEffect, useState, useRef } from "react";
import { 
    Container,
    Container_header,
    Header_search,
    Container_category,
    Card_category,
    Container_cards,
    Img,
    Text_title,
    Text_descr,
    Container_products,
    Subtitle,
    Card_product,
    Container_cards_p,
    Space_inside,
    Container_Bottom,
    Button_cancel,
    Button_finalize,
    Container_myOrders,
    Observation
} from './ordersSTL';

import api from "../../service/axios";
import './orders.css';
import "./modal/modal.css";
import { FaPlus, FaMinus } from 'react-icons/fa';

function Orders() {

    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const [descr, setDescr] = useState('');
    const [price, setPrice] = useState('');
    const [img, setImg] = useState('');
    const [name, setName] = useState('Tiago Pereira');

    const [total, setTotal] = useState(0);
    const cardRef = useRef(null);
    const [dropdown, setDropdown] = useState("");

    const[additional, setAdditional] = useState([]);

    const[countItens, setCountItens] = useState(1);
    const [qtd, setQtd] = useState(1);
    const [priceItemTotal, setPriceItemTotal] = useState('');
    const [myOrdersM, setMyOrders] = useState([]);
    const [auxF, setAuxF] = useState(true);
    const [itensOrd, setItensOrd] = useState([]);
    const [id, setId] = useState([]);

    useEffect(() => {

        api
            .post("https://bi.eletrosom.com/api_fast_food/v1/api.php",{
                "screen": "orders",
                "action": "all_smashs"
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


        api
        .post("https://bi.eletrosom.com/api_fast_food/v1/api.php",{
            "screen": "orders",
            "action": "all_additional"
        },
        {
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
        .then((response) => setAdditional(response.data))
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
        
    }, []);

    function setAdditionalF (data) {
        // setAddImg();
        // setAddName();
        // setAddDescr();
    }


    function _renderProducts() {

        let row = [];

        for(let i = 0; i < data.length; i++) {
            
            let key = Math.random().toString(36).substring(2,9);
    
            row[i] = (
                <div className="Card_product1" key={key} id={key} onClick={() => handleClick(i, data[i].id, data[i].title, data[i].descr, data[i].price, data[i].img) }>
    
                    <Space_inside key={Math.random().toString(36).substring(1,8)}/>
    
                    <div style={{zIndex: '1000', display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}} key={Math.random().toString(36).substring(1,6)}>
                        <Img src={data[i].img} alt="Combos" key={Math.random().toString(36).substring(3,10)} />
                        <Text_title key={Math.random().toString(36).substring(3,9)}>{data[i].title}</Text_title> 
                        <Text_descr key={Math.random().toString(36).substring(3,8)}>{data[i].descr}</Text_descr>
                        <Text_title key={Math.random().toString(36).substring(4,9)}>{(parseFloat(data[i].price)).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text_title>
                    </div> 
    
                </div>
            )
        }
    
        return row;
    }

    function handleClick(i, id, name, descr, value, img){
        showDropdown(i, id, name, descr, value, img);
    }

    const [ids, setIds] = useState(0);

    const showDropdown = (i, id, name, descr, price, img) => {
        setIds(parseFloat(id));
        setDropdown("show");
        setTitle(name);
        setDescr(descr);
        setPrice(price);
        setPriceItemTotal(price);
        setImg(img);
        // setMyOrders([{name: name, price: price}]);
    }

    const closeDropdown = event => {
        setDropdown("");
    };
    
    function getAddict() {
        api
        .post("https://bi.eletrosom.com/api_fast_food/v1/api.php",{
            "screen": "orders",
            "action": "all_smashs"
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

    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
      setChecked(!checked);
    };

    const [idp, setIdp] = useState([]);

    function addAdic(idw, name, price) {

        let er = idp;
        er.push(idw);

        setIdp(parseFloat(er));

        let auxArr = myOrdersM;
        auxArr.push({name: name, price: price});
        setMyOrders(auxArr);
        setPriceItemTotal(parseFloat(priceItemTotal) + parseFloat(price));
        setAuxF(!auxF);
    }

    function _renderAdditional() {

        let row = [];

        for(let i = 0; i < additional.length; i++) {

            let key = Math.random().toString(36).substring(2,9);

            row[i] = (
                <div key={key} id={key} onClick={() => addAdic(additional[i].id, additional[i].title, additional[i].price)} style={{display: 'flex', margin: '30px 0', boxShadow: 'rgba(0, 0, 0, 0.1) 1px 1px 10px 0.5px', padding: '10px', borderRadius: '10px'}}>
                    <div key={Math.random().toString(36).substring(1,8)} style={{marginRight: '20px', boxShadow: 'rgba(0, 0, 0, 0.1) 1px 1px 10px 0.5px', zIndex: '1000', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', width: '70px', height: '60px', borderRadius: '5px', alignContent: 'center'}}>
                        <Img key={Math.random().toString(36).substring(1,8)} src={additional[i].img} alt="Smash" style={{height: '50px', width: '50px'}} />                       
                    </div>

                    <div key={Math.random().toString(36).substring(1,8)} style={{marginBottom: '15px', height: 'fit-content', display: 'flex', flexWrap: 'wrap', width: '100%'}}>

                        <div key={Math.random().toString(36).substring(1,8)} style={{width: '100%', display: 'flex', height: 'fit-content'}}>
                            <p key={Math.random().toString(36).substring(1,8)} style={{margin: 0, fontSize: '14px', fontWeight: 'bold'}}>{additional[i].title}</p>
                            
                            <div style={{marginLeft: 'auto', display: 'inline-flex'}}>
                                <p key={Math.random().toString(36).substring(1,8)} style={{margin: 0,fontSize: '14px', fontWeight: 'bold'}}>{(parseFloat(additional[i].price)).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                            </div>
                            
                        </div>

                        <div key={Math.random().toString(36).substring(1,8)} style={{width: '100%', height: 'fit-content'}}>
                            <p key={Math.random().toString(36).substring(1,8)} style={{margin: 0,fontSize: '12px'}}>{additional[i].descr}</p>
                        </div>

                    </div>
                </div>
            )
        }
    
        return row;
    }

    function IncDec(type) {
        if(type == 'inc') {
            setPriceItemTotal(parseFloat(priceItemTotal)+parseFloat(price));
            setCountItens(countItens+1);
            setQtd(qtd+1);
        } else {
            setPriceItemTotal(parseFloat(priceItemTotal)-parseFloat(price));
            setCountItens(countItens-1);
            setQtd(qtd-1);
        }
    }
    
    function finalizeModalOrder(idz, qtd, title, price, myOrdersMs) {

        let auxid = id;
        id.push(parseFloat(idz));
        setId(auxid);

        // let auxid = id;
        // id.push(parseFloat(idz));
        // let alphaNumeric = id.concat(idp);
        // setId(alphaNumeric);



        setTotal(parseFloat(priceItemTotal) + parseFloat(total));
        closeDropdown();

        let asd = itensOrd;
        asd.push({qtd: qtd, title: title, price: price, arr: myOrdersMs});

        setItensOrd(asd);

        setCountItens(1);
        setQtd(1);
        setMyOrders([]);
    }

    function cancelAll() {
        setCountItens(1);
        setQtd(1);
        setPriceItemTotal('');
        setMyOrders([]);
        setAuxF(!auxF);
        setTotal(0);
        setItensOrd([]);
    }

    function cancelModal() {
        closeDropdown();
        setCountItens(1);
        setQtd(1);
        setMyOrders([]);
    }

    function sendAll() {
        
        api
            .post("https://bi.eletrosom.com/api_fast_food/v1/api.php",{
                "screen": "orders",
                "action": "create_order",
                "client_id" : "1",
                "type_pay": "3",
                "products": id
        },
        {
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
        .then((response) => {
            if(response.data.Order_Created) {
                getOrders();
            }
        })
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });

    }

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
        .then((response) => createWebSocket(response.data))
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });

    }

    function createWebSocket(data) {
        let connection = new WebSocket('ws://10.0.0.180:8080');
        
        connection.onopen = function (event) {
            connection.send(JSON.stringify(data));
        };

        setTimeout(() => {
            connection.close();
        }, "500")        
    }
        
    return (
        <Container key={Math.random().toString(36).substring(3,9)}>

            {/* HEADER WELCOME AND SEARCH */}
            <Container_header>
                <h2>Seja bem Vindo!</h2>
                <Header_search placeholder="O que você procura ?" />
            </Container_header>

            <Container_category>
                <h3>Categorias</h3>
                <Subtitle>Navegue por categoria</Subtitle>

                <Container_cards>

                    <Card_category>
                        <Img src={'https://bi.eletrosom.com/ddrgh/assets/imgs/combo.png'} alt="Combos"/>
                        <Text_title>Combos</Text_title>
                    </Card_category>

                    <Card_category>
                        <Img src={'https://bi.eletrosom.com/ddrgh/assets/imgs/acompanhamento.png'} alt="Combos"/>
                        <Text_title>Acompanhamentos</Text_title>
                    </Card_category>

                    <Card_category>
                        <Img src={'https://bi.eletrosom.com/ddrgh/assets/imgs/bebidas.png'} alt="Combos"/>
                        <Text_title>Bebidas</Text_title>
                    </Card_category>

                    <Card_category>
                        <Img src={'https://bi.eletrosom.com/ddrgh/assets/imgs/sobremesa.png'} alt="Combos"/>
                        <Text_title>Sobremesas</Text_title>
                    </Card_category>

                </Container_cards>

            </Container_category>

            <Container_products>
                <h3>Produtos</h3>
                <Subtitle>Selecione um produto para adicionar ao seu pedido</Subtitle>

                <Container_cards_p ref={cardRef} key={Math.random().toString(36).substring(3,9)}>
                    {data.length > 0 && _renderProducts()}
                </Container_cards_p>

            </Container_products>

            {
                total !== 0 &&

                <Container_myOrders key={Math.random().toString(36).substring(3,9)}>

                    {itensOrd.map(
                        item => 
                        <>
                            <div key={Math.random().toString(36).substring(3,9)} style={{width: '100%', justifyContent: 'space-between', display: 'inline-flex'}}>
                                <p>{item.qtd}x {item.title}</p><p>{(parseFloat(item.price)).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                            </div>

                            {item.arr.map(
                                itemz => 
                                <div key={Math.random().toString(36).substring(3,9)} style={{width: '100%', justifyContent: 'space-between', display: 'inline-flex'}}>
                                    <p style={{display: 'none'}}>{auxF}</p><p>{'1x'} {itemz.name}</p><p>{(parseFloat(itemz.price)).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                                </div>
                            )} 
                        </>
                    )} 

                    <hr key={Math.random().toString(36).substring(3,9)} style={{border: 0, borderTop: '1px dashed #CCC'}}/>
                    <p key={Math.random().toString(36).substring(3,9)} style={{margin: 0, fontSize: '15px'}}>Total do Pedido:</p>
                    <h2 key={Math.random().toString(36).substring(3,9)} style={{margin: 0}}>{total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h2>
            
                </Container_myOrders>

            }

            <Container_Bottom>
                <Button_cancel onClick={() => cancelAll()}>Cancelar</Button_cancel>
                <Button_finalize onClick={() => sendAll()}>Finalizar Pedido</Button_finalize>
            </Container_Bottom>


            {/* MODAL */}
            <div className={`${dropdown} modal`} key={Math.random().toString(36).substring(3,9)}>
                <div className="modal-cont" key={Math.random().toString(36).substring(3,9)}>
                    
                    <div onClick={() => closeDropdown()} style={{display: 'block', height: 'fit-content', width: '100%', textAlign: 'end'}}>
                        <p className="close">x</p>
                    </div>

                    <div style={{display: 'block', padding: '0 90px'}}>
                        <h2>Revise seu pedido!</h2>
                    </div>

                    <div style={{display: 'flex', padding: '0 90px', height: '200px', margin: '35px 0'}}>
                        
                        <div className="Card_product3" style={{minWidth: '156px'}}>
                            <Space_inside key={Math.random().toString(36).substring(1,8)} style={{height: '60%'}} />

                            <div style={{zIndex: '1000', display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}} key={Math.random().toString(36).substring(1,6)}>
                                <Img src={img} alt="Combos" key={Math.random().toString(36).substring(3,10)} style={{height: '80px', width: '80px'}} />
                            </div> 
                        </div>

                        <div style={{marginBottom: '15px', height: 'fit-content', display: 'flex', flexWrap: 'wrap', width: '100%'}}>
                            <div style={{width: '100%', justifyContent: 'space-between', display: 'flex', height: 'fit-content'}}>
                                <p style={{margin: 0, fontSize: '14px', fontWeight: 'bold'}}>{title}</p>
                                <p style={{margin: 0,fontSize: '14px', fontWeight: 'bold'}}>{price}</p>
                            </div>

                            <div style={{width: '100%', height: 'fit-content'}}>
                                <p style={{margin: 0,fontSize: '12px'}}>{descr}</p>
                                
                                <div style={{display: 'inline-flex', alignItems: 'center', marginTop: '20px'}}>
                                    <button onClick={() => countItens > 1 && IncDec('dec')} style={{textAlign: 'center', border: 'none', height: '30px', width: '30px', borderRadius: '100%', background: '#125C13', color: 'white', textAlign: 'center', padding: 0, marginRight: '-20px', alignContent: 'center', display: 'inline-grid', justifyContent: 'center', zIndex: 1}}><FaMinus color='white' size={20}/></button>
                                    <div style={{color: '#000', fontSize: '14px', fontWeight: 'bold', textAlign: 'center', height: '20px', width: '70px', borderRadius: '10px', border: 'solid 1px #007107'}}div>{countItens}</div>
                                    <button onClick={() => IncDec('inc')} style={{textAlign: 'center', border: 'none', height: '30px', width: '30px', borderRadius: '100%', background: '#125C13', color: 'white', textAlign: 'center', padding: 0, marginLeft: '-20px', alignContent: 'center', display: 'inline-grid', justifyContent: 'center', zIndex: 1}}><FaPlus color='white' size={20}/></button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div style={{padding: '0 90px', height: '200px', margin: '35px 0'}} key={Math.random().toString(36).substring(1,8)}>
                        <h3 style={{margin: '15px 0'}}>Adicionais</h3>
                        <p style={{margin: '0 0 50px 0'}}>Selecione os ingredientes que você quer adicionar a mais no seu lanche</p>
                    
                        {additional.length > 0 && _renderAdditional()}

                        <div>
                            <h3 style={{margin: 'margin: 15px 0 50px 0'}}>Observações</h3>
                            <Observation placeholder="Adicione uma observação ao seu pedido"/>
                        </div>


                        <Container_myOrders key={Math.random().toString(36).substring(3,9)} style={{margin: '40px 0'}}>

                            <div key={Math.random().toString(36).substring(3,9)} style={{justifyContent: 'space-between', display: 'flex', marginBottom: '40px', flexWrap: 'wrap'}}>
                                

                                <div key={Math.random().toString(36).substring(3,9)} style={{width: '100%', justifyContent: 'space-between', display: 'inline-flex'}}>
                                    <p>{qtd}x {title}</p><p>{(parseFloat(price)).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                                </div>
                                <p style={{display: 'none'}}>{auxF}</p>

                                {myOrdersM.map(
                                    item => 
                                    <div key={Math.random().toString(36).substring(3,9)} style={{width: '100%', justifyContent: 'space-between', display: 'inline-flex'}}>
                                        <p>1x {item.name}</p><p>{(parseFloat(item.price)).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                                    </div>
                                )} 

                            </div>

                            <hr key={Math.random().toString(36).substring(3,9)} style={{border: 0, borderTop: '1px dashed #CCC'}}/>
                            <p key={Math.random().toString(36).substring(3,9)} style={{margin: 0, fontSize: '15px'}}>Total do Pedido:</p>
                            <h2 key={Math.random().toString(36).substring(3,9)} style={{margin: 0}}>{parseFloat(priceItemTotal).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h2>
                        </Container_myOrders>

                        <Container_Bottom key={Math.random().toString(36).substring(3,9)}>
                            <Button_cancel key={Math.random().toString(36).substring(3,9)} onClick={() => cancelModal()} style={{background: 'white', color: '#125C13'}}>Cancelar</Button_cancel>
                            <Button_finalize key={Math.random().toString(36).substring(3,9)} onClick={() => finalizeModalOrder(ids, qtd, title, price, myOrdersM)} style={{background: '#125C13', color: 'white'}}>Finalizar Pedido</Button_finalize>
                        </Container_Bottom>
                    </div>

                </div>
            </div>

        </Container>
  );
}

export default Orders;