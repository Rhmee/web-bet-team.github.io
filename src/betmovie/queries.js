const getUsers = 'SELECT * FROM "Users"';
const getUserByID = 'SELECT * FROM "Users" WHERE user_id = $1';
const deleteUser = 'DELETE FROM "Users" WHERE user_id = $1';
const updateUser = 'UPDATE "Users" SET username = $1 WHERE user_id = $2';
const getUserByPhoneNumber = 'SELECT * FROM "Users" WHERE phone_number = $1';

const getMovies = 'SELECT * FROM "Movies"';
const getMovieByID = 'SELECT * FROM "Movies" WHERE id = $1';
const getQuizs = 'SELECT * FROM "Quiz"';
const addMovie = 'INSERT INTO "Movies" (name, rate, likes, genre, PG, summary, duration, date, director, producer, actors, views, poster) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id';
const deleteMovie = 'DELETE FROM "Movies" WHERE id = $1';
const updateMovie = 'UPDATE "Movies" SET views = $1, rate = $2 WHERE id = $3';

const getReviews = 'SELECT * FROM "Reviews";';
const getReviewByID = 'SELECT * FROM "Reviews" WHERE review_id = $1;';
const addReview = 'INSERT INTO "Reviews" (user_id, movie_id, review, reviewed_date, rate) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
const deleteReview = 'DELETE FROM "Reviews" WHERE review_id = $1;';
const updateReview = 'UPDATE "Reviews" SET review = $1, reviewed_date = $2, rate = $3 WHERE review_id = $4 RETURNING *;';
const getReviewsByMovieID = 'SELECT * FROM "Reviews" WHERE movie_id = $1;'


const login = 'SELECT * FROM "Users" WHERE phone_number = $1 AND password = $2';

const signup = 'INSERT INTO "Users" (username, phone_number, password) VALUES ($1, $2, $3) RETURNING user_id';


module.exports = {
  getUsers, getUserByID, deleteUser, updateUser, getUserByPhoneNumber,
  getMovies, getMovieByID, getQuizs, addMovie, deleteMovie, updateMovie,
  getReviews, getReviewByID, addReview, deleteReview, updateReview,
  login, signup, getReviewsByMovieID
};