import HR from "./hr.js";


const inputTextEl = document.querySelector('#input-box')
const wordListEl =  document.querySelector('#list')
const wordListContainerEl = document.querySelector('#word-list')
const showTestEl = document.querySelector('#test-box')
const clueListEl = document.querySelector('#clues-list')
const clueHeadingEl = document.querySelector('#clues-heading')

const showTestBtn = document.querySelector('#show-test')
const checkTestBtn = document.querySelector('#check-test')
const saveTextBtn = document.querySelector('#save-text')
const loadTextBtn = document.querySelector('#load-text')


//two variables to store selectd words/phrases and the pasted-in article
const selectedTextArr = []
let pastedData;


//to display pasted-into text in a "#test-box" div
function handlePaste(e) {

  const clipboardData = e.clipboardData || window.clipboardData;
  pastedData = clipboardData.getData('text/plain');
  showTestEl.innerHTML = pastedData;
  inputTextEl.setAttribute('contenteditable', false)
  inputTextEl.style.fontSize = 30px;
}


//to grab selected words/phrases and show them in the word list
function getText() {
    const selectedText = [];
    const target = window.getSelection().toString();
      if (target !== null && target !== '' && target !== '/new') {
        selectedText.push(target);
      }
  selectedTextArr.push(...selectedText)
  showText(...selectedText)
  
}

function showText(text) {
   if(text) {
    wordListEl.innerHTML += `<li>${text}</li>`
   }
    
}
// transform words on pastedData into blanks (e.g. change color and turn words into parenthesis)
function createTest() {
  let list =  [...selectedTextArr];
    new HR('#test-box', {
      highlight: list,
      replaceWith: list.map((el) => '( )'),
      backgroundColor: '#B4FFEB',
    }).hr();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const showList = function (htmlEl, wordArr) {
  let str = '';
  wordArr.forEach(function (word) {
    str += '<li>' + word + '</li>';
  });

  htmlEl.innerHTML = str;
};

function showTest() {

  wordListContainerEl.style.display = "none"
  inputTextEl.style.display = 'none';
  const selectedTextArrCopy = [...selectedTextArr];
  const  shuffledTextArr = shuffleArray(selectedTextArrCopy);
  
  showTestEl.focus();
  showTestEl.style.display = 'block';
  clueListEl.style.display = "block"
  clueHeadingEl.style.display = "block"
  createTest();
  showList(clueListEl, shuffledTextArr);
     
};

function checkTest() {
  inputTextEl.style.display = 'block';
  clueHeadingEl.style.display = 'none'
  clueListEl.style.display = "none"
  showTestEl.style.display = "block";
}


function download(file, text) {
             
  //creating an invisible element
  var element = document.createElement('a');
  element.setAttribute('href',
  'data:text/html;charset=utf-8, '
  + encodeURIComponent(text));
  element.setAttribute('download', file);

  // Above code is equivalent to
  // <a href="path of file" download="file name">

  document.body.appendChild(element);

  //onClick property
  element.click();

  document.body.removeChild(element);
}

function saveText() {
  inputTextEl.setAttribute('contenteditable', false)
  const text = document.querySelector('#list').innerHTML + "<br/>" + "<br/>"+ document.querySelector('#input-box').innerHTML 
  
  
  var filename = "input file name";
  console.log('from input box', text)
  download(filename, text);
            
}


function saveList() {
  // inputTextEl.setAttribute('contenteditable', false)
  var text = document.querySelector('#list').innerHTML;
  var filename = "choose file name";
  
  download(filename, text);
            
}


// function upload(filePath) {
//    fetch(filePATH)
//   .then(response=> response.text())
//   .then(text=> inputTextEl.innerHTML = text);
 
// }



inputTextEl.addEventListener('click', getText);
inputTextEl.addEventListener('paste', handlePaste);
showTestBtn.addEventListener('click', showTest)
checkTestBtn.addEventListener('click', checkTest)
saveTextBtn.addEventListener('click', saveText)
saveListBtn.addEventListener('click', upload)




