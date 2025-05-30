import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const PORT = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static("."));
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
