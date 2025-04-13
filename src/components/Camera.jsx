import React, { Component} from "react";
import Alert from "react-bootstrap/Alert";
import { Row, Col} from "react-bootstrap";
import Config from "../scripts/config"

class Camera extends Component{
    state = {
        ros: null,
    };

    constructor() {
        super();
        this.init_connection();
    }

    init_connection() {
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);
    
        this.state.ros.on("connection", () => {
            this.setState({ connected: true });
            console.log("connection established in RobotState Component!");
        });
    
        this.state.ros.on("close", () => {
            this.setState({ connected: false });
            console.log("connection is closed!");

            // reconnect every 5 seconds
            setTimeout(() => {
            try {
                this.state.ros.connect("ws://" + Config.ROSBRIDGE_SERVER_IP + ":" + Config.ROSBRIDGE_SERVER_PORT + "");
            } 
            catch (error) {
                console.error("connection problem: ", error);
            }
            }, Config.RECONNECTION_TIMER);
        });
    
        try {
            this.state.ros.connect("ws://" + Config.ROSBRIDGE_SERVER_IP + ":" + Config.ROSBRIDGE_SERVER_PORT + "");
        } 
        catch (error) {
            console.error("connection problem: ", error);
        }
    }


    componentDidMount() {
        this.getImage();
    }


    getImage() {
        // subscriber for the images in /image_raw/compressed topic
        var image_subscriber = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.CAMERA_TOPIC,
            messageType: Config.CAMERA_MSG_TYPE,
        });

        // callback function for the image_subscriber
        image_subscriber.subscribe((message) => {
            // Create image URL from base64 encoded data
            const imageUrl="data:image/jpeg;base64, " + message.data;

            // Update the component's state with the new image
            this.setState({
                imageUrl: imageUrl
            });
        });
    }


    render(){
        return(
            <div>
                <Alert className="text-center m-1" style={{width: '100%' }} variant={this.state.imageUrl ? "success" : "danger"}>
                    <Row>
                        <Col >
                            <h3 className="text-center mt-1">Camera</h3>
                            {this.state.imageUrl ? 
                                <img 
                                    src={this.state.imageUrl} 
                                    alt="Robot Camera" 
                                    style={{width: '100%', maxWidth: '720px'}}/>
                                :
                                <p className="text-center mt-1">No Image</p>
                            }
                        </Col>
                    </Row>
                </Alert>
            </div>
        );
    }
}

export default Camera;