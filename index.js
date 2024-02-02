const Server = require("../http/Server");
const Router = require("../http/Router");
const serverConfig = require("./server.json");

const server = new Server(serverConfig);
const app = new Router(server);

require("./app")(app);

server.listen(serverConfig.port, () => console.log(`Listening at :${serverConfig.port}`));