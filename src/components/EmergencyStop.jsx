import React, { Component} from "react";
import Alert from "react-bootstrap/Alert";
import { Row, Col, Button} from "react-bootstrap";
import Config from "../scripts/config"



class EmergencyStop extends Component{
    state = { 
        ros: null,
        isActive: false,
    };


    constructor(props) {
        super(props);
        
        // Wenn ros als prop übergeben wird, verwenden wir diese Verbindung
        if (props.ros) {
            this.state.ros = props.ros;
        } else {
            // Andernfalls eigene Verbindung herstellen (weniger ideal)
            this.init_connection();
        }
        // Korrekte Bindung der Funktionen
        this.handleEmergencyStop = this.handleEmergencyStop.bind(this);
        this.publishEmergencyState = this.publishEmergencyState.bind(this);
    }


    init_connection() {
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);
    
        this.state.ros.on("connection", () => {
            this.setState({ connected: true });
            console.log("connection established in EmergencyStop Component!");
        });
    
        this.state.ros.on("close", () => {
            this.setState({ connected: false });
            console.log("connection is closed!");
        });
    
        try {
            this.state.ros.connect("ws://" + Config.ROSBRIDGE_SERVER_IP + ":" + Config.ROSBRIDGE_SERVER_PORT + "");
        } 
        catch (error) {
            console.error("connection problem: ", error);
        }
    }


    componentDidMount() {
        this.publishEmergencyState(false);
    }


    // Funktion zum Umschalten des Notfall-Stopps
    handleEmergencyStop() {
        const newState = !this.state.isActive;
        this.setState({ isActive: newState }, () => {
            this.publishEmergencyState(newState);
        });
    }


    // Funktion zum Publizieren des Notfall-Stopp-Zustands
    publishEmergencyState(isActive) {
        if (!this.state.ros) {
            console.error("No ROS connection available");
            return;
        }

        console.log(`Publishing emergency stop: ${isActive}`);

        // Topic für den Notfall-Stopp
        const emergencyStopTopic = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.EMERGENCYSTOP_TOPIC,
            messageType: Config.EMERGENCYSTOP_MSG_TYPE,
        // Wichtig: QoS-Einstellungen für persistente Nachrichten
            qos: {
                durability: 'volatile',
                reliability: 'reliable',
                depth: 1
            }
        });

        // Bool-Nachricht erstellen
        const message = new window.ROSLIB.Message({
            data: isActive
        });

        // Nachricht veröffentlichen
        emergencyStopTopic.publish(message);
    }


    render() {
        // Styling basierend auf dem Zustand des Notfall-Stopps
        const buttonVariant = this.state.isActive ? "danger" : "success";
        const buttonText = this.state.isActive ? "EMERGENCY STOP ACTIVATED" : "EMERGENCY STOP DEACTIVATED";
        
        return (
            <div>
                <Row>
                    <Col>
                        <h3 className="mt-4">Emergency</h3>
                        <Button 
                            variant={buttonVariant} 
                            size="lg" 
                            style={{ 
                                width: '110%', 
                                height: '100px', 
                                fontSize: '1.3rem',
                            }}
                            onClick={this.handleEmergencyStop}
                        >
                            {buttonText}
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }

}



export default EmergencyStop;
