/* © 2025 SIGNMitra Team: Dev Shah, Ayushi Soni, Maitriba Jadeja, Vishwa Joshi */
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

// ─── Connect to MongoDB ─────────────────────────────────────────────
const uri =
  process.env.MONGO_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("💥 MongoDB error:", err));

// ─── Schemas & Models ────────────────────────────────────────────────
const signSchema = new mongoose.Schema(
  { word: String, sigml: String },
  { collection: "signs" }
);
const Sign = mongoose.model("Sign", signSchema);

const userSchema = new mongoose.Schema(
  { name: String, email: String, password: String },
  { collection: "users" }
);
const User = mongoose.model("User", userSchema);

// ─── List of all your “word” collections ─────────────────────────────
const collections = [
  "animals",
  "colors",
  "food",
  "grammar_words",
  "vyakaran",
  "family",
  "kakko_and_barakhadi",
  "swar",
  "numbers",
  "objects",
  "signs",
];

// ─── AUTH: Login & Signup ────────────────────────────────────────────
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.password !== password)
      return res.status(401).json({ message: "Incorrect password" });
    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (await User.findOne({ email }))
      return res.status(409).json({ message: "User already exists" });
    const newUser = await User.create({ name, email, password });
    res.json({ message: "Signup successful", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ─── SiGML LOOKUPS ────────────────────────────────────────────────────
// exact in “signs” only
app.get("/api/sigml/:word", async (req, res) => {
  const w = req.params.word;
  try {
    const result = await Sign.findOne({
      word: { $regex: new RegExp(`^${w}$`, "i") },
    });
    if (!result) return res.status(404).json({ error: "Word not found" });
    res.json({ sigml: result.sigml });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// search across all collections
app.get("/api/find-sigml/:word", async (req, res) => {
  const w = req.params.word;
  try {
    for (let name of collections) {
      const doc = await mongoose.connection.db
        .collection(name)
        .findOne({ word: { $regex: new RegExp(`^${w}$`, "i") } });
      if (doc) {
        return res.json({ sigml: doc.sigml || doc.string, category: name });
      }
    }
    res.status(404).json({ error: "Word not found anywhere" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// fallback: split into letters
app.get("/api/fallback-sigml/:word", async (req, res) => {
  const w = req.params.word;
  try {
    // 1) exact
    for (let name of collections) {
      const doc = await mongoose.connection.db
        .collection(name)
        .findOne({ word: { $regex: new RegExp(`^${w}$`, "i") } });
      if (doc) {
        return res.json({ fallback: false, sigmls: [doc.sigml || doc.string] });
      }
    }
    // 2) letters
    const sigmls = [];
    for (let ch of [...w]) {
      let letterDoc = await mongoose.connection.db
        .collection("kakko_and_barakhadi")
        .findOne({ word: ch });
      if (!letterDoc) {
        letterDoc = await mongoose.connection.db
          .collection("swar")
          .findOne({ word: { $in: [ch] } });
      }
      if (!letterDoc) {
        letterDoc = await mongoose.connection.db
          .collection("numbers")
          .findOne({ word: { $in: [ch] } });
      }
      if (letterDoc) sigmls.push(letterDoc.sigml || letterDoc.string);
    }
    if (sigmls.length) {
      res.json({ fallback: true, sigmls });
    } else {
      res.status(404).json({ error: "No letters found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ─── DASHBOARD METRICS ────────────────────────────────────────────────
// 1) total‐word‐count (sum of all docs across every collection)
app.get("/api/total-word-count", async (req, res) => {
  try {
    let sum = 0;
    for (let name of collections) {
      sum += await mongoose.connection.db
        .collection(name)
        .countDocuments();
    }
    res.json({ totalWords: sum });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// 2) all‐words (distinct “word” values, excluding some collections)
const excludeWords = new Set([
  "kakko_and_barakhadi",
  "swar",
  "users",
]);
app.get("/api/all-words", async (req, res) => {
  try {
    let all = [];
    for (let name of collections) {
      if (excludeWords.has(name)) continue;
      const list = await mongoose.connection.db
        .collection(name)
        .distinct("word");
      all.push(...list);
    }
    const unique = [...new Set(all)];
    res.json({ total: unique.length, words: unique });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// 3) total‐sigml-signs (sum of docs across every “sign” collection, exclude users)
app.get("/api/total-sigml-signs", async (req, res) => {
  try {
    let sum = 0;
    for (let name of collections) {
      if (name === "users") continue;
      sum += await mongoose.connection.db
        .collection(name)
        .countDocuments();
    }
    res.json({ totalSigns: sum });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ─── MISC: counts & collections & per‑collection dump ────────────────
app.get("/api/counts", async (req, res) => {
  try {
    const counts = {};
    for (let name of collections) {
      counts[name] = await mongoose.connection.db
        .collection(name)
        .countDocuments();
    }
    res.json({ counts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/collections", (req, res) => {
  res.json({ collections });
});

app.get("/api/collection/:name", async (req, res) => {
  const { name } = req.params;
  if (!collections.includes(name)) {
    return res.status(400).json({ error: "Invalid collection" });
  }
  try {
    let docs = await mongoose.connection.db
      .collection(name)
      .find({})
      .toArray();
    docs = docs.map(d => ({
      _id: d._id,
      word: d.word,
      markup: d.sigml || d.string || ""
    }));
    res.json({ docs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ─── FORGOT PASSWORD ─────────────────────────────────────────────────
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not found" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: "soniayushi880@gmail.com",
        pass: "cjmnvhusysgyvfgc",
      },
    });

    await transporter.sendMail({
      from: "soniayushi880@gmail.com",
      to: user.email,
      subject: "Password Recovery",
      text: `Hello ${user.name},\n\nYour password is: ${user.password}\n\nKeep it safe.`,
    });

    res.json({ message: "Password sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// 1️⃣ Define a "dictionary" collection for Data Management
const dictionarySchema = new mongoose.Schema({
  word:         String,            // Gujarati
  meaning:      String,            // English meaning
  category:     String,            // e.g. "daily", "education", etc.
  updatedAt:    { type: Date, default: Date.now },
}, { collection: "dictionary" });

const Dictionary = mongoose.model("Dictionary", dictionarySchema);

// 2️⃣ Expose GET /api/words
// ─── GET /api/words ────────────────────────────────────────────────
// flatten all your word‑based collections into one array
app.get("/api/words", async (req, res) => {
  try {
    // skip these, since they’re not “words” you want in Data Review
    const exclude = new Set(["users", "kakko_and_barakhadi", "swar"]);
    const allWords = [];

    for (let name of collections) {
      if (exclude.has(name)) continue;
      // fetch every doc in this collection
      const docs = await mongoose.connection.db
        .collection(name)
        .find({})
        .toArray();
      docs.forEach(doc => {
        allWords.push({
          word:      doc.word,
          category:  name,
          updatedAt: doc.updatedAt || doc._id.getTimestamp()
        });
      });
    }

    // sort most‑recent first
    allWords.sort((a, b) => b.updatedAt - a.updatedAt);

    res.json({ words: allWords });
  } catch (err) {
    console.error("Error in /api/words:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ─── STATIC FILES & INDEX ────────────────────────────────────────────
app.use(express.static(path.join(__dirname)));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ─── START SERVER ───────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Listening on http://localhost:${PORT}`);
});
// near the bottom of server.js
app.use(express.static(path.join(__dirname)));
