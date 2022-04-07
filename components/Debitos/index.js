import { React, useState, useEffect } from "react";
import axios from "axios";
import { Fragment } from "react/cjs/react.production.min";

export default function Debitos({ idCadastro }) {

    const [debito, setDebito] = useState([]);


    

    
    useEffect(() => {
        handleDebito();
    }, []);

   const handleDebito = (() => {
        let debitos = [];
        
        debitos = getDebito();
        console.log(debitos);
        // debitos.map((item) => {
        //    return item.iddebito;
        // });

    });

    return (
        <Fragment>
            <span>{idCadastro}</span>
            {
                handleDebito
            }
        </Fragment>
    );
}
