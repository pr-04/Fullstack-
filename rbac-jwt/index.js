const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = "mysecretkey";

const users = [
  { id: 1, username: "adminuser", password: "admin123", role: "Admin" },
  { id: 2, username: "moduser", password: "mod123", role: "Moderator" },
  { id: 3, username: "normaluser", password: "user123", role: "User" },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) return res.status(401).json({ message: "Invalid username or password" });

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(403).json({ message: "Token missing" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient role" });
    }
    next();
  };
}

app.get("/admin-dashboard", verifyToken, authorizeRoles("Admin"), (req, res) => {
  res.json({ message: "Welcome to the Admin dashboard.", user: req.user });
});

app.get("/moderator-panel", verifyToken, authorizeRoles("Moderator"), (req, res) => {
  res.json({ message: "Welcome to the Moderator panel.", user: req.user });
});

app.get("/user-profile", verifyToken, (req, res) => {
  res.json({ message: `Welcome to your profile, ${req.user.username}.`, user: req.user });
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
