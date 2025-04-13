// source: https://github.com/RobotWebTools/roslibjs/blob/ros2/examples/node_simple.js
// source: https://www.npmjs.com/package/react-joystick-component

import React, { Component } from "react";
import { Joystick } from "react-joystick-component";
import Config from "../scripts/config";


class Teleoperation extends Component {
    state = { ros: null };

    constructor() {
    super();
    this.init_connection();

    this.Move = this.Move.bind(this);
    this.Stop = this.Stop.bind(this);
    }


    init_connection() {
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);
    
        this.state.ros.on("connection", () => {
            this.setState({ connected: true });
            console.log("connection established in Teleoperation Component!");
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


    Move(event) {
        console.log("handle move");

        // create a ROS publisher on the topic cmd_vel_web
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.CMD_VEL_TOPIC,
            messageType: Config.CMD_VEL_MSG_TYPE,
        });

        // create a twist message to be to published to rosbridge
        var twist = new window.ROSLIB.Message({
            linear: {x: event.y / 50, y: 0, z: 0},
            angular: {x: 0, y: 0, z: -event.x / 50},
        });

        cmd_vel.publish(twist);
    }


    Stop() {
        console.log("handle stop");

        // create a ROS publisher on the topic cmd_vel_web
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.CMD_VEL_TOPIC,
            messageType: Config.CMD_VEL_MSG_TYPE,
        });

        // create a twist message to be to published to rosbridge
        var twist = new window.ROSLIB.Message({
            linear: {x: 0, y: 0, z: 0},
            angular: {x: 0, y: 0, z: 0},
        });

        cmd_vel.publish(twist);
    }



    render() {
        return (
            <div>
                <Joystick
                    size={250}
                    baseColor="#EEEEEE"
                    stickColor="#BBBBBB"
                    move={this.Move}
                    stop={this.Stop}
                ></Joystick>
            </div>
        );
    }

}

export default Teleoperation;