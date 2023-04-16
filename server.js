const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/my-blog', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB database connection established successfully');
});

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model('Post', postSchema);

app.get('/api/posts', (req, res) => {
  Post.find()
  .then(posts => res.json(posts))
  .catch(err => console.log(err));
});

app.post('/api/posts', (req, res) => {
  const post = new Post({
    title: req.title,
    content: req.content
  });
  post.save()
    .then(() => {
      console.log('Post saved successfully');
      res.status(200).json(post);
    })
    .catch((error) => {
      console.error('Error saving post: ', error);
      res.status(500).json({ error: 'Error saving post' });
    });
});

app.get('/api/posts/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.put('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  const updatedPost = {
    title: req.body.title,
    content: req.body.content
  };
  Post.findByIdAndUpdate(id, updatedPost, { new: true })
    .then(post => res.json(post))
    .catch(err => console.log(err));
});

app.delete('/api/posts/:id', (req, res) => {
  Post.findByIdAndDelete(req.params.id, (err, post) => {
    if (err) return console.error(err);
    res.json(post);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
