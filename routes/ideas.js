const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

const ideas = [
  {
    id: 1,
    text: 'Positive Newsletter, a newsletter that only shares positive, uplifting news',
    tag: 'Technology',
    username: 'TonyStark',
    date: '2022-01-02',
  },
  {
    id: 2,
    text: 'Milk cartons that turn a different color the older your milk is getting',
    tag: 'Inventions',
    username: 'SteveRogers',
    date: '2022-01-02',
  },
  {
    id: 3,
    text: 'ATM location app which lets you know where the closest ATM is and if it is in service',
    tag: 'Software',
    username: 'BruceBanner',
    date: '2022-01-02',
  },
];

// Get all ideas
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find({});
    res.json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Smoething went wrong' });
  }
});

// Get single idea
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findOne({ _id: req.params.id });

    if (!idea) {
      res.status(404).json({ success: false, message: 'Resource not found' });
    }
    res.json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

// Add an idea
router.post('/', async (req, res) => {
  const { text, tag, username } = req.body;
  const idea = new Idea({
    text,
    tag,
    username,
  });
  try {
    const savedIdea = await idea.save();
    res.status(201).json({ success: true, data: savedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Smoething went wrong' });
  }
});

// Update idea
router.put('/:id', async (req, res) => {
  try {
    const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
          tag: req.body.tag,
        },
      },
      { new: true }
    );
    res.json({ success: true, data: updatedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Smoething went wrong' });
  }
});

// Delete idea
router.delete('/:id', async (req, res) => {
  try {
    await Idea.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Smoething went wrong' });
  }
});

module.exports = router;
