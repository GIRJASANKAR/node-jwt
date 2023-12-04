const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const secretkey = "mysecretkey";

const users = [];

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(409).json({error:"User already exists"});
      }
    users.push({ email, password });
   return res.status(201).json({message:"User registered successfully!"});
  });
  

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = {
    email: email,
    password: password,
  };
  const person = users.find(
    (u) => u.email === user.email && u.password === user.password
  );
  if (person) {
    jwt.sign({ user }, secretkey, { expiresIn: "1h" }, (err, token) => {
      res.json({
        token,
        expiresIn:3600000
      });
    });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.post("/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, secretkey, (err, authdata) => {
    if (err) {
      res.send({
        message: "Token didn't match you can't login",
        verified:false
      });
    } else {
      res.json({
        message: "Token matched Sucessfully",
        verified:true,
        authdata,
      });
    }
  });
});


function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send({
      message: "token is not provided",
    });
  }
}

app.listen(5000, () => {
  console.log("app is running at port 5000");
});
