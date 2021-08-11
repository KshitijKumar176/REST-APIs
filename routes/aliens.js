const express = require("express");
const Alien = require("../models/alien");
const router = express.Router();

//Getting All
router.get("/", async (req, res) => {
  try {
    const aliens = await Alien.find();
    res.json(aliens);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Getting one
router.get("/:id", getAlien, async (req, res) => {
  res.json(res.alien);
});

//Create One
router.post("/", async (req, res) => {
  const alien = new Alien({
    name: req.body.name,
    tech: req.body.tech,
    sub: req.body.sub,
  });
  try {
    const a1 = await alien.save();
    res.status(201).json(a1);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Updating One
router.patch("/:id", getAlien, async (req, res) => {
  if (req.body.name != null) {
    res.alien.name = req.body.name;
  }
  if (req.body.sub != null) {
    res.alien.sub = req.body.sub;
  }
  try {
    const alien = await Alien.findById(req.params.id);
    const a1 = await alien.save();
    res.json(a1);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Deleting One

router.delete("/:id", getAlien, async (req, res) => {
  try {
    res.alien.remove();
    res.json({ message: "succesfully deleted" });
  } catch (err) {
    res.status(500).json({ message: err.mesaage });
  }
});

async function getAlien(req, res, next) {
  let alien;
  try {
    alien = await Alien.findById(req.params.id);
    if (alien == null) {
      return res.status(404).json({ message: "cannot find alien" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.alien = alien;
  next();
}

module.exports = router;
