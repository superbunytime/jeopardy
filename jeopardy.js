const URL_START = "https://jservice.io/api/";
const URL_CAT = "categories?count=100";
const URL_CLUES = "category?id="
const $game = $("#game");
let categories = [];

async function jeopardyGet() {
  //this was literally just designed as a test function and outputs a big pile of data
  //maybe use the actual functions included in the assignment now that you've got an MVP of this
  let item = getCategoryIds()
  for (let i = 0; i < 6; i++) {
    let { data } = await axios.get(`${URL_START}category?id=${item[i]}`); //idArr was removed in favor of using lodash to randomly generate category id; no longer works
    console.log(data.title);
    console.log(data.clues[i].question);
    $game.append(`${data.title} `);
    for (let i = 0; i < 5; i++) {
      $game.append(`${data.clues[i].question} ${data.clues[i].answer} `);
    }
  }
} //doesn't work anymore lmao help me i am dying
// console.log(jeopardyGet())

async function getCategoryIds() {
  const res = await axios.get(`${URL_START}${URL_CAT}`);
  const { title, id } = res.data;
  let catIds = _.sampleSize(res.data, 6).map((val) => {
    return { title: val.title, id: val.id };
  });
  console.log(catIds);
  return catIds;
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

async function getCategory(catId) {}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
  let catIds = await getCategoryIds();
  let $table = $("<table>");
  let $thead = $("<thead>");
  let $tbody = $("<tbody>");
  let $tr = $("<tr>");

  $game.append($table);
  $table.append($thead);

  for (let i = 0; i < 6; i++) {
    $thead.append(`<th id = th${i}>${catIds[i].title}</th>`);
  }
  $table.append($tbody);

  $("#game tbody").empty();
  for (let i = 0; i < 5; i++) {
    let $tr = $("<tr>");
    for (let j = 0; j < 6; j++) {
      $tr.append($("<td>").attr("id", `${i}-${j}`).text("?"));
    }
    $("#game tbody").append($tr);
  }
  
}
fillTable();
/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
  let clickCount = 0;
  let $tr = $("<tr>");

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

async function setupAndStart() {
  $game.empty();
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO
