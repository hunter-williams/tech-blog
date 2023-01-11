const functions = require("firebase-functions");
const express = require("express");
const routes = require("../routes");
const exphbs = require("express-handlebars");
const url = require("url");

const app = express();
const hbs = exphbs.create( );
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// app.engine('handlebars', handlebars({
//     layoutsDir: __dirname + '/views/layouts',
//     }));

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/dashboard", (request, response) => {
  const queryObject = url.parse(request.url, true).query;
  const username = queryObject.username ? queryObject.username : "anonymous";

  response.render("dashboard", {username: username});
});

app.get("/login", (request, response) => {
  response.render("login", {layout: "main"});
});

app.get("/timestamp", (request, response) => {
  response.send(`${Date.now()}`);
});

app.get("/", (request, response) => {
  response.render("dashboard", {layout: "main"});
});

app.get("*", (request, response) => {
  response.send(
      "Hello from Express on Firebase with CORS! No trailing '/' required!"
  );
});

app.use(routes);

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//

exports.techapp = functions.https.onRequest(app);

// const techapp = functions.https.onRequest((request, response) => {
//   if (!request.path) {
//     request.url = `/${request.url}`; //prepend '/' to keep query params
//   }
//   return app(request, response);
// });

// module.exports = {techapp};
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     functions.logger.info("Hello logs!", {structuredData: true});
//     response.send("Hello from Firebase!");
//   });
