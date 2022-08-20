const URL_START = "https://jservice.io/api/";
const URL_CAT = "categories?count=100";
const URL_CLUES = "category?id=";
const $game = $("#game");
let categories = [];

async function getCategoryIds() {
  const res = await axios.get(`${URL_START}${URL_CAT}`);
  const { title, id } = res.data;
  let catIds = _.sampleSize(res.data, 6).map((val) => {
    return { title: val.title, id: val.id };
  });
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

async function getCategory(catId) {
  const clues = await axios.get(`${URL_START}${URL_CLUES}${catId}`);
  let clueArr = []
  for (let i = 0; i < 5; i++) {
    let clueObj = {
      question: clues.data.clues[i].question,
      answer: clues.data.clues[i].answer,
      showing: null
    }
    clueArr.push(clueObj)
  }
  return clueArr
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable(clueArr, catArr) {
  let $table = $("<table>");
  let $thead = $("<thead>");
  let $tbody = $("<tbody>");
  let $tr = $("<tr>");

  $game.append($table);
  $table.append($thead);

  for (let i = 0; i < 6; i++) {
    $thead.append(`<th id = th${i}>${catArr[i].title}</th>`);
  }
  $table.append($tbody);

  $("#game tbody").empty();
  for (let i = 0; i < 5; i++) {
    let $tr = $("<tr>");
    for (let j = 0; j < 6; j++) {
      const clue = clueArr[j][i];

      const $td = $("<td>")
        .text("?")
        .click((evt) => handleClick(evt, clue));

      $tr.append($td);
    }
    $("#game tbody").append($tr);
  }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt, clue) {
  const $td = $(evt.target);

  if (clue.showing == null) {
    clue.showing = "question";
    $td.text(clue.question)
  } else if (clue.showing == "question") {
    clue.showing = "answer";
    $td.text(clue.answer);
  }

}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
  $("#restart").attr("disabled", true);
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
  $("#restart").attr("disabled", false);
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
  $game.empty();

  let clueArr = []
  let catArr = await getCategoryIds()
  for(let i = 0; i < catArr.length; i++){
    let catId = catArr[i].id
    let clues = await getCategory(catId)
    clueArr.push(clues)
  }
  
  fillTable(clueArr, catArr);

}

/** On click of start / restart button, set up game. */

$("#restart").click(async (evt) => {
  showLoadingView();

  try {
    await setupAndStart();
  } catch (e) {
    alert("An error occurred, please try again.");
  }
  hideLoadingView();
});

/** On page load, add event handler for clicking clues */