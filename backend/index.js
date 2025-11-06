import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const filePath = "data.json";

// ✅ Route to save data
app.post("/api/save", (req, res) => {
    const newData = req.body;

    // ✅ Check if JSON file exists
    let existingData = [];
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf8");
        existingData = fileData ? JSON.parse(fileData) : [];
    }

    // ✅ Add new data
    existingData.push(newData);

    // ✅ Save back to JSON file
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    res.json({ success: true, message: "Data saved successfully!" });
});

// ✅ Route to get all saved data
app.get("/api/data", (req, res) => {
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf8");
        res.json(JSON.parse(fileData));
    } else {
        res.json([]);
    }
});

app.listen(4000, () => {
    console.log("✅ Server running at http://localhost:4000");
});
