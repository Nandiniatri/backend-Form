// import express from "express";
// import cors from "cors";
// import fs from "fs";

// const app = express();
// app.use(cors());
// app.use(express.json());

// const filePath = "data.json";

// // ✅ Save data to JSON file
// app.post("/api/save", (req, res) => {
//     const data = fs.existsSync(filePath)
//         ? JSON.parse(fs.readFileSync(filePath))
//         : [];

//     data.push(req.body);

//     fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

//     res.json({ message: "Saved ✅" });
// });

// // ✅ Retrieve data from JSON file
// app.get("/api/data", (req, res) => {
//     if (!fs.existsSync(filePath)) return res.json([]);

//     res.json(JSON.parse(fs.readFileSync(filePath)));
// });


// app.listen(4000, () => console.log("✅ Server: http://localhost:4000"));




import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Supabase Config
const supabase = createClient(
    "https://wesjokuhvlelhvzirfwf.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indlc2pva3VodmxlbGh2emlyZndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MjU0OTksImV4cCI6MjA3NjAwMTQ5OX0.NYgIs5YAnr9cWvRCBz3l7g4rLdjCa3M7uQFllxUi2sw"
);

// ✅ Save form data to Supabase
app.post("/api/save", async (req, res) => {
    const { first_name, last_name, email, linkedin } = req.body;
    
    console.log("Received body:", req.body);

    const { data, error } = await supabase
        .from("formdata")
        .insert([{ first_name, last_name, email, linkedin }]);

    if (error) {
        console.log("Insert Error:", error);
        return res.status(400).json({ success: false, error });
    }

    res.json({ success: true, message: "Saved to Supabase ✅", data });
});

// ✅ Get all form data
app.get("/api/data", async (req, res) => {
    const { data, error } = await supabase.from("formdata").select("*");

    if (error) {
        return res.status(400).json({ success: false, error });
    }

    res.json(data);
});

app.listen(4000, () =>
    console.log("✅ Server Running at http://localhost:4000")
);


