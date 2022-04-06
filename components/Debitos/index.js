import { React, useState, useEffect } from "react";
import axios from "axios";
import { Fragment } from "react/cjs/react.production.min";

export default function Debitos({ setIdCadastro }) {

    const [debito, setDebito] = useState([]);


    function getDebito() {
        console.log('id', setIdCadastro);
        return axios.get('http://localhost/dbv-api/debitos/' + setIdCadastro)
            .then(async (response) => {
                setDebito(await response.data);

            }).then(console.log(debito))
            .catch(function (error) {
            });
    };

    useEffect((setIdCadastro) =>{
        getDebito();
    }, []);


    return (
        <Fragment>

        </Fragment>
    );
}
