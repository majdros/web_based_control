// source: https://github.com/RobotWebTools/roslibjs/blob/ros2/examples/simple.html

import React, { Component} from "react";
import Alert from "react-bootstrap/Alert";
import Config from "../scripts/config"

class Connection extends Component{
    state = { 
        connected: false,
        ros: null,
    };

    componentDidMount() {
        // Initialize connection after component is mounted
        this.init_connection();
    }

    init_connection(){
        // Create ROS connection
        const ros = new window.ROSLIB.Ros();

        // Set up event listeners
        ros.on('connection', () => {
            console.log('Connected to websocket server successfully!');
            this.setState({ connected: true });
            // Pass ROS up to parent
            if (this.props.setRos) {
                console.log("Passing ROS to parent component");
                this.props.setRos(ros);
            }else {
                console.error("this.props.setRos is not a function!");
            }
        });


        ros.on('error', (error) => {
            console.log('Error connecting to websocket server: ', error);
        });


        ros.on('close', () => {
            this.setState({ connected: false });
            console.log('Connection to websocket server closed.');
            //try to reconnect every 5 secounds
            setTimeout(()=> {
                ros.connect(`ws://${Config.ROSBRIDGE_SERVER_IP}:${Config.ROSBRIDGE_SERVER_PORT}`);
            }, Config.RECONNECTION_TIMER);
        });


        // Update state correctly
        this.setState({ ros: ros });

        // Connect to ROS websocket server
        ros.connect(`ws://${Config.ROSBRIDGE_SERVER_IP}:${Config.ROSBRIDGE_SERVER_PORT}`);
    }


    render(){
        return (
            <div>
                <Alert className="text-center m-4" variant={this.state.connected ? "success": "danger"}>
                    {this.state.connected ? "Robot Connected": "Robot Disconnected"}
                </Alert>
            </div>
        );
    }
}

export default Connection;
