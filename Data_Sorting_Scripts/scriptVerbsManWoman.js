// this script maps every verb to each article that it appears in (using a JSON object)
// it also keeps track of whether the article title contains man, woman, or both
// there are 4 different scores
//      score: number of articles the given verb appears in
//      scoreMan: number of articles the given verb appears in and has Man in the title
//      scoreWoman: number of articles the given verb appears in and has Woman in the title
//      scoreManWoman: number of articles the given verb appears in and has both Man/Woman in the title

// get data from json object
let data = require('./dataFL.json');

// create JSON array
let verbs = [];

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
// also, determine if the article title contains Man, Woman, or both and increment the score for each
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

    // get integer for determining what gender(s) appears in the article title
    let mw = parseArticle(data[i].title);

    // case for if the verb is already in the JSON array
    if(inList === true){
        // push new article to existing verb in JSON array
        verbs[counter-1].articles.push(data[i]);
        verbs[counter-1].score++;
        // update scoreMan, scoreWoman, or scoreManWoman
        if(mw !== -1){
            if(mw === 1){
                verbs[counter-1].scoreMan++;
                verbs[counter -1].articlesMan.push(data[i]);
            }
            else if(mw === 2){
                verbs[counter-1].scoreWoman++;
                verbs[counter -1].articlesWoman.push(data[i]);
            }
            else{
                verbs[counter-1].scoreManWoman++;
                verbs[counter -1].articlesManWoman.push(data[i]);
            }
        }
    }
    // case for when the verb is not in the JSON array
    else{
        // push new verb to JSON array
        verbs.push({"verb":key,"articles":[],"articlesMan":[],"articlesWoman":[],"articlesManWoman":[],"score":1,"scoreMan":0,"scoreWoman":0,"scoreManWoman":0});
        verbs[verbs.length - 1].articles.push(data[i]);
        // update scoreMan, scoreWoman, or scoreManWoman
        if(mw !== -1){
            if(mw === 1){
                verbs[verbs.length-1].scoreMan++;
                verbs[verbs.length - 1].articlesMan.push(data[i]);
            }
            else if(mw === 2){
                verbs[verbs.length-1].scoreWoman++;
                verbs[verbs.length - 1].articlesWoman.push(data[i]);
            }
            else{
                verbs[verbs.length-1].scoreManWoman++;
                verbs[verbs.length - 1].articlesManWoman.push(data[i]);
            }
        }
    }
}

// determine what gender is used in the title
function parseArticle(article){

    let words = article.split(" ");

    manBool = false;
    womanBool = false;

    let k = 0;
    for(k = 0; k<words.length; k++){
        
        // check if man or woman appears in the title and store that information
        if(words[k] === 'man' || words[k] === 'man\'s' || words[k] === 'man\’s'){
            manBool = true;
        }
        if(words[k] === 'woman' || words[k] === 'woman\'s' || words[k] === 'woman\’s'){
            womanBool = true;
        }
    }

    // return an integer that represents which gender(s) is in the article title
    if(manBool === true && womanBool === true){// man and woman
        return 0;
    }
    else if(manBool === true){// man
        return 1;
    }
    else if(womanBool === true){// woman
        return 2;
    }
    else{// neither
        return -1;
    }
}

// convert JSON object to string
const fs = require('fs');
const listOfVerbs = JSON.stringify(verbs, null, 2); // spacing level = 2

const fileName = './JSON_Files/verbsManWoman.json';

// write JSON string to a file
fs.writeFile(fileName, listOfVerbs, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});