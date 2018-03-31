import React from 'react';
import { Navbar } from 'react-bootstrap';

class Header extends React.Component {

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <img className="logo" src={ require('../media/logo.png') } alt="logo" />
                    </Navbar.Brand>
                    <Navbar.Brand>
                        <label className="app-label">Todo App</label>
                    </Navbar.Brand>
                </Navbar.Header>
            </Navbar>
        )
    }
}

export default Header;