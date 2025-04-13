import React, {Component} from "react";
import {Container} from 'react-bootstrap';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import About from "./About";

class Body extends Component{
    render(){
        return(
            <Container>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </Router>
            </Container>
            );
        }
    }

export default Body;