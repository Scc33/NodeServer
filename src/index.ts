import express from "express";

const app = express();
const PORT = 8080;

app.use(express.static("src"));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
