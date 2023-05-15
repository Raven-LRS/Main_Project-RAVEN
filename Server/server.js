import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import cors from "cors";

const app = express();

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.static("/test-react"));
app.use(bodyParser.json());

app.post("/submit-form", (req, res) => {
  const formData = req.body;

  try {
    fs.writeFileSync("C:/Users/Public/data.json", JSON.stringify(formData));
    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.json({ success: false });
  }
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
