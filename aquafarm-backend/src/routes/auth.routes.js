const router  = require("express").Router();
const bcrypt  = require("bcrypt");
const jwt     = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma  = new PrismaClient();

// Register first admin
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await prisma.admin.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ error: "Admin already exists" });
    const hashed = await bcrypt.hash(password, 10);
    const admin  = await prisma.admin.create({ data: { email, password: hashed } });
    res.status(201).json({ id: admin.id, email: admin.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) return res.status(401).json({ error: "Invalid credentials" });
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;