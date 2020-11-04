const express = require("express");
const knex = require("../database");
const router = express.Router();

const postReservation = async ({ body }) => {
  const {
    number_of_guests,
    meal_id,
    contact_phonenumber,
    contact_name,
    contact_email,
  } = body;
  return await knex("reservation").insert({
    number_of_guests,
    meal_id,
    contact_phonenumber,
    contact_name,
    contact_email,
  });
};
router.post("/", async (request, response) => {
  postReservation({
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
    const allReservations = await knex("reservation").select("*");
    response.json(allReservations);
  } catch (error) {
    throw error;
  }
});
const getReservationById = async ({ body, id }) => {
  try {
    const {
      number_of_guests,
      meal_id,
      contact_phonenumber,
      contact_name,
      contact_email,
    } = body;
    return await knex("reservation").where({ id: id }).select("*");
  } catch (error) {
    throw error;
    console.log(error);
  }
};

router.post("/:id", async (request, response) => {
  getReservationById({
    body: request.body,
  })
    .then((data) => response.json(data))
    .catch((error) => {
      response.status(400).send("Bad request").end();
      console.log(error);
    });
});
router.put("/:id", async (request, response) => {
  getReservationById({
    body: request.body,
    id: request.params.id,
  })
    .then((result) => response.json(result))
    .catch((error) => {
      response.status(400).send("bad request").end();
      console.log("error");
    });
});
const updateReservation = async ({ body, id }) => {
  const {
    number_of_guests,
    meal_id,
    contact_phonenumber,
    contact_name,
    contact_email,
  } = body;
  const reservation = await knex("reservation").where("id: id").select("*");
  if (reservation.length === 0) {
    throw new httperror("bad request", "meal not found: ID ${id}!", 404);
  }
  const queryupdate = ({
    number_of_guests: number_of_guests,
    meal_id: meal_id,
    contact_phonenumber: contact_phonenumber,
    contact_name: contact_name,
    contact_email: contact_email,
  } = body);
  if (Object.keys(queryupdate).length !== 0) {
    return await knex("reservation").where({ id: id }).update(queryupdate);
  } else return "nothing was updated!";
};
const deletReservation = async ({ id }) => {
  try {
    if (!id) {
      return "you have to write the right ID, try again";
    }
    return knex("reservation").where({ id: id }).del();
  } catch (error) {
    return "Something went wrong, try again";
  }
};

router.get("/:id", async (req, res) => {
  getReservationById({
    body: req.body,
    id: req.params.id,
  })
    .then((result) => res.json(result))
    .catch((error) => {
      response.status(400).send("Bad request").end();
      console.log(error);
    });
});

router.delete("/:id", async (req, res) => {
  deleteReservation({
    id: req.params.id,
  })
    .then((result) => res.json(result))
    .catch((error) => {
      res.status(400).send("Bad request").end();
      console.log(error);
    });
});

module.exports = router;
