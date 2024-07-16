const { Schema, model } = require('mongoose');

const ratingSchema = new Schema({
  value: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  clubId: {
    type: Schema.Types.ObjectId,
    ref: 'Club',
    required: true,
  },
  bookId: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  }
});

const Rating = model('Rating', ratingSchema);

module.exports = Rating;
