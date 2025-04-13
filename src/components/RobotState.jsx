import React, { Component} from "react";
import { Row, Col} from "react-bootstrap";
import Config from "../scripts/config"

class RobotState extends Component{
    state = {
        ros: null,
        linear_velocity: 0,
        angular_velocity: 0,
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
        this.getRobotState();
    }


    getRobotState() {
        // subscriber for the velocities in /odometry/filtered topic
        var velocity_subscriber = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.ODOM_TOPIC,
            messageType: Config.ODOM_MSG_TYPE,
        });

        // callback for the odometry
        velocity_subscriber.subscribe((message) => {
            this.setState({linear_velocity: message.twist.twist.linear.x.toFixed(2)});
            this.setState({angular_velocity: message.twist.twist.angular.z.toFixed(2)});
        });
    }


    render(){
        return(
            <div>
                <Row>
                    <Col >
                        <h3 className="mt-5">Velocities</h3>
                        <p className="mt-0"> Linear Velocity: {this.state.linear_velocity} </p>
                        <p className="mt-0"> Angular Velocity: {this.state.angular_velocity} </p>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default RobotState;