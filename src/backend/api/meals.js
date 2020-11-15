const { request } = require("express");
const express = require("express");
const { count } = require("../database");
const router = express.Router();
const knex = require("../database");

// posting a new meal
router.post("/", async (request, response) => {
  creatNewMeal({
    body: request.body,
  })
    .then((result) => response.json(result))
    .catch((error) => {
      response.status(400).send("Bad request");
      console.log(error);
    });
});

const creatNewMeal = async ({ body }) => {
  const {
    title,
    description,
    when,
    maxNumberOfGuests,
    price,
    created_date,
  } = body;
  return await knex("meal").insert({
    title: title,
    description: description,
    when: when,
    maxNumberOfGuests: maxNumberOfGuests,
    price: price,
    created_date: created_date,
  });
};
// get meal by ID
const getMealById = async ({ id, body }) => {
  try {
    const { title, description, maxNumberOfGuests, created_date, price } = body;
    return await knex("meal")
      .where({
        id: id,
      })
      .select("*");
  } catch (error) {
    console.log("insert a Meal Id");
  }
};
router.get("/:id", async (request, response) => {
  getMealById({
    body: request.body,
    id: request.params.id,
  })
    .then((result) => response.json(result))
    .catch((error) => {
      response.status(400).send("Bad request").end();
      console.log(error);
    });
});

// update meal details
const getUpdatedMeal = async ({ body, id }) => {
  const { title, description, maxNumberOfGuests, created_date, price } = body;
  const meal = await knex.from("meal").select("*").where({
    id: id,
  });
  if (meal.length === 0) {
    throw new HttpError("write meal id", `Contact not found: ID ${id}!`, 404);
  }
  const queryDto = {
    price: price,
    title: title,
    description: description,
    maxNumberOfGuests: maxNumberOfGuests,
    created_date: created_date,
  };
  if (Object.keys(queryDto).length !== 0) {
    return await knex("meal")
      .where({
        id: id,
      })
      .update(queryDto);
  } else return "Nothing updated!";
};
router.put("/:id", async (request, response) => {
  getUpdatedMeal({
    body: request.body,
    id: request.params.id,
  })
    .then((result) => res.json(result))
    .catch((error) => {
      response.status(400).send("Bad request").end();
      console.log(error);
    });
});

// Delete a meal
const deleteMeal = async ({ id }) => {
  try {
    if (!id) {
      return "something went wrong, try again";
    }
    return knex("meal")
      .where({
        id: id,
      })
      .del();
  } catch (err) {
    console.log(err);
    return "something went wrong, try again";
  }
};
router.delete("/:id", async (req, res) => {
  deleteMeal({
    id: req.params.id,
  })
    .then((result) => res.json(result))
    .catch((error) => {
      res.status(400).send("Bad request").end();
      console.log(error);
    });
});

///// max price
const getMaxPrice = async (maxPrice) => {
  try {
    return await knex("meal").select("*").where("price", "<", maxPrice);
  } catch (error) {
    console.log(error);
  }
};

////// title
const getTitle = async (title) => {
  try {
    return await knex("meal").select("*").where("title", "like", `%${title}%`);
  } catch (error) {
    console.log(error);
  }
};

// ////createdAfter
const getCreatedAfter = async (createdAfter) => {
  try {
    return await knex("meal")
      .select("*")
      .where("created_date", ">", createdAfter);
  } catch (error) {
    console.log(error);
  }
};

////limit
const getLimit = async (limit) => {
  try {
    return await knex("meal").select("*").limit(limit);
  } catch (error) {
    console.log(error);
  }
};

///availableReservations
const getAvailableReservations = async (availableReservations) => {
  if (availableReservations === "true") {
    try {
      return await knex("meal")
        .select("meal.*")
        .count("reservation.id as number_of_guests")
        .leftJoin("reservation", "meal.id", "=", "reservation.meal_id")
        .groupBy("meal.id")
        .having(knex.raw("meal.maxNumberOFGuests > number_of_guests"));
    } catch (error) {
      console.log(error);
    }
  } else {
    response.status(400).send("Bad request").end();
  }
};

router.get("/", async (request, response) => {
  if (request.query.maxPrice) {
    getMaxPrice(request.query.maxPrice)
      .then((result) => response.json(result))
      .catch((ex) => {
        response.status(400).send("Bad request").end();
        console.log(ex);
      });
  } else if (request.query.title) {
    getTitle(request.query.title)
      .then((result) => response.json(result))
      .catch((ex) => {
        response.status(400).send("Bad request").end();
        console.log(ex);
      });
  } else if (request.query.createdAfter) {
    getCreatedAfter(request.query.createdAfter)
      .then((result) => response.json(result))
      .catch((ex) => {
        response.status(400).send("Bad request").end();
        console.log(ex);
      });
  } else if (request.query.limit) {
    getLimit(request.query.limit)
      .then((result) => response.json(result))
      .catch((ex) => {
        response.status(400).send("Bad request").end();
        console.log(ex);
      });
  } else if (request.query.availableReservations) {
    getAvailableReservations(request.query.availableReservations)
      .then((result) => response.json(result))
      .catch((ex) => {
        response.status(400).send("Bad request").end();
        console.log(ex);
      });
  } else {
    try {
      const allMEALS = await knex("meal").select("*");
      response.json(allMEALS);
    } catch (error) {
      throw error;
    }
  }
});
//exports

module.exports = router;
