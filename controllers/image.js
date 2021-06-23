const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai. 
const app = new Clarifai.App({
 apiKey: '7958a711ff2a47368fa861ab3de48bae' 
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entires', 1)
  .returning('entires')
  .then(entires => {
    res.json(entires[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}