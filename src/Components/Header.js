import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { MuiThemeProvider, IconButton } from 'material-ui';
import Clear from 'material-ui/svg-icons/communication/clear-all';

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
                    {/* <Nav pullRight>
                        <NavItem>
                            <MuiThemeProvider>
                                <IconButton tooltip="Clear List">
                                    <Clear />
                                </IconButton>
                            </MuiThemeProvider>
                        </NavItem>
                    </Nav> */}
            </Navbar>
        )
    }
}

export default Header;