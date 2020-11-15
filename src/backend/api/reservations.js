const express = require("express");
const knex = require("../database");
const router = express.Router();

// add new reservation
const addReservation = async ({ body }) => {
  const {
    number_of_guests,
    meal_id,
    contact_phonenumber,
    contact_name,
    contact_email,
    created_date,
  } = body;
  try {
    return await knex("reservation").insert({
      number_of_guests,
      meal_id,
      contact_phonenumber,
      contact_name,
      contact_email,
      created_date,
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
};
router.post("/", async (request, response) => {
  addReservation({
    body: request.body,
  })
    .then((result) => response.json(result))
    .catch((error) => {
      response.status(400).send("Bad request").end();
      console.log(error);
    });
});

// get all reservations
router.get("/", async (request, response) => {
  try {
    const allReservations = await knex("reservation").select("*");
    response.json(allReservations);
  } catch (error) {
    throw error;
  }
});

// get reservation by id
const getReservationById = async ({ body, id }) => {
  try {
    const {
      number_of_guests,
      meal_id,
      contact_phonenumber,
      contact_name,
      contact_email,
      created_date,
    } = body;
    return await knex("reservation").where({ id: id }).select("*");
  } catch (error) {
    console.log(error);
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

// update reservation
router.put("/:id", async (request, response) => {
  getEditReservation({
    body: request.body,
    id: request.params.id,
  })
    .then((result) => {
      console.log(result);
      return response.json(result);
    })
    .catch((error) => {
      response.status(400).send("bad request").end();
      console.log(error);
    });
});

const getEditReservation = async ({ body, id }) => {
  const {
    number_of_guests,
    meal_id,
    contact_phonenumber,
    contact_name,
    contact_email,
    created_date,
  } = body;
  const reservation = await knex
    .from("reservation")
    .where({ id: id })
    .select("*");
  if (reservation.length === 0) {
    throw new HttpError("bad request", `meal not found: ID ${id}!`, 404);
  }
  const queryUpdate = {
    number_of_guests: number_of_guests,
    meal_id: meal_id,
    contact_phonenumber: contact_phonenumber,
    contact_name: contact_name,
    contact_email: contact_email,
    created_date: created_date,
  };
  if (Object.keys(queryUpdate).length !== 0) {
    return await knex("reservation").where({ id: id }).update(queryUpdate);
  } else return "nothing was updated!";
};

const deleteReservation = async ({ id }) => {
  try {
    if (!id) {
      return "you have to write the right ID, try again";
    }
    return knex("reservation").where({ id: id }).del();
  } catch (error) {
    return "Something went wrong, try again";
  }
};

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
