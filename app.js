let copyWord = [];

function addWord() {
   if (localStorage.length < 1) {
      localStorage.setItem('word', document.getElementById("word").value);
   } else {
      localStorage.clear();
      localStorage.setItem('word', document.getElementById("word").value);
   }
   document.getElementById("alert").innerHTML = '';
   copyWord.length = localStorage.getItem('word').length + 1;
   copyWord.fill(0);
   copyWord[copyWord.length - 1] = -1;
   display(0);
}

function display(x) {
   document.getElementById("word").value = '';
   document.getElementById("text").innerHTML = '';
   document.getElementById("imageId").src = "hangman/"+ x +".jpg";
   document.getElementById("btn").innerHTML = '<div class="input-group input-group-lg">\n' +
       '        <button type="button" class="btn btn-outline-primary" onclick="return checkCharacter();">Enter the character </button>\n' +
       '        <input id="character" type="text" class="form-control" aria-label="" aria-describedby="">\n' +
       '    </div>';
   if (copyWord[0] === 0) {
      checkCharacter();
   }
}

function checkCharacter() {
   let firstLetter, lastLetter, word;
   word = localStorage.getItem('word');
   firstLetter = word.charAt(0);
   lastLetter = word.charAt(word.length - 1);
   let newCharacter = document.getElementById("character").value
   let finalWord = "";
   let check = 0, counter = 0;
   for(let i = 0; i < word.length; ++i) {
      let character = word.charAt(i);
      if (character === newCharacter && character !== '') {
         check = 1;
      }
      if (i === 0 || word.length - 1 === i || firstLetter === character ||
          lastLetter === character || character === firstLetter.toLowerCase() || character === newCharacter || copyWord[i] === 1) {
         finalWord += character;
         copyWord[i] = 1;
         ++counter;
      } else {
         finalWord += " _ "
      }
   }
   if (check === 0) {
      ++copyWord[copyWord.length - 1];
      if (copyWord[copyWord.length - 1] === 10) {
         document.getElementById("imageId").src = "hangman/"+ 10 +".jpg";
         document.getElementById("alert").innerHTML = '<div class="alert alert-danger" role="alert">\n' +
             '  Game Over!\n' +
             '</div>'
         return false;
      }
   } else if (counter === word.length) {
      document.getElementById("alert").innerHTML = '<div class="alert alert-success" role="alert">\n' +
          '  You won!\n' +
          '</div>'
   }
   display(copyWord[copyWord.length - 1]);
   document.getElementById("text").innerHTML = finalWord;
}

