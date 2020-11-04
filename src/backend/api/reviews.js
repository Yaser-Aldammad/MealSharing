const express = require("express");
const knex = require("../database");
const router = express.Router();

const postReview = async ({ body }) => {
  const { title, description, meal_id, stars, created_date } = body;
  return await knex("review").insert({
    title,
    description,
    meal_id,
    stars,
    created_date,
  });
};
router.post("/", async (request, response) => {
  postReview({
    body: request.body,
  })
    .then((result) => response.json(result))
    .catch((error) => {
      response.status(400).send("Bad request").end();
      console.log(error);
    });
});
router.get("/", async (request, response) => {
  try {
    const allReviews = await knex("review").select("*");
    response.json(allReviews);
  } catch (error) {
    throw error;
  }
});
const getReviewById = async ({ body, id }) => {
  try {
    const { title, description, meal_id, stars, created_date } = body;
    return await knex("review").where({ id: id }).select("*");
  } catch (error) {
    throw error;
    console.log("insert the correct ID");
  }
};

router.post("/:id", async (request, response) => {
  getReviewById({
    body: request.body,
  })
    .then((data) => response.json(data))
    .catch((error) => {
      response.status(400).send("Bad request").end();
      console.log(error);
    });
});
router.put("/:id", async (request, response) => {
  getReviewById({
    body: request.body,
    id: request.params.id,
  })
    .then((result) => response.json(result))
    .catch((error) => {
      response.status(400).send("bad request").end();
      console.log("error");
    });
});
const updateReview = async ({ body, id }) => {
  const { title, description, meal_id, stars, created_date } = body;
  const review = await knex("review").where("id: id").select("*");
  if (review.length === 0) {
    throw new httperror("bad request", "meal not found: ID ${id}!", 404);
  }
  const queryupdate = ({
    title: title,
    description: description,
    meal_id: meal_id,
    stars: stars,
    created_date: created_date,
  } = body);

  if (Object.keys(queryupdate).length !== 0) {
    return await knex("review").where({ id: id }).update(queryupdate);
  } else return "nothing was updated!";
};
const deletReview = async ({ id }) => {
  try {
    if (!id) {
      return "you have to write the correct ID, try again";
    }
    return knex("review").where({ id: id }).del();
  } catch (error) {
    return "Something went wrong, try again";
  }
};
router.get("/:id", async (req, res) => {
  getReviewById({
    body: req.body,
    id: req.params.id,
  })
    .then((result) => res.json(result))
    .catch((error) => {
      response.status(400).send("Bad request").end();
      console.log("inset the correct ID");
    });
});

router.delete("/:id", async (req, res) => {
  deleteReview({
    id: req.params.id,
  })
    .then((result) => res.json(result))
    .catch((error) => {
      res.status(400).send("Bad request").end();
      console.log(error);
    });
});

module.exports = router;
