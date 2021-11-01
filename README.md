# Node/SQL Exercises correction

### Documentation of the API ([Here](https://documenter.getpostman.com/view/14782056/TzecBQSt))

### _Exercise 1_:

Following on the previous exercise's Node/Express application you built:

<span>Create an application level middleware that inspects the query in your URL and checks if there is a </span><a href="https://en.wikipedia.org/wiki/Access_token"  target="_blank"  rel="noopener"><span>token</span></a> provided (the value of the token does not matter)<span>. </span>

<span>Steps: </span>

<ol>

<li><span>Create an index.js with the Express application. </span></li>

<li><span>Create a function </span><b>secure()</b><span > that needs to be on </span><b>every route </b><span >(</span><a href="https://expressjs.com/en/guide/using-middleware.html#middleware.application"  target="_blank"  rel="noopener"><span>app.use()</span></a><span>). </span></li>

<li><span>Inside this secure function, inspect if there is a </span><a href="https://expressjs.com/en/4x/api.html#req.query"  target="_blank"  rel="noopener"><span>query</span></a><span> with the name </span><b>token </b><span >and a value</span></li>

<li ><span >If the token has a value, continue (i.e. log ‘Token successfully verified!’).</span></li>

<li ><span >If the token hasn’t any value or doesn’t exist, respond with an HTTP code of 403. </span></li>

</ol>

### _Exercise 2_:

<ol>

<li><span style="font-weight: 400;"> In the previous database, create a new table called <strong>tokens</strong> that has an id and a value (of type text) </span></li>
<li> Alter your previously created table users. It must have a reference to the id of the token table (eg: in the table users, a token_id column should now be ready to accept a foreign key that will eventually link it to the tokens table)</li>

<h4>In your NodeJs Server, create a route to :</h4>

<ul>
<li>Create a new token for a specific user</li>
<p> => Create a new route with a GET endpoint on <strong>/:id/verify/:token</strong>. The process must :</p>
<li>Check if the token is available in the database</li>
<li>Check if the token is available on a specific user</li>
<li>if the user is linked to this token, --&gt; res.send("token valid");</li>
<li>if the token is invalid or does not exist, --&gt; res.send("invalid token");</li>
</ul>

</ol>
