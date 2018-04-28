// VARIÁVEIS ---------------------------->

var titleBanner = document.getElementById("titleBanner"); // Banner de título do jogo
var colorDisplay = document.getElementById("colorDisplay"); // Hint inicial da cor a ser adivinhada
var resetButton = document.getElementById("reset"); // Botão [New colors]
var modeButtons = document.getElementsByClassName("mode");
var messageDisplay = document.getElementById("message"); // Mensagem de feedback mostrada na tela (Correct / Try again)
var mode = 6;
var colors = generateRandomColors(mode); // Cores aleatórias mostradas para seleção no jogo
var square = document.getElementsByClassName("square"); // Elementos do tipo square no HTML
var selectedColor; // Cor aletória escolhida para iniciar o jogo



// FUNÇÕES ---------------------------->

// Gera a array da variável colors
function generateRandomColors(num) {
  var arr = [];
  for(var i = 0; i < num; i++){
    arr.push(randomColor());
  }
  return arr;
}

// Gera o código RGB para preencher a variável colors
function randomColor() {
  //Gera um tom aleatório de vermelho
  var r = Math.floor(Math.random() * 256);
  //Gera um tom aleatório de verde
  var g = Math.floor(Math.random() * 256);
  //Gera um tom aleatório de azul
  var b = Math.floor(Math.random() * 256);
  // retorna o valor RGB
  return "rgb(" + r + ", " + g + ", " + b + ")";
 }

// Escolhe uma cor aletória para iniciar o jogo
function selectColor() { 
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

// Altera a cor do Baner de título e das outras squares quando usuário acerta 
function changeColors(color){
  for(var i = 0; i < square.length; i++){
    square[i].style.backgroundColor = color;
    titleBanner.style.backgroundColor = color;
  }
}

// Reseta o estado inicial do jogo
function reset() {
  titleBanner.style.backgroundColor = "#5599ff";
  resetButton.textContent = "New colors";
  messageDisplay.textContent = " ";
  // Gera cores novas
  colors = generateRandomColors(mode);
  // Seleciona uma cor da variável (colors) e altera o hint inicial
  selectedColor = selectColor();
  colorDisplay.textContent = selectedColor;
  // Muda as cores das squares
  for(var i = 0; i < square.length; i++) {
    // Inicia a atribuição inicial de cores
    if(colors[i]) { 
      square[i].style.display = "block";
      square[i].style.backgroundColor = colors[i]; 
    }
    else {square[i].style.display = "none";}
  }
}



function init() {
  // Botão [New colors]
  resetButton.addEventListener("click", function(){ 
    reset(); 
  });

  // Funcionamento dos botões [Easy / Hard]
  for(var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
        if(this.textContent === "Easy") { mode = 3; }
        else { mode = 6; }
      reset();
    });
  }
  
  // Atribui listeners a cada square
  for(var i = 0; i < square.length; i++) {
    square[i].addEventListener("click", function() {
      // Detecta cor escolhida pelo usuário
      var clickedColor = this.style.backgroundColor;
      // Compara cor escolhida com selectedColor e retorna o resultado
      if(clickedColor === selectedColor) {
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play again?";
        changeColors(clickedColor);

      } 
      else{
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try again...";
      }
    });
  }
  reset()
}


// START GAME ---------------------------->
init();