const Config = {
    //Connection_params
    ROSBRIDGE_SERVER_IP: "10.192.106.63",
    // ROSBRIDGE_SERVER_IP: "192.168.0.34",
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
};

export default Config;