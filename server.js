const express = require('express');
// const bodyparser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { Feed } = require("feed");
const routes = require('./routes');

const PORT = process.env.PORT || 3000;
const app = express();

//use of static public dir
app.use(express.static(path.join(__dirname, "public")));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));

// use of express.json to handle json response
app.use(express.json());

app.use(routes);

app.use((err, req, res, next) => {
  // you can error out to stderr still, or not; your choice
  console.error(err); 

  // body-parser will set this to 400 if the json is in error
  if(err.status === 400)
    return res.status(err.status).json({ type: "error", message: err.message });

  return next(err); // if it's not a 400, let the default error handling do it. 
});
app.get('/capfeed',(req,res)=>{
  res.contentType('application/xml');
  res.type('.xml');
  res.sendFile(path.join(__dirname ,'public', 'capfeed.cap'));

});

app.get('/mockfemacap',(req,res)=>{
  res.contentType('application/xml');
  res.type('.xml');
  res.sendFile(path.join(__dirname ,'public', 'mockfemacap.cap'));

});

app.get('/mockfemajson',(req,res)=>{
  res.contentType('application/json');
  res.type('.json');
  res.sendFile(path.join(__dirname ,'public', 'mockFemaWebDisasterDeclarations.json'));

});

const feed = new Feed({
  title: "Feed Title",
  description: "This is my personal feed!",
  id: "http://example.com/",
  link: "http://example.com/",
  language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  image: "http://example.com/image.png",
  favicon: "http://example.com/favicon.ico",
  copyright: "All rights reserved 2013, John Doe",
  // updated: new Date(2013, 6, 14), // optional, default = today
  generator: "awesome", // optional, default = 'Feed for Node.js'
  feedLinks: {
    json: "https://example.com/json",
    atom: "https://example.com/atom"
  },
  author: {
    name: "John Doe",
    email: "johndoe@example.com",
    link: "https://example.com/johndoe"
  }
});

const posts=[{
  title:"Abc",
  url:'1',
  description:"A Sample Feed",
  content:"Blah",
  date:new Date(),
  image:'https://image.flaticon.com/icons/png/512/31/31718.png'
  
},
{
  title:"Abc1",
  url:'2',
  description:"A Sample Feed Item 2",
  content:"Blah",
  date:new Date(),
  image:'https://image.flaticon.com/icons/png/512/31/31718.png'
  
}]

posts.forEach(post => {
  feed.addItem({
    title: post.title,
    id: post.url,
    link: post.url,
    description: post.description,
    content: post.content,
    author: [
      {
        name: "Jane Doe",
        email: "janedoe@example.com",
        link: "https://example.com/janedoe"
      },
      {
        name: "Joe Smith",
        email: "joesmith@example.com",
        link: "https://example.com/joesmith"
      }
    ],
    contributor: [
      {
        name: "Shawn Kemp",
        email: "shawnkemp@example.com",
        link: "https://example.com/shawnkemp"
      },
      {
        name: "Reggie Miller",
        email: "reggiemiller@example.com",
        link: "https://example.com/reggiemiller"
      }
    ],
    date: post.date,
    image: post.image,
    point:"-36.1899 -97.6645"
  });
});
feed.options.language="eng";
feed.addCategory("Technology");

feed.addContributor({
  name: "Johan Cruyff",
  email: "johancruyff@example.com",
  link: "https://example.com/johancruyff"
});

console.log(feed.rss2());
// Output: RSS 2.0

console.log(feed.atom1());
// Output: Atom 1.0

console.log(feed.json1());
// Output: JSON Feed 1.0



app.listen(PORT,()=>{
  console.log("FeedJar Server Started");
})




