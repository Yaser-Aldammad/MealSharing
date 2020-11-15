window.handleMealRequest = (params) => {
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
			<p>Fill in your order</p>
		</div>	<!-- End of /.col-md-4 -->
		</div> <!-- End of row -->
		</div> <!-- End of container-->
		</section> <!--End of section-->
		
	

 
	
<!-- fill form
================================================== -->

  


	<div class="container">
	<h1>Meal No. ${params.id}</h1>
	<ul class="meal" id="meal"></ul>
	 <div id="reser">
	  <h2>Add your information </h2><br><br>
	<form action="" method="post" >
	<div class="form-group row">
	  <label for="name" class="col-sm-2 col-form-label">name :</label>
	  <div class="col-sm-10">
		<input type="text" id="name" class="form-control" name="contact_name" required>
	  </div>
	</div>
	<div class="form-group row">
	  <label for="contact_email" class="col-sm-2 col-form-label"> email:</label>
	  <div class="col-sm-10">
		<input type="text" id="contact_email" class="form-control" name="contact_email" required> 
	  </div>
	</div>
	 <div class="form-group row">
	  <label for="contact_phonenumber" class="col-sm-2 col-form-label">phone number :</label>
	  <div class="col-sm-10">
		<input type="text" id="contact_phonenumber" class="form-control"  name="contact_phonenumber" required>
	  </div>
	</div>
	<input type="text" id="created_date" hidden name="created_date"><br><br>
	
	<input type="number" hidden id="number_of_guests" name="number_of_guests" value="10">
   
	
   
  </form>
	</div>
	</div>
`;

  const form = document.querySelector("form");

  fetch(`/api/meals/${params.id}`)
    .then((res) => res.json())
    .then((data) => {
      const ul = document.querySelector("#meal");
      const li = document.createElement("li");
      li.innerHTML = `meal title : ${data[0].title}<br> description : ${data[0].description}`;
      ul.appendChild(li);

      form.innerHTML += `
    <div class="form-group row">
        <label for="meal_id" class="col-sm-2 col-form-label">meal id :</label>
        <div class="col-sm-10">
          <input type="number"  class="form-control" disabled id="meal_id" name="meal_id" value="${params.id}">
        </div>
    </div>
    <div class="form-group row">
    <div class="col-sm-10">
      <button type="submit" class="btn btn-dark">Book</button>
    </div>
  </div>`;
      const date = new Date();
      const currentDate = date.toISOString().slice(0, 10);

      document.getElementById("created_date").value = currentDate;
    })
    .catch((error) => console.log(error));

  // adding reservation to showen meal

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

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    postData("/api/reservations", {
      contact_name: document.getElementById("name").value,
      contact_phonenumber: document.getElementById("contact_phonenumber").value,
      contact_email: document.getElementById("contact_email").value,
      created_date: document.getElementById("created_date").value,
      meal_id: parseInt(document.getElementById("meal_id").value),
      number_of_guests: parseInt(
        document.getElementById("number_of_guests").value
      ),
    })
      .then((data) => {
        alert("the reservation done ");
        console.log(data); // JSON data parsed by `data.json()` call
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
