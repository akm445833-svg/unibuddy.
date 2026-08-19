const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🎓 UniBuddy Backend is Working!"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "UniBuddy API is Healthy 🚀"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`UniBuddy server running on port ${PORT}`);
});
