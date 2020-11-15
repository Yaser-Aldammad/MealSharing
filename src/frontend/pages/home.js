window.handleHomeRequest = () => {
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

			  <li class="active"><a href="/">Home</a></li>
			  <li><a href="/meals">Meals</a></li>
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




  <!-- SLIDER Start
  ================================================== -->

  <section id="slider-area">
	  <div class="container">
		  <div class="row">
			  <div class="col-md-12">
				  <div id="slider" class="nivoSlider">
					  <img src="food-code/images/slider.jpg" alt="" />
					  <img src="food-code/images/slider1.jpg" alt=""/>
					  <img src="food-code/images/slider2.jpg" alt="" />
				  </div>	<!-- End of /.nivoslider -->
			  </div>	<!-- End of /.col-md-12 -->
		  </div>	<!-- End of /.row -->
	  </div>	<!-- End of /.container -->
  </section> <!-- End of Section -->
 
  
	<!-- FEATURES Start
    ================================================== -->

	<!-- introductory part & Add meal -->
	<section id="features">
	<div class="container">
				<div class="block" style="font-size:18px">
			The website is a demo of practicing the outcomes of Node.js module at
			<a href="https://www.hackyourfuture.dk/" target="_blank">HackYourFuture coding school</a>. Node.js is 5 week Module focusing on creating fullstack application in Node.js. In other words, we have to create and connect both the backend API and frontend HTML, CSS and Javascript. Though there are so many backend languages such as Java, C++, Python, Ruby and PHP, the school chose Node.js over the other languages for 2 reason:<br>
			1. Students are already know Javascript, so it is easier to get started than other languages.<br>
			2. Node.js is great for making web APIs because it is asynchronous by nature and thus allows for high input/output. It allows many users to make very light requests at the same time.
			<br>
			This Demo is divided into 3 sections: Front-End, Back-End & Databases. The Front-End covers the material that we come through in the first 3 modules: HTML, CSS and Javscript. In Contrast, the Back-End deals with webserver, Express, Databases connection and API. Finally, the Databases module with MySQL reveals the secrets of retrieving Data, Data models, relationships and schemas. Not to forget the security and non-relational databases.<br>
			In the end, the home page introduces the ends of the demo and shows how users can interact and add values to the website by adding new meal which they would love to share with others by filling the following form.

				</div>	<!-- End of /.block -->
	</div>	<!-- End of /.container -->
</section>	<!-- End of section -->





<!-- Adding meal form
================================================== -->

<section id="features">
<div class="container">
<div class="block">
<h3>Share your passion with food and <strong>Add</strong> a new vlaue by sharing your favourit meal.</h3>
<form action="/action_page.php" target="_blank" id="myForm" class="form">

<label>Meal Name: </label><br>
<input class="w3-input"  type="text" placeholder="Title" name="title" id="title" required /><br>

<label>Description: </label><br>
<input class="w3-input"  type="text" placeholder="ingredients/description" name="description" id="description" required /><br>
<label>Price: </label><br>
<input class="w3-input"  type="number" placeholder="Price" name="price" id="price" required /><br>
<label> Number of guests: </label><br>
<input class="w3-input"  type="number" placeholder="max reservation" name="max_reservation" id="max_reservation" required /><br>
<label>Address: </label><br>
<input class="w3-input"  type="text" placeholder="location"  name="location" id="location" required /><br>

<br>
<button class="w3-button w3-black"  type="submit">Add Meal </button>
<br>

</form>
</div>
</div>
</section>

<br>

<!-- End page content -->
  `;

  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const myForm = document.getElementById("myForm");
  myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const location = document.getElementById("location").value;
    const max_Reservation = document.getElementById("max_reservation").value;
    const date = new Date();
    const currentDate = date.toISOString().slice(0, 10);

    postData("/api/meals", {
      title: title,
      description: description,
      price: price,
      max_reservations: max_Reservation,
      location: location,
      created_date: currentDate,
      when: currentDate,
    }).then((data) => {
      alert("Your meal was added successfuly");
      console.log("success meal posted", data); // JSON data parsed by `data.json()` call
    });
  });

  // if any links are added to the dom, use this function
  // make the router handle those links.
  router.updatePageLinks();
};
