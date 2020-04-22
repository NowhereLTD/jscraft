const Server = require("./src/Server.class.js");
const JSONLoader = require("./src/modules/Utils/JSONLoader.class.js");

const serverProperties = new JSONLoader();
serverProperties.load("./etc/server.properties");

const server = new Server(serverProperties.data);
server.startServer();
