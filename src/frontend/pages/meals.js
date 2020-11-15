window.handleMealsRequest = () => {
  document.body.innerHTML = `
  <!-- LOGO Start
  ================================================== -->
  
  <header>
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<a href="#">
					<img src="/food-code/images/logo.png" alt="logo">
				</a>
			</div>	<!-- End of /.col-md-12 -->
		</div>	<!-- End of /.row -->
	</div>	<!-- End of /.container -->
</header>  <!-- End of /Header -->

<!-- MENU Start
================================================== -->
<nav class="navbar navbar-default">
	<div class="container">
		<div class="navbar-header">
		  <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
			<span class="sr-only">Toggle navigation</span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
		  </button>
		</div> <!-- End of /.navbar-header -->

		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			  <ul class="nav navbar-nav nav-main">

			  <li><a href="/">Home</a></li>
			  <li class="active"><a href="/meals">Meals</a></li>
        <li><a href="/reviews">Reviews</a></li>

				<li class="dropdown">
					<a href="#">
						Utilities
						<span class="caret"></span>
					</a>
					<ul class="dropdown-menu">
					   <li><a  href="#">Add Meal</a></li>
						<li><a  href="#">About</a></li>
						<li><a  href="#">Contact</a></li>
						<li><a  href="#">Related links</a></li>
					</ul>
				</li> <!-- End of /.dropdown -->

				
			</ul> <!-- End of /.nav-main -->
		</div>	<!-- /.navbar-collapse -->
	</div>	<!-- /.container-fluid -->
</nav>	<!-- End of /.nav --> 




<section id="topic-header">
<div class="container">
	<div class="row">
		<div class="col-md-4">
			<h1>Shop</h1>
			<p>A Bunch Of Products</p>
		</div>	<!-- End of /.col-md-4 -->
		
		<!-- Search field
		================================================== -->

		<div class="col-md-8 hidden-xs">
		<form class="search-meal" action="action_page.php" >
		<label>Search in meals: </label>
		<input type="text" placeholder="Search for a meal" name="search" id="search-meal" >
		</form> <!-- end of form -->
		</div>	<!-- End of /.col-md-8 -->
		</div>	<!-- End of /.row -->
</div>	<!-- End of /.container -->
</section>	<!-- End of /#Topic-header -->



<!-- meals
================================================== -->
<section id="features">
  <div class="container">
  <div class="row">
  <div class="allMeals">
    </div>  


  
    </div> <!-- end of row -->
  </div> <!-- end of container -->
</section> <!-- end of section -->
<br>
<br>






  `;

  const ul = document.querySelector(".allMeals");
  let mealTitle = document.getElementById("search-meal");
  let meal = [];

  mealTitle.addEventListener("keyup", (e) => {
    let mealTitleInput = e.target.value.toLowerCase();
    const filteredMeals = meal.filter((meal) => {
      return meal.title.toLowerCase().includes(mealTitleInput);
    });
    ul.innerHTML = " ";
    displayAllMeals(filteredMeals);
  });

  const loadMeals = async () => {
    try {
      const res = await fetch("/api/meals");
      meal = await res.json();
      displayAllMeals(meal);
    } catch {
      console.log("error");
    }
  };

  function displayAllMeals(meals) {
    meals.map((meal) => {
      const li = document.createElement("div");
      li.classList.add("col-lg-4");
      li.classList.add("col-md-6");
      li.classList.add("col-sm-12");

      let x = Math.floor(Math.random() * 10 + 1);
      li.innerHTML = `<img src= "food-code/images/product-image-${x}.jpg" class="mealImages" />
      <div class="text">
       <h3>${meal.title}</h3>
       <p>${meal.description}</p>
      <h3>${meal.price} DKK</h3>
      </div>
        <button class="w3-button  w3-black w3-margin-bottom w3-margin-left order"  data-id ='${meal.id}' >
  Order</button>
  <button class="w3-button  w3-blue w3-margin-bottom w3-margin-left "  >
  <a href="/reviews/${meal.id}">Rating</a></button>
 </div>
`;
      ul.appendChild(li);

      const reservBtn = document.getElementsByClassName("order");
      for (let i = 0; i < reservBtn.length; i++) {
        reservBtn[i].addEventListener("click", async () => {
          console.log(reservBtn[i].getAttribute("data-id"));

          try {
            await fetch("/api/meals?availableReservations=true")
              .then((response) => response.json())
              .then((meals) => {
                const mealAvailable = meals.find((availableMeal) => {
                  console.log(meal.id);
                  return (
                    availableMeal.id == reservBtn[i].getAttribute("data-id")
                  );
                });
                if (mealAvailable) {
                  window.location.href = `/meal/${reservBtn[i].getAttribute(
                    "data-id"
                  )}`;
                } else {
                  alert("sorry ! , this meal is not available to reserve ");
                }
              });
          } catch (err) {
            console.log(err);
          }
        });
      }
    });
  }

  loadMeals();

  router.updatePageLinks();
};
