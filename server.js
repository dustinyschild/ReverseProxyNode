const PORT = 8443;

// Dependencies
const express = require("express");
const proxy = require("http-proxy-middleware");

// Config
const { routes } = require("./config.json");

const app = express();

for (route of routes) {
  app.use(route.route,
      proxy({
          target: route.address,
          pathRewrite: (path, req) => {
              return path.split("/").slice(2).join("/"); // Could use use replace, but take care of the leading "/"
          }
      })
  );
}

app.get("*", (req, res) => {
    console.log("Request received...")
    return res.send("Test successful!");
});

app.listen(PORT, () => {
    console.log("Proxy listening on port " + PORT);
});
