import React from "react";
import { Fragment } from "react";
import ListaCadastro from "../../components/ListaCadastro";
import Debitos from "../../components/Debitos";
import { useState } from "react/cjs/react.production.min";

export default function Main() {
    return (
        <Fragment>
            <ListaCadastro setIdCadastro></ListaCadastro>
        </Fragment>
    )
}
