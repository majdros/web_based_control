import React, {Component} from "react";
import {Container} from 'react-bootstrap';

class Footer extends Component{
    state= {};
    render() {
        return(
            <Container className="text-center">
                <p>RIOTU Lab &copy; 2025</p>
            </Container>);
    }
}

export default Footer;