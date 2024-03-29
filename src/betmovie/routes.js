const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.post("/signup", controller.signup);
router.post("/login", controller.login);

router.get("/", controller.getUser);
router.get("/kino", controller.getMovies);
router.get("/quiz", controller.getQuiz);
router.get("/review", controller.getReviews);

router.post("/", controller.addUser);
router.post("/kino", controller.addMovie);
router.post("/review", controller.addReview);

router.get("/:id", controller.getUserByID);
router.get("/kino/:id", controller.getMovieByID);
router.get("/review/:id", controller.getReviewByID);

router.delete("/:id", controller.deleteUser);
router.delete("/kino/:id", controller.deleteMovie);
router.delete("/review/:id", controller.deleteReview);

router.put("/:id", controller.updateUser);
router.put("/kino/:id", controller.updateMovie);
router.put("/review/:id", controller.updateReview);

// router.get("/kino/:movie_id/review", controller.getReviewByMovieID);

module.exports = router; 