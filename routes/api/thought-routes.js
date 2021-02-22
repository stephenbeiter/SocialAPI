const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  createThought,
  deleteThought,
  deleteAllThoughts,
  updateThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

router.route('/')
  .get(getAllThought)
  .post(createThought)
  .delete(deleteAllThoughts);

router.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);


router.route('/:thoughtId/reactions')
  .post(addReaction)
  .delete(removeReaction);

module.exports = router;