const URL = "https://jservice.io/api/category?id=";
const NUM_CATGEGORIES = 6;
const NUM_CLUES = 6;
// const idArr = getRand();
const $game = $("#game");
let categories = [];
let catObj = {};

// function getRand() {
//   const set = new Set();
//   while (set.size < 6) {
//     set.add(Math.floor(Math.random() * 18418 + 1)); //number of categories
//   }
//   return Array.from(set);
// } //works

async function jeopardyGet() {
  //this was literally just designed as a test function and outputs a big pile of data
  //maybe use the actual functions baked into the assignment now that you've got an MVP of this
  for (let i = 0; i < 6; i++) {
    let { data } = await axios.get(`${URL}${idArr[i]}`);
    console.log(data.title);
    console.log(data.clues[i].question);
    $game.append(`${data.title} `);
    for (let i = 0; i < 5; i++) {
      $game.append(`${data.clues[i].question} ${data.clues[i].answer} `);
    }
    //data.clues.length doesn't work for the limiter because it has null values
    //and sometimes it has like 20 clues
    //so we're just gonna revert to 5, and get the first 5, and see if that doesn't work for us.
  }
} //works
// jeopardyGet();

async function getCategoryIds(){
  const res = await axios.get("https://jservice.io/api/categories?count=100");
  const { title, id } = res.data;
  let catIds = _.sampleSize(res.data, 6).map((val) => {
    return { title: val.title, id: val.id };
  });

  return catIds;
};
console.log(getCategoryIds())
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

function getCategory(catId) {}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
  let $table = $("<table>");
  let $thead = $("<thead>");
  let $tbody = $("<tbody>");
  let $tr = $("<tr>");
  $game.append($table);
  $table.append($thead);

  for (let i = 0; i < 6; i++) {
    $thead.append(`<th id = th${i}>${categories[i]}</th>`);
  }
  $table.append($tbody);

  for (let i = 0; i < 6; i++) {
    $tbody.append($tr);
    $tr.append(`<td> HELP. ME. </td>`);
  }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
  $game.empty();
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO
