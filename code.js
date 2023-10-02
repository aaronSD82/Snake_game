document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.game-container');
    let snake = [{ x: 200, y: 200 }];
    let direction = { x: 0, y: 0 };
    let food = {};
    let cuerpo = {};
    let fin = false;
    let comiendo = false;
    let puntos = 0;
    let nivel = 1;
    let time = 160;

  
    function generateFood() {
      food = {
        x: Math.floor(Math.random() * 20) * 40,
        y: Math.floor(Math.random() * 20) * 40,
      };
      const foodElement = document.createElement('div');
      foodElement.classList.add('food');
      foodElement.style.left = `${food.x}px`;
      foodElement.style.top = `${food.y}px`;
      container.appendChild(foodElement);

      
    }
  
    function update(r) {
      const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
      snake.unshift(head);
      //Lógica para que al llegar a los bordes salte al lado contrario del tablero de juego.
      if(head.x === 800) head.x = 0;
      
      else if(head.x === -40) head.x = 760;

      if(head.y === 800) head.y = 0;

      else if(head.y === -40) head.y = 760;
      
      if (head.x === food.x && head.y === food.y) {  //Comprueba que has comido comida.

        crearSerpiente();

        if(nivel % 5 == 0) time -= 10;

      } else {
        snake.pop();
        comiendo = false;
      }

      if(!comiendo){
        comprobarColision(head);
      }else snake.pop();
  
      const snakeElements = document.querySelectorAll('.snake');
      snakeElements.forEach((element, index) => {
        if (index === 0) {
          element.style.left = `${head.x}px`;
          element.style.top = `${head.y}px`;
          
        }else{

          colocarCuerpo(element, index);
        } 
          
        });

      function colocarCuerpo(element, index){

        element.style.left = `${snake[index].x}px`;
        element.style.top = `${snake[index].y}px`;

      } 

      function crearSerpiente() {
        const cuerpoSnake = document.createElement('div');
        cuerpoSnake.classList.add('snake');
        container.appendChild(cuerpoSnake);
        cuerpo = { x: food.x, y: food.y };
        snake.push(cuerpo);
        const foodElement = document.querySelector('.food');
        container.removeChild(foodElement);
        generateFood();
        comiendo = true;
        puntos += 10;
        nivel += 1;
      }

      //Zona de la tabla para la puntuacion.
      const dir_x = document.getElementById('tabla_x');
      const dir_y = document.getElementById('tabla_y');

      dir_x.innerHTML = puntos;
      dir_y.innerHTML = nivel;

      
      
    }
  
    function changeDirection(event) {
      const keyPressed = event.keyCode;
      if (keyPressed === 37 && direction.x !== 40) {
        direction = { x: -40, y: 0 };
      } else if (keyPressed === 38 && direction.y !== 40) {
        direction = { x: 0, y: -40 };
      } else if (keyPressed === 39 && direction.x !== -40) {
        direction = { x: 40, y: 0 };
      } else if (keyPressed === 40 && direction.y !== -40) {
        direction = { x: 0, y: 40 };
      } 
    }

    function comprobarColision(head){

      if(snake.length > 1){

        for(let i = 1; i < snake.length; i++){

          if(head.x === snake[i].x && head.y === snake[i].y ){

            fin = true;
            const mensajeFinal = document.querySelector(".final");
            mensajeFinal.style.display = "block";

          } 
        }
      }  
    }
  
    function gameLoop() {
      if(!fin){
        update();
        setTimeout(gameLoop, time);
      }
    }

    document.addEventListener('keydown', changeDirection);
    generateFood();
    gameLoop(); 

});
  