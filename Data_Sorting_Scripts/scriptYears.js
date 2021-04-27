// this script maps every verb to each article that it appears in (using a JSON object)
// however, it creates a JSON file for each year
// years are: 2014, 2015, 2016, 2017, 2018, 2019, 2020

// get data from json object
let data = require('./dataFL.json');

// create JSON array
let verbs = [];
let thisYear = "2020"; // all articles in the JSON file this script produces will be from this year


// go through every verb in every article and call addArticle to add verbs/articles to index
let i = 0;
for(i = 0; i < data.length; i++){
    let count = 0;
    while(count < data[i].verbs.length){
        addArticle(data[i].verbs[count],i)
        count++;
    }
}

// takes a verb and index of data and determines if verb is in index already
// if so, add article JSON to articles array
// if not, add verb to index and add article to articles array for that verb
function addArticle(key,i) {
      
    // check if verb is in list
    let counter = 0;
    let inList = false;
    while(inList === false && counter < verbs.length){
        if(key === verbs[counter].verb){
            inList = true;
        }
        counter++;
    }

    // add article to JSON array if it is has the correct year
    if(getYear(data[i].time) === thisYear){
        // case for if the verb is already in the JSON array
        if(inList === true){
            // push new article to existing verb in JSON array
            verbs[counter-1].articles.push(data[i]);
            verbs[counter-1].score++;
        }
        // case for when the verb is not in the JSON array
        else{
            // push new verb to JSON array
            verbs.push({"verb":key,"articles":[],"score":1});
            verbs[verbs.length - 1].articles.push(data[i]);
        }
    }
}

// return year of article
function getYear(article){

    let words = article.split(" ");

    return words[2]; // return this string since the third string is always the year
}

// convert JSON object to string
const fs = require('fs');
const listOfVerbs = JSON.stringify(verbs, null, 2); // spacing level = 2

const fileName = './JSON_Files/verbs2020.json';

// write JSON string to a file
fs.writeFile(fileName, listOfVerbs, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});