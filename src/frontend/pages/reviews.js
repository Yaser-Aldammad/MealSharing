window.handleReviewsRequest = (params) => {
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
			  <li><a href="/meals">Meals</a></li>
			  <li class="active"><a href="/reviews">Reviews</a></li>

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
			<p> Here you can add review and see others</p>
		</div>	<!-- End of /.col-md-4 -->
		</div> <!-- End of row -->
		</div> <!-- End of container-->
		</section> <!-- Endo of section-->

		<!-- reviw meals
 ================================================== -->
 <section id="features">
 <div class="container">
 <div class="row">
  
   <div class="reservations"></div>



 
   </div> <!-- end of row -->
 </div> <!-- end of container -->
</section> <!-- end of section -->
<br>
<br>




  
  `;

  function fetchUrls(url) {
    return fetch(url).then((res) => res.json());
  }

  Promise.all([fetchUrls("/api/meals"), fetchUrls("/api/reservations")]).then(
    (data) => {
      let meals = data[0];
      let reservations = data[1];
      const map = meals.map((meal) => {
        const ul = document.querySelector(".reservations");
        reservations.filter((reservation) => {
          if (meal.id === reservation.meal_id) {
            const li = document.createElement("div");
            li.classList.add("col-lg-4");
            li.classList.add("col-md-6");
            li.classList.add("col-sm-12");
            let x = Math.floor(Math.random() * 10 + 1);

            li.innerHTML = `<img src= "food-code/images/product-image-${x}.jpg" class="mealImages" />

		<h3>one <strong> ${meal.title}</strong></h3>
		<h3>for ${reservation.contact_name}</h3>
		`;
            ul.appendChild(li);
          }
        });
      });
    }
  );

  // if any links are added to the dom, use this function
  // make the router handle those links.
  router.updatePageLinks();
};
