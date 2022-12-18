import { React, useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Jumbotron } from 'reactstrap';
import Extrato from '../Extrato';

export default function MenuPrincipal() {

    const [isOpen, setIsOpen] = useState(false);
    const [isExtrato, setIsExtrato] = useState(false);

    const handleExtrato = () => {
        setIsOpen(false);
        setIsExtrato(true);
    }

    const handleMain = () => {
        setIsOpen(false);
        setIsExtrato(false);
    }

    return (
        <>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/" onClick={() => handleMain()}><strong>Cruzeiro do Sul</strong></NavbarBrand>
                <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="#" onClick={() => handleExtrato()}>Extrato</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Pagamento</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Débito</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            {isExtrato ? <Extrato true/> : null}
        </>
    )
}


