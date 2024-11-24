let countSpan = document.querySelector(".count span");
let caregory = document.querySelector(".caregory span");

let spans = document.querySelector(".spans");

let questionArea = document.querySelector(".question-area");
let answerArea = document.querySelector(".answer-area");
let submitButton = document.querySelector(".submit");
let results = document.querySelector(".results");

let currentIndex = 0;
let RightAnswers = 0;

function getQuestions() {
  let myReqest = new XMLHttpRequest();

  myReqest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let questions = questionsObject.questions;
      let questionsCount = questions.length;
      //console.log(questionsCount);

      createBullets(questionsCount);

      addQuestionData(questions[currentIndex], questionsCount);

      submitButton.onclick = () => {
        let theRightAnswer = questions[currentIndex].correct_answer;
        //console.log(theRightAnswer);
        caregory.innerHTML = "";

        currentIndex++;
        checkAnswer(theRightAnswer, questionsCount);

        questionArea.innerHTML = "";
        answerArea.innerHTML = "";
        addQuestionData(questions[currentIndex], questionsCount);

        handleBullets(questionsCount);

        showResultFunction(questionsCount);
      };
    }
  };
  myReqest.open("GET", "questions.json", true);
  myReqest.send();
}

getQuestions();

function createBullets(num) {
  countSpan.innerHTML = num;

  for (let i = 0; i < num; i++) {
    let span = document.createElement("span");
    if (i === 0) {
      span.className = "on";
    }
    span.id = i;
    spans.appendChild(span);
  }
}

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    let questionTitle = document.createElement("h2");
    let questionText = document.createTextNode(obj.question);
    caregory.append(obj.category);

    // console.log(questionText);
    questionTitle.appendChild(questionText);
    questionArea.appendChild(questionTitle);

    for (let i = 1; i <= 4; i++) {
      let mainDiv = document.createElement("div");
      mainDiv.className = "answer";
      let radioInput = document.createElement("input");
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj.options[i - 1];

      let lable = document.createElement("label");
      lable.htmlFor = `answer_${i}`;

      let lableText = document.createTextNode(obj.options[i - 1]);
      lable.appendChild(lableText);

      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(lable);

      console.log;

      answerArea.appendChild(mainDiv);
    }
  }
}

function checkAnswer(rAnswer, count) {
  // console.log(rAnswer, count);
  let theChoosenAnswer;
  if (currentIndex < count) {
    let answers = document.getElementsByName("question");

    for (let i = 0; i < answers.length; i++) {
      if (answers[i].checked) {
        theChoosenAnswer = answers[i].dataset.answer;
      }
    }
    /*  console.log(`Right Answer Is : ${rAnswer}`);
  console.log(`Choosen Answer Is : ${theChoosenAnswer}`); */
  }

  if (rAnswer === theChoosenAnswer) {
    RightAnswers++;
    console.log(RightAnswers);
  }
}

function handleBullets(count) {
  if (currentIndex < count) {
    let bulletsSpans = document.getElementById(currentIndex);

    bulletsSpans.className = "on";
  }
}

function showResultFunction(count) {
  let TheResults;
  if (currentIndex === count) {
    questionArea.remove();
    answerArea.remove();
    submitButton.remove();
    spans.remove();

    if (RightAnswers > count / 2 && RightAnswers < count) {
      TheResults = `<span class="good">Good</span> , ${RightAnswers} From ${count} Is Good`;
    } else if (RightAnswers === count) {
      TheResults = `<span class="perfuct">perfuct</span> , ${RightAnswers} From ${count} Is perfuct`;
    } else {
      TheResults = `<span class="bad">bad</span> , ${RightAnswers} From ${count} Is bad`;
    }
    results.innerHTML = TheResults;
  }
}
