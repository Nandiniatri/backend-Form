import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const filePath = "data.json";

// ✅ Save data to JSON file
app.post("/api/save", (req, res) => {
    const data = fs.existsSync(filePath)
        ? JSON.parse(fs.readFileSync(filePath))
        : [];

    data.push(req.body);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.json({ message: "Saved ✅" });
});

// ✅ Retrieve data from JSON file
app.get("/api/data", (req, res) => {
    if (!fs.existsSync(filePath)) return res.json([]);

    res.json(JSON.parse(fs.readFileSync(filePath)));
});


app.listen(4000, () => console.log("✅ Server: http://localhost:4000"));
