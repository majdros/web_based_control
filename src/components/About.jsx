import React, { Component} from "react";

class About extends Component{
    state = {};
    render() {
        return (
            <div>
                <h1>About</h1>
                <p>This react app controls and monitors ROS2-enabled robots throug a web Interace via websocket</p>
                <p>For more information, the source of the project can be found at the URL: github.com/majdros/web_based_control/Readme.md</p>
            </div>
        );
    }
}

export default About;