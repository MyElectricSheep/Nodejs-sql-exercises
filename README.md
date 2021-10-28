# Node/SQL Exercises correction

### Documentation of the API ([Here](https://documenter.getpostman.com/view/14782056/TzecBQSt))

### _Exercise 1_:

Following on the previous exercise's Node/Express application you built:

<span style="font-weight: 400;">Create an application level middleware that inspects the query in your URL and checks if there is a </span><a href="https://en.wikipedia.org/wiki/Access_token" target="_blank" rel="noopener"><span style="font-weight: 400;">token</span></a> provided (the value of the token does not matter)<span style="font-weight: 400;">. </span>

<span style="font-weight: 400;">Steps: </span>

<ol>
 	<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Create an index.js with the Express application. </span></li>
 	<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Create a function </span><b>secure()</b><span style="font-weight: 400;"> that needs to be on </span><b>every route </b><span style="font-weight: 400;">(</span><a href="https://expressjs.com/en/guide/using-middleware.html#middleware.application" target="_blank" rel="noopener"><span style="font-weight: 400;">app.use()</span></a><span style="font-weight: 400;">). </span></li>
 	<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Inside this secure function, inspect if there is a </span><a href="https://expressjs.com/en/4x/api.html#req.query" target="_blank" rel="noopener"><span style="font-weight: 400;">query</span></a><span style="font-weight: 400;"> with the name </span><b>token </b><span style="font-weight: 400;">and a value</span></li>
 	<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">If the token has a value, continue (i.e. log ‘Token successfully verified!’).</span></li>
 	<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">If the token hasn’t any value or doesn’t exist, respond with an HTTP code of 403.  </span></li>
</ol>
