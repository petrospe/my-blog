const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', (req, res) => {
    Post.find((err, posts) => {
      if (err) return console.error(err);
      res.json(posts);
    });
  });

router.post('/', (req, res) => {
    const post = new Post(req.body);
    post.save((err, post) => {
        if (err) return console.error(err);
        res.json(post);
    });
});

router.get('/:id', (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) return console.error(err);
        res.json(post);
    });
});

router.put('/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, post) => {
      if (err) return console.error(err);
      res.json(post);
    });
});

router.delete('/:id', (req, res) => {
    Post.findByIdAndDelete(req.params.id, (err, post) => {
      if (err) return console.error(err);
      res.json(post);
    });
});

module.exports = router;
