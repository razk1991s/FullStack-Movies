const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  MemberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  Movies: [
    {
      movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
      date: { type: Date }
    }
  ]
});

module.exports = mongoose.model('Subscription', subscriptionSchema);