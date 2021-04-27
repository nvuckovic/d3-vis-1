// this script creates a JSON array where each element is a different year
// found in each JSON element from the original FL man dataset

// get data from json object
let data = require('./dataFL.json');

// create JSON array
let years = [];
years.push({"year":2014,"articles":[],"score":0});
years.push({"year":2015,"articles":[],"score":0});
years.push({"year":2016,"articles":[],"score":0});
years.push({"year":2017,"articles":[],"score":0});
years.push({"year":2018,"articles":[],"score":0});
years.push({"year":2019,"articles":[],"score":0});
years.push({"year":2020,"articles":[],"score":0});

// go through every article and see what year is associated with it and add to the correct JSON element
// and increment score
let i = 0;
for(i = 0; i < data.length; i++){
    let articleTime = data[i].time;
    let words = articleTime.split(" ");
    if(words[2] === "2014"){
        years[0].articles.push(data[i]);
        years[0].score++;
    }
    else if(words[2] === "2015"){
        years[1].articles.push(data[i]);
        years[1].score++;
    }
    else if(words[2] === "2016"){
        years[2].articles.push(data[i]);
        years[2].score++;
    }
    else if(words[2] === "2017"){
        years[3].articles.push(data[i]);
        years[3].score++;
    }
    else if(words[2] === "2018"){
        years[4].articles.push(data[i]);
        years[4].score++;
    }
    else if(words[2] === "2019"){
        years[5].articles.push(data[i]);
        years[5].score++;
    }
    else{
        years[6].articles.push(data[i]);
        years[6].score++;
    }
}


// return year of article
function getYear(article){

    let words = article.split(" ");

    return words[2]; // return this string since the third string is always the year
}

// convert JSON object to string
const fs = require('fs');
const listOfVerbs = JSON.stringify(years, null, 2); // spacing level = 2

const fileName = './JSON_Files/years.json';

// write JSON string to a file
fs.writeFile(fileName, listOfVerbs, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});