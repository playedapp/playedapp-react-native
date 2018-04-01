const express = require("express")
const app = express()
const path = require("path")
const db = require("./db")

app.use("/static", express.static(path.join(__dirname, "../static")))

app.get("/api/flow", (req, res) => res.json(db.flow.get))
app.get("/api/session/:id?", (req, res) => res.json(db.session.get))

app.listen(3000, () => console.log("Example app listening on port 3000!"))
