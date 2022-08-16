const URL = "https://jservice.io/api/category?id=";
const NUM_CATGEGORIES = 6;
const NUM_CLUES = 6;
const $game = $("#game");
let categories = [];
let catObj = {};

async function jeopardyGet() {
  //this was literally just designed as a test function and outputs a big pile of data
  //maybe use the actual functions included in the assignment now that you've got an MVP of this
  for (let i = 0; i < 6; i++) {
    let { data } = await axios.get(`${URL}${idArr[i]}`);//idArr was removed in favor of using lodash to randomly generate category id; no longer works
    console.log(data.title);
    console.log(data.clues[i].question);
    $game.append(`${data.title} `);
    for (let i = 0; i < 5; i++) {
      $game.append(`${data.clues[i].question} ${data.clues[i].answer} `);
    }
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
  let $tr0 = $("<tr id = '0'>");
  let $tr1 = $("<tr id = '1'>");
  let $tr2 = $("<tr id = '2'>");
  let $tr3 = $("<tr id = '3'>");
  let $tr4 = $("<tr id = '4'>");

  $game.append($table);
  $table.append($thead);

  for (let i = 0; i < 6; i++) {
    $thead.append(`<th id = th${i}>${categories[i]}</th>`);
  }
  $table.append($tbody);

  for (let i = 0; i < 6; i++) {
    $tbody.append($tr0);
    $tr0.append(`<td>?</td>`);
  }
  for (let i = 0; i < 6; i++) {
    $tbody.append($tr1);
    $tr1.append(`<td>?</td>`);
  }
  for (let i = 0; i < 6; i++) {
    $tbody.append($tr2);
    $tr2.append(`<td>?</td>`);
  }
  for (let i = 0; i < 6; i++) {
    $tbody.append($tr3);
    $tr3.append(`<td>?</td>`);
  }
  for (let i = 0; i < 6; i++) {
    $tbody.append($tr4);
    $tr4.append(`<td>?</td>`);
  }
}//this isn't dynamic programming and i hate how it looks but trying to us tr[i] and a nested for loop is not giving the results i want.  however, i think i need to be able to dynamically assign ids in order to put the questions/answers on there.
fillTable()
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
