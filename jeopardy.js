//I think I see, conceptually, how to do this; you have to have one level of nested random sampling; what i mean to say is, you have to randomly sample the categories, ensuring there are no duplicates, and then for each category, randomly sample the question pools, ensuring there are no duplicates in that either.  Afte that it's a simple matter of capturing the number of clicks per div, which really you only click each div twice, and after that everything is without meaning.

//there's also the restart game function which is really just calling all the setup functions again after clearing everything.

//so access the API, get the randomized categories, get the randomized questions per each category, link them to the appropriate div id, and set the event handlers.

// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]
const Url = "https://jservice.io/api/category?id="
const idSet = new Set()
function getRand(){
    while(idSet.size < 5){idSet.add(Math.floor((Math.random()*18418)+1))} 
}
getRand()
const idArr = Array.from(idSet)
console.log(idArr)
//console.log(`${Url}${idArr[0]}`)

const $game = $("#game")
async function jeopardyGet(){
    let catRes = await axios.get(`http://jservice.io/api/categories`)
    let clueRes = await axios.get(`http://jservice.io/api/clues`)
    console.log(catRes.data[0])
    console.log(clueRes.data[0])
    for(let i = 0; i < 1; i++){
        $game.append(catRes.data[i].title)
        $game.append(clueRes.data)
        //think we're getting somewhere now

    }
    //accessing the first item of categories
    //now you just need to access a truly random one 5 times

    //safe value for category seems to be between 1 and 18418; might need to test for null object values and reroll
}
    jeopardyGet()
let categories = [];

// const dumb = [1, 2, 3, 4, 5]
// const dumbSet = new Set(dumb, [1, 2, 3])
// console.log(dumb.length == dumbSet.size) //this should work for equality comparison purposes
/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */


function getCategoryIds() {
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

function getCategory(catId) {
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO