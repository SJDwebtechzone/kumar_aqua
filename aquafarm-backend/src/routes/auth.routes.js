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
router.post("/reset-password", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await prisma.admin.findFirst();
    if (!admin) {
      const hashed = await bcrypt.hash(password, 10);
      await prisma.admin.create({
        data: { email, password: hashed }
      });
      return res.json({ message: "Admin credentials initialized" });
    }

    const updateData = {};
    if (email) updateData.email = email;
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updateData.password = hashed;
    }

    await prisma.admin.update({
      where: { id: admin.id },
      data: updateData,
    });

    res.json({ message: "Credentials updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const authMiddleware = require("../middleware/auth.middleware");

router.post("/change-credentials", authMiddleware, async (req, res) => {
  try {
    const { newEmail, newPassword } = req.body;
    const adminId = req.admin.id;

    const admin = await prisma.admin.findUnique({ where: { id: adminId } });
    if (!admin) return res.status(404).json({ error: "Admin account not found" });

    const updateData = {};
    if (newEmail && newEmail !== admin.email) {
      const exists = await prisma.admin.findUnique({ where: { email: newEmail } });
      if (exists) return res.status(400).json({ error: "Username (email) already in use" });
      updateData.email = newEmail;
    }

    if (newPassword) {
      const hashed = await bcrypt.hash(newPassword, 10);
      updateData.password = hashed;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No changes specified" });
    }

    const updated = await prisma.admin.update({
      where: { id: adminId },
      data: updateData,
    });

    res.json({ message: "Credentials updated successfully", email: updated.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;