import React, { Component} from "react";
import Connection from "./Connection";
import Teleoperation from "./Teleoperation";
import RobotState from "./RobotState";
import Camera from "./Camera";
import { Row, Col, Container } from "react-bootstrap";

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ros: null
        };
        this.setRos = this.setRos.bind(this);
    }

    setRos(ros) {
        this.setState({ros: ros});
    }

    render() {
        return (
            <div>
                <Container>
                    <h1 className="text-center"> Robot Control Page</h1>

                    <Row className="ext-center">
                        <Col>
                            <Connection setRos={this.setRos}/>
                        </Col>
                    </Row>

                    <Row className="ext-center">
                        <Col md={5}>
                            <Teleoperation ros={this.state.ros}/>
                        </Col>
                        <Col md={3}>
                            <RobotState/>
                        </Col>
                        {/* <Col md={3}>
                            <EmergencyStop/>
                        </Col> */}
                    </Row>

                    <Row className="text-center">
                        <Col>
                            <Camera ros={this.state.ros}/>
                        </Col>
                    </Row>

                </Container>
            </div>
        );
    }
}

export default Home;