const router  = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { upload } = require("../config/cloudinary");
const auth    = require("../middleware/auth.middleware");
const prisma  = new PrismaClient();

// GET active banners (public)
router.get("/", async (req, res) => {
  try {
    const banners = await prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(banners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all banners including hidden (admin only)
router.get("/all", auth, async (req, res) => {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(banners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add banner (admin only)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, subtitle, isActive } = req.body;
    const banner = await prisma.banner.create({
      data: {
        title,
        subtitle,
        imageUrl: req.file.path,
        isActive: isActive === "true",
      },
    });
    res.status(201).json(banner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update banner (admin only)
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, subtitle, isActive } = req.body;
    const banner = await prisma.banner.update({
      where: { id: Number(req.params.id) },
      data: {
        title,
        subtitle,
        isActive: isActive === "true",
        ...(req.file && { imageUrl: req.file.path }),
      },
    });
    res.json(banner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE banner (admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    await prisma.banner.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;