// function shuffle(word) {
//   let wordArr = word.toLowerCase().split("");
//   let shuffled = [];
//   for (let i = 0; i <= word.length - 1; i++) {
//     shuffled[i] = wordArr[Math.floor(Math.random() * wordArr.length)];
//     wordArr.splice(wordArr.indexOf(shuffled[i]), 1);
//   }
//   return shuffled.join("") === word ? shuffle(word) : shuffled.join("");
// }

function shuffle(word) {
  let wordArr = word.toLowerCase().split("");
  wordArr.sort(function() {
    return Math.random() - 0.5;
  });

  return wordArr.join("") === word ? shuffle(word) : wordArr.join("");
}

let progLangs = ["go", "php", "ruby", "python", "javascript"];
let item = 0;
let word = progLangs[item];
let shuffledWord = shuffle(word);
let result = [];
const shuffledWordOutput = document.getElementById("shuffled-word-output");
const popBtn = document.getElementById("pop");
const shiftBtn = document.getElementById("shift");
const pushBtn = document.getElementById("push");
const unshiftBtn = document.getElementById("unshift");
const splitBtn = document.getElementById("split");
const alert = document.querySelector(".alert");

function updateOutput() {
  shuffledWordOutput.textContent = `[${shuffledWord}]`;
  alert.textContent = `[${result}]`;
}

function nextWord() {
  item++;
  word = progLangs[item];
  shuffledWord = shuffle(word);
  result = [];
}

function clearMethodsOutput() {
  alert.textContent = "";
}

popBtn.addEventListener("click", () => {
  if (shuffledWord.length && Array.isArray(shuffledWord)) {
    result.push(shuffledWord.pop());
    updateOutput();
  } else {
    alert.textContent = "Convert to array";
  }
});

shiftBtn.addEventListener("click", () => {
  if (shuffledWord.length && Array.isArray(shuffledWord)) {
    result.push(shuffledWord.shift());
    updateOutput();
  } else {
    alert.textContent = "Convert to array";
  }
});

pushBtn.addEventListener("click", () => {
  if (result.length && Array.isArray(shuffledWord)) {
    shuffledWord.push(...result);
    result = [];
    updateOutput();
    clearMethodsOutput();
  } else {
    alert.textContent = "Nothing to add";
  }
});

unshiftBtn.addEventListener("click", () => {
  if (result.length && Array.isArray(shuffledWord)) {
    shuffledWord.unshift(...result);
    result = [];
    updateOutput();
    clearMethodsOutput();
  } else {
    alert.textContent = "Nothing to add";
  }
});

splitBtn.addEventListener("click", () => {
  if (Array.isArray(shuffledWord)) {
    splitBtn.textContent = "split('')";
    shuffledWord = shuffledWord.join("");
    shuffledWordOutput.textContent = `${shuffledWord}`;

    if (shuffledWord === word) {
      if (item < progLangs.length - 1) {
        alert.textContent = "Well Done! 🎉🎉🎉";
        $(".alert")
          .fadeOut(400)
          .fadeIn(300);
        splitBtn.textContent = "NEXT";
        nextWord();
      } else {
        alert.textContent = "🎉🎉 Puzzle Complete! 🎉🎉";
        splitBtn.textContent = "The end";
        splitBtn.disabled = true;
      }
    } else {
      alert.textContent = "Wrong! Try again!";
    }
  } else if (typeof shuffledWord === "string") {
    shuffledWord = shuffledWord.split("");
    splitBtn.textContent = "join('')";

    updateOutput();
    if (!result.length) {
      alert.textContent = "Use JavaScript array methods to solve the puzzle";
      // clearMethodsOutput();
    }
  }
});
