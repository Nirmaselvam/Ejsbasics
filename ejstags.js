import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const data = {
    title: "EJS Tags",
    seconds: new Date().getSeconds(),
    items: ["apple", "banana", "cherry"],
    htmlContent: "<strong>This is some strong text</strong>",
  };
  res.render("ejstags.ejs", data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});







/* chatgpt 

Question is why should I write only title in ejs field as <title> <%= title %> </title> insted i can write this as <title> <%= data.title %> </title>  why data.title is not working please explain I Have added my js file also to your view


Ans:
🔍 What you’re doing in your JS:
In your Node.js file, you're doing this:

js
Copy
Edit
const data = {
  title: "EJS Tags",
  seconds: new Date().getSeconds(),
  items: ["apple", "banana", "cherry"],
  htmlContent: "<strong>This is some strong text</strong>",
};

res.render("ejstags.ejs", data);
Notice here: you're not passing an object named data into the EJS template.
You're passing the data object’s properties directly to the template.

So in the EJS file, you can directly use:

ejs
Copy
Edit
<title><%= title %></title>
But you cannot do:

ejs
Copy
Edit
<title><%= data.title %></title>  <!-- ❌ This won't work -->
Because inside the EJS file, there's no data object — only title, seconds, items, and htmlContent are directly available as variables.

✅ If you wanted to use data.title inside the EJS:
You would need to pass it like this in your route handler:

js
Copy
Edit
res.render("ejstags.ejs", { data }); // <--- Now 'data' is available in the EJS
Then your EJS would work with:

ejs
Copy
Edit
<title><%= data.title %></title>
✅ Best Practice (What you're currently doing):
Passing the variables directly is more common and clean, like this:

js
Copy
Edit
res.render("ejstags.ejs", {
  title: "EJS Tags",
  seconds: new Date().getSeconds(),
  items: ["apple", "banana", "cherry"],
  htmlContent: "<strong>This is some strong text</strong>",
});
And using in EJS:

ejs
Copy
Edit
<title><%= title %></title>
Summary:
Code in JS	Access in EJS
res.render("file", { title })	<%= title %> ✅
res.render("file", { data })	<%= data.title %> ✅
res.render("file", { title })	<%= data.title %> ❌ (error)

So in your current setup, use <%= title %> — that’s the correct and clean way.

Let me know if you'd like help rewriting your EJS to fix the other errors too.


2.Why its an issue because I am using my else block as mentioning that as JS righ then why its showing error


✅ Why You See an Error in EJS with <% } %> <% else { %>
Even though EJS uses JavaScript, it doesn’t parse it exactly like the browser or Node.js would.
EJS templates are converted into a function under the hood – and that function requires valid, well-formatted JavaScript.

Here’s why your code breaks:

ejs
Copy
Edit
<% } %>
<% else { %>
When EJS compiles your file, it puts these lines into a function body like:

js
Copy
Edit
if (seconds % 2 === 0) {
  // some HTML
} 
else {
  // other HTML
}
But because of how EJS parses things line-by-line, if you're not careful, it might not detect the } and else as part of the same block and throws a syntax error like:

arduino
Copy
Edit
Unexpected token else
✅ What works and why
This works:

ejs
Copy
Edit
<% if (seconds % 2 === 0) { %>
  <!-- some HTML -->
<% } else { %>
  <!-- some other HTML -->
<% } %>
Why? Because:

You're keeping the if and else logic together inside EJS tags

EJS can now generate clean, valid JavaScript like:

js
Copy
Edit
if (seconds % 2 === 0) {
  // HTML
} else {
  // HTML
}
❌ What breaks
This breaks:

ejs
Copy
Edit
<% if (seconds % 2 === 0) { %>
  <!-- some HTML -->
<% } %>
<% else { %>
  <!-- some HTML -->
<% } %>
Why? Because EJS splits them like this:

js
Copy
Edit
if (...) {
  // HTML
}
else {
  // HTML
}
But sometimes the HTML or whitespace between the } and else causes EJS to generate invalid code.

✅ Conclusion
Even though you're writing valid JavaScript logic, EJS needs it in one block to keep its compiler happy.

🔐 Safe Rule:
Always write if, else, and else if inside the same set of EJS tags, like:

ejs
Copy
Edit
<% if (...) { %>
<% } else { %>
<% } %>

*/