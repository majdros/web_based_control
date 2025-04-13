# React ROS2 Robot
A React-based web dashboard for controlling and monitoring ROS2-enabled robots via a web interface with WebSocket integration.

## Overview
This project enables real-time control and monitoring of robots through a simple web interface. It integrates seamlessly with ROS2 and offers the following features:
- **WebSocket Communication**: Connects to a ROS `rosbridge_server`.
- **Teleoperation**: Controls the robot using a virtual joystick component.
- **Camera Stream**: Displays a live camera stream from the robot.
- **Robot State Monitoring**: Monitors linear and angular velocity.

![ROS2 Topic Graph](/public/images/rosgraph.png)

## Usage
This section describes how to start and configure the application

### Launch
1. Start the rosbridge_server:
```bash
ros2 launch rosbridge_server rosbridge_websocket_launch.xml
```

2. Start the React app in the browser:
```bash
NODE_OPTIONS=--openssl-legacy-provider npm start
```

### Config
Contains the required configurations for the various components as constants that can be modified:

```javascript
//Connection_params
ROSBRIDGE_SERVER_IP: "192.168.0.34",
ROSBRIDGE_SERVER_PORT: "9090",
RECONNECTION_TIMER: 5000,

//Teleoperation_params
CMD_VEL_TOPIC: "/cmd_vel_web",
CMD_VEL_MSG_TYPE: "geometry_msgs/Twist",

//RobotState_params
ODOM_TOPIC: "/odometry/filtered",
ODOM_MSG_TYPE: "nav_msgs/Odometry",

//Camera_params
CAMERA_TOPIC: "/image_raw/compressed",
CAMERA_MSG_TYPE: "sensor_msgs/CompressedImage",

//EmergencyStop_params
EMERGENCYSTOP_TOPIC: "/emergency_stop",
EMERGENCYSTOP_MSG_TYPE: "std_msgs/Bool",
```  

## Package Structure
The following structure shows the organization of files and folders in the project:

```bash
react-ros2-robot/
├── node_modules/
├── public/
│   ├── index.html
│   ├── js/
│   │   ├── eventemitter2.min.js
│   │   ├── roslib.js
│   │   └── ros2d.js
│   └── images/
│       ├── circo.png
│       └── mobile-robot-autonomous.png
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Body.jsx
│   │   ├── Camera.jsx
│   │   ├── Connection.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Home.jsx
│   │   ├── RobotState.jsx
│   │   └── Teleoperation.jsx
│   ├── scripts/
│   │   └── config.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── .gitignore
├── LICENSE
└── README.md
```

## Important Components
This section provides an overview of the main components of the application and their roles in controlling and monitoring the robot.

1. **Connection**
- Establishes the connection to the ROS WebSocket server.

2. **Teleoperation**
- Enables robot control via a virtual joystick.
- Publishes the Twist message `geomertry_msgs/Twist` to the `/cmd_vel_web` topic.

3. **RobotState**
- Displays the linear and angular velocity.
- Subscribes to the Odometry message `nav_msgs/Odometry` from the `odometrdy/filtered` topic.

4. **Camera**
- Displays the live camera stream from the robot.
- Subscribes to the image message `sensor_msgs/CompressedImage` from the `/image_raw/compressed` topic.

## Dependencies
The following dependencies are required to run the application. Some of them are already included in the project.
- [ros2djs](https://github.com/RobotWebTools/ros2djs): Visualization of ROS data.
- [roslibjs](https://github.com/RobotWebTools/roslibjs): Communication with ROS via WebSocket.
- **Note**: the build files [ros2d.js](https://github.com/RobotWebTools/ros2djs/blob/develop/build/ros2d.js) und [roslib.js](https://github.com/RobotWebTools/roslibjs/blob/ros2/build/roslib.js) are already included under `/public/js/` from the repositories linked above.
- [rosbrige_server](https://github.com/RobotWebTools/rosbridge_suite/tree/ros2/rosbridge_server): contains a WebSocket server implementation that exposes the rosbridge_library
- [react-joystick-component](https://www.npmjs.com/package/react-joystick-component)
- [npm](https://deb.nodesource.com/) JavaScript package manager.
    - install npm:
        ```bash
        sudo apt install npm
        ```

    - install the project dependencies:
        ```bash
            npm install
        ```

## LICENSE
- This project uses multiple licenses to comply with the licensing requirements of third-party libraries and tools. See the [LICENSE](./LICENSE) file for details.
- The files [ros2d.js](./public/js/ros2d.js) and [roslib.js](./public/js/roslib.js) are licensed under the [MIT](https://opensource.org/license/MIT) License. See the files for details.
- Other files in this Package are licensed under the [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) License.

## TODO
- [] Replace the virtual JoyStick in the `Teleoperation` with Buttons for more control accuracy.
- [] Add Emergency stop as Button, that publishes the Bool message `std_msgs/Bool` to the `/emergency_stop` topic.