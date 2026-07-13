const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { upload } = require("../config/cloudinary");
const auth = require("../middleware/auth.middleware");

const prisma = new PrismaClient();

// GET all fish (public)
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const fish = await prisma.fish.findMany({
      where: category ? { category } : {},
      orderBy: { createdAt: "desc" },
    });
    res.json(fish);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single fish (public)
router.get("/:id", async (req, res) => {
  try {
    const fish = await prisma.fish.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!fish) return res.status(404).json({ error: "Not found" });
    res.json(fish);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add fish (admin)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { name, category, cycle, note, inStock, temp, ph, tank, diet, lifespan, tankMates } = req.body;
    const fish = await prisma.fish.create({
      data: {
        name, category,
        cycle:     cycle     || "",
        note:      note      || "",
        imageUrl:  req.file.path,
        inStock:   inStock === "true",
        temp:      temp      || "",
        ph:        ph        || "",
        tank:      tank      || "",
        diet:      diet      || "",
        lifespan:  lifespan  || "",
        tankMates: tankMates || "",
      },
    });
    res.status(201).json(fish);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update fish (admin)
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const { name, category, cycle, note, inStock, temp, ph, tank, diet, lifespan, tankMates } = req.body;
    const fish = await prisma.fish.update({
      where: { id: Number(req.params.id) },
      data: {
        name, category,
        cycle:     cycle     || "",
        note:      note      || "",
        inStock:   inStock === "true",
        temp:      temp      || "",
        ph:        ph        || "",
        tank:      tank      || "",
        diet:      diet      || "",
        lifespan:  lifespan  || "",
        tankMates: tankMates || "",
        ...(req.file && { imageUrl: req.file.path }),
      },
    });
    res.json(fish);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE fish (admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    await prisma.fish.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;