const simpleReq = require("../http/simpleReq");
const fs = require("fs");

module.exports = app => {
    app.use(simpleReq);

    // Directory routes
    if (fs.existsSync("./app")) {
        fs.readdirSync("./app")
            .forEach(contents => {
                const method = contents.toUpperCase();
                if (!app.routeMethods.includes(method)) return;
                if (!fs.lstatSync(`./app/${method}`).isDirectory()) return;

                (function checkDir(path) {
                    const dir = fs.readdirSync(`./app/${method}${path}`);

                    if (dir.includes("index.js")) app[method.toLowerCase()](path, require(`./app/${method}${path}/index.js`));

                    dir.forEach(content => {
                        if (fs.lstatSync(`./app/${method}${path}/${content}`).isDirectory()) checkDir(`${path}${path.endsWith("/") ? "" : "/"}${content}`);
                    });
                })("/");
            });
    }
}