const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

router.route('/')
  .get(getAllThought)
  .post(createThought);

router.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);


router.route('/:thoughtId/reactions')
  .post(addReaction)
  .delete(removeReaction);

module.exports = router;