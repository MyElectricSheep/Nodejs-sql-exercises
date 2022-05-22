# Node/SQL Exercise correction

- ##### This is an exercise created for the [WBS Coding School](https://www.wbscodingschool.com/) to make web dev students practice their **Node + Express + SQL** skills.

### Documentation of the API ([Here](https://documenter.getpostman.com/view/14782056/TzecBQSt))

<span style="font-weight: 400;">Brace up! We are going to create a small RESTful API using Node + Express + a PostgreSQL database that will serve the client with some data about users and their orders.</span>

<ol>
 	<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Create a Github Repo for this exercise</span></li>
 	<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Create a database  instance on </span><a href="https://www.elephantsql.com/"><span style="font-weight: 400;">ElephantSQL</span></a><span style="font-weight: 400;">  </span></li>
 	<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Initialize the database with: </span>

```
CREATE  TABLE users (

	id SERIAL  PRIMARY  KEY,

	first_name varchar(255),

	last_name varchar(255),

	age int,

	active BOOLEAN  NOT  NULL  DEFAULT true

);
```

```
CREATE  TABLE orders (

	id SERIAL  PRIMARY  KEY,

	price float,

	date  timestamp,

	user_id  int,

	FOREIGN KEY (user_id) REFERENCES users(id)

);
```

```

INSERT  INTO users (first_name, last_name, age) VALUES ('John', 'Doe', 18);

INSERT  INTO users (first_name, last_name, age) VALUES ('Bob', 'Dylan', 30);

INSERT  INTO users (first_name, last_name, age) VALUES ('Jane', 'Doe', 25);

INSERT  INTO orders (price,date, user_id) VALUES ( 18, '2021-01-01 00:00:00', 1);

INSERT  INTO orders (price,date, user_id) VALUES ( 18, '2021-01-02 04:00:00', 1);

INSERT  INTO orders (price,date, user_id) VALUES ( 18, '2021-01-03 05:00:00', 2);

INSERT  INTO orders (price,date, user_id) VALUES ( 18, '2021-01-04 06:00:00', 2);
```

---

</li>
 	<h4 style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Create an Express server with separate routes for:</span>
 	</h4>
 	<li><span style="font-weight: 400;">The users:</span>
<ul>
 	<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">GET  /  : To get all the users </span></li>
 	<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">GET  /:id :  To get one user (with the id) </span></li>
 	<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">POST / -&gt; To create a new user </span></li>
 	<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">PUT /:id  :  To edit one user (with the id) </span></li>
 	<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">DELETE  /:id : To delete one user (with the id)</span></li>
</ul>
</li>
 	<li style="font-weight: 400;" aria-level="1">The orders:
<ul>
 	<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">GET  /  : To get all the orders </span></li>
 	<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">GET  /:id :  To get one order (with the id) </span></li>
 	<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">POST / -&gt; To create a new order</span></li>
 	<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">PUT /:id  :  To edit one order (with the id) </span></li>
 	<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">DELETE  /:id : To delete one order (with the id) </span></li>
</ul>
</li>
 	<li><span style="font-weight: 400;">EXTRA (AKA; you can give it a go, but you don’t have to...) If you are finished with these, try to:</span>
<ul>
 	<li aria-level="1">Validate all the data coming from the users/orders for the Post/Put routes (<a href="https://express-validator.github.io/docs/index.html">help</a>)</li>
 	<li aria-level="1"> Create a separate module for your pool object (<a href="https://node-postgres.com/guides/async-express">help</a>)</li>
 	<li aria-level="1">Create a user route that will return all the orders of a user
<ul>
 	<li aria-level="1"><b>GET /:id/orders</b> : To get all orders linked to a specific user</li>
</ul>
</li>
 	<li aria-level="1">Create another user route that will set a user as inactive if he has never ordered anything:
<ul>
 	<li aria-level="1"><b>PUT /:id/check-inactive</b> : If a user has never ordered, he should be set as inactive</li>
</ul>
</li>
 	<li aria-level="1"> Separate routes in 2 router files. One for Users, one for Orders: <a href="https://expressjs.com/en/guide/routing.html">https://expressjs.com/en/guide/routing.html</a></li>
</ul>
</li>
</ol>
<span style="font-weight: 400;">Don’t forget to check the documentation of the Node Postgres package here: </span><a href="https://node-postgres.com/features/connecting#Environment%20variables"><span style="font-weight: 400;">https://node-postgres.com</span></a>
