import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Orders from '../screens/orders/orders';
import Kitchen from '../screens/kitchen/kitchen';
import Pickup from '../screens/pickup/pickup';
import Navbar from '../navBar/navBar';

const Routes = () => {
  return(
    <BrowserRouter>
      
        <Navbar/>
        <Route component = { Orders }  path="/pedidos" exact key={Math.random().toString(36).substring(2,9)} />
        <Route component = { Kitchen }  path="/cozinha" key={Math.random().toString(36).substring(2,9)} />
        <Route component = { Pickup }  path="/retirada" key={Math.random().toString(36).substring(2,9)} />

    </BrowserRouter>
  )
}

export default Routes;