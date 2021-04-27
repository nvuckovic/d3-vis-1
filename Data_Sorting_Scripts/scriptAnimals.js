// this script creates a JSON array where each element is a different type of animal
// found in the article titles

// each entry has 3 fields: the name of the animal, the list of articles it appears in, and the number
// of articles that it appears in

// get data from json object
let data = require('./dataFL.json');

// initally push each element and add articles to the corresponding element later
let animals = [];
animals.push({"animal":"Dog","articles":[],"score":0});
animals.push({"animal":"Cat","articles":[],"score":0});
animals.push({"animal":"Alligator","articles":[],"score":0});
animals.push({"animal":"Fish","articles":[],"score":0});
animals.push({"animal":"Horse","articles":[],"score":0});
animals.push({"animal":"Monkey","articles":[],"score":0});
animals.push({"animal":"Shark","articles":[],"score":0});
animals.push({"animal":"Giraffe","articles":[],"score":0});
animals.push({"animal":"Lobster","articles":[],"score":0});
animals.push({"animal":"Turtle","articles":[],"score":0});
animals.push({"animal":"Manatee","articles":[],"score":0});
animals.push({"animal":"Bird","articles":[],"score":0});
animals.push({"animal":"Peacock","articles":[],"score":0});


// go through every article title and call parseArticle to see if an animal appears in the title
let i = 0;
for(i = 0; i < data.length; i++){
    parseArticle(data[i].title,i)
}

// check if an animal appears in the title
// if so, add article to the corresponding JSON object and update score
function parseArticle(article,j){

    let words = article.split(" ");

    let k = 0;
    for(k = 0; k<words.length; k++){
    
        if(words[k] === "dog" || words[k] === "dogs"){
            animals[0].articles.push(data[j]);
            animals[0].score++;
        }
        if(words[k] === "cat" || words[k] === "cats"){
            animals[1].articles.push(data[j]);
            animals[1].score++;
        }
        if(words[k] === "alligator" || words[k] === "alligator" || words[k] === "gator" || words[k] === "gators"){
            animals[2].articles.push(data[j]);
            animals[2].score++;
        }
        if(words[k] === "fish"){
            animals[3].articles.push(data[j]);
            animals[3].score++;
        }
        if(words[k] === "horse" || words[k] === "horses"){
            animals[4].articles.push(data[j]);
            animals[4].score++;
        }
        if(words[k] === "monkey" || words[k] === "monkeys"){
            animals[5].articles.push(data[j]);
            animals[5].score++;
        }
        if(words[k] === "shark" || words[k] === "sharks"){
            animals[6].articles.push(data[j]);
            animals[6].score++;
        }
        if(words[k] === "giraffe" || words[k] === "giraffes" || words[k] === "giraffe,"){
            animals[7].articles.push(data[j]);
            animals[7].score++;
        }
        if(words[k] === "lobster" || words[k] === "lobsters"){
            animals[8].articles.push(data[j]);
            animals[8].score++;
        }
        if(words[k] === "turtle" || words[k] === "turtles"){
            animals[9].articles.push(data[j]);
            animals[9].score++;
        }
        if(words[k] === "manatee" || words[k] === "manatees"){
            animals[10].articles.push(data[j]);
            animals[10].score++;
        }
        if(words[k] === "bird" || words[k] === "birds"){
            animals[11].articles.push(data[j]);
            animals[11].score++;
        }
        if(words[k] === "lizard" || words[k] === "lizards"){
            animals[12].articles.push(data[j]);
            animals[12].score++;
        }
        if(words[k] === "peacock" || words[k] === "peacocks"){
            animals[13].articles.push(data[j]);
            animals[13].score++;
        }
    }
}

// convert JSON object to string
const fs = require('fs');
const listOfVerbs = JSON.stringify(animals, null, 2); // spacing level = 2)

const fileName = './JSON_Files/animals.json';

// write JSON string to a file
fs.writeFile(fileName, listOfVerbs, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});