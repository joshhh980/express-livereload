const express = require("express");

const env = process.env.NODE_ENV;

const port = process.env.PORT || 8000;

const app = express();

if (env !== "production") {
    const livereload = require("livereload");
    const liveReloadServer = livereload.createServer({
        extraExts: ["ejs", "css"]
    });
    liveReloadServer.watch(["public", "views"]);

    const connectLivereload = require("connect-livereload");

    liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
            liveReloadServer.refresh("/");
        }, 100);
    });

    app.use(connectLivereload());
}

app.use(express.static('public'));

app.get("/", function (_, res){
    res.render("pages/index", {});
})


app.set('view engine', 'ejs');

app.listen(port, function () {
    console.log(`Server running on port: ${port}`);
})
