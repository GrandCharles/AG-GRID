import React from "react";
import {BrowserRouter,Switch, Route} from 'react-router-dom';

import Home           from '../views/Home';
import Pedidos        from '../components/Pedidos/Faturamento';
import PedidosCliente from '../components/Pedidos/PedidosCliente';

export default function Routes() {
       

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/sfa"                     exact component={Home}/>
                <Route path="/sfa/Pedidos/Faturamento" exact component={Pedidos}/>
                <Route path="/sfa/RelCliente"          exact component={PedidosCliente}/>
            </Switch>

        </BrowserRouter>
    )
}

/*
                <Route path="/" exact component={Home}/>

                <Route path="/Pedidos" exact component={Home}/>
*/