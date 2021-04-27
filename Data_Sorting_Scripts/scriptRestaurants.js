// this script creates a JSON array where each element is a different restaurant
// found in the article titles

// each entry has 3 fields: the name of the restaurant, the list of articles it appears in, and the number
// of articles that it appears in

// get data from json object
let data = require('./dataFL.json');

// initally push each element and add articles to the corresponding element later
let restaurants = [];
restaurants.push({"restaurant":"McDonald's","articles":[],"score":0});
restaurants.push({"restaurant":"Wendy's","articles":[],"score":0});
restaurants.push({"restaurant":"Burger King","articles":[],"score":0});
restaurants.push({"restaurant":"Chic Fil A","articles":[],"score":0});
restaurants.push({"restaurant":"Taco Bell","articles":[],"score":0});
restaurants.push({"restaurant":"Waffle House","articles":[],"score":0});


// go through every article title and call parseArticle to see if a restaurant appears in the title
let i = 0;
for(i = 0; i < data.length; i++){
    parseArticle(data[i].title,i)
}

// check if a restaurant appears in the title
// if so, add article to the corresponding JSON object and update score
function parseArticle(article,j){

    let words = article.split(" ");

    let k = 0;
    for(k = 0; k<words.length; k++){
    
        if(words[k] === "mcdonald\u2019s" || words[k] === "mcdonald's"){
            restaurants[0].articles.push(data[j]);
            restaurants[0].score++;
        }
        if(words[k] === "wendy's"){
            restaurants[1].articles.push(data[j]);
            restaurants[1].score++;
        }
        if(k < words.length-1){
            if(words[k] === "burger" && words[k+1] === "king"){
                restaurants[2].articles.push(data[j]);
                restaurants[2].score++;
            }
        }
        if(words[k] === "chic-fil"){
            restaurants[3].articles.push(data[j]);
            restaurants[3].score++;
        }
        if(k < words.length-1){
            if(words[k] === "taco" && words[k+1] === "bell"){
                restaurants[4].articles.push(data[j]);
                restaurants[4].score++;
            }
        }
        if(k < words.length-1){
            if(words[k] === "waffle" && words[k+1] === "house"){
                restaurants[5].articles.push(data[j]);
                restaurants[5].score++;
            }
        }
    }
}

// convert JSON object to string
const fs = require('fs');
const listOfVerbs = JSON.stringify(restaurants, null, 2); // spacing level = 2)

const fileName = 'restaurants.json';

// write JSON string to a file
fs.writeFile(fileName, listOfVerbs, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});