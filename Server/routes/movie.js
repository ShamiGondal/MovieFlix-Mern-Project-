const mongoose = require('mongoose');
const express = require('express');
const Movie = require('../model/movie');
const multer = require('multer');
const moment = require('moment'); 
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

//.end point to fetch the rooms
router.get('/fetchMovies', async (req, res) => {

  try {

    const allMovies = await Movie.find()
    res.json(allMovies)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }

})


//end point to fetch the rooms with id
router.get('/fetchMoive/:id', async (req, res) => {
  const id = req.params.id
  console.log(id)
  try {

    const singleMovie = await Movie.findOne({ _id: id });
    res.json(singleMovie)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }

})


//end point to add the room

router.post('/addMovie', upload.single('picture'), async (req, res) => {

  try {

    const { picture, name, description, Rtype, comments, likes, price,rating } = req.body;
    const newMovie = new Movie({ picture, name, description, Rtype, comments, likes, price ,rating});
    const savedMovie = await newMovie.save()
    res.json(savedMovie)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred +backend");
  }

});


//end point to like the room
router.post('/likes/:id', async (req, res) => {
  const movieID = req.params.id.replace(/["']/g, '');

  try {
    const movie = await Movie.findById(movieID);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    if (movie.likes === undefined) {
      return res.status(500).json({ success: false, message: 'Likes property not found in the Movie' });
    }
    movie.likes += 1;
    await movie.save();
    res.json({ success: true, message: 'Like increased successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

//end point to comment on room
router.post('/comments/:id', [], async (req, res) => {
  try {
    const id = req.params.id;

    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    if (movie.comments === undefined) {
      return res.status(500).json({ success: false, message: 'comment property not found in the Movie' });
    }

    const { comment } = req.body;

    movie.comments.push(comment);

    // Save the updated movie document
    await movie.save();

    res.json({ success: true, message: 'Comment added successfully', movie });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});



//end point to delete the reservation
router.delete('/deleteMovie/:id', async (req, res) => {
  const movieId = req.params.id.replace(/["']/g, '');

  try {
    const movie = await Movie.findByIdAndDelete(movieId);

    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }

    res.json({ success: true, message: 'Movie deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;