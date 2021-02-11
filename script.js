// CRIAÇÃO DO CANVAS
let canvas = document.querySelector("canvas");
canvas.width = 960;
canvas.height = 720;

// INFORMAÇÕES DO QUADRADINHO
let posX = 470
let posY = 350;

//Velocidade de X e Y
let vX = 0;
let vY = 0;

//Em função do tempo
let t0;
let dt;

// DEFINIÇÃO DE CONTEXTO
let contexto = canvas.getContext("2d");
                // posição 0, 0 (meio) de tamanho max (largura x altura)
contexto.fillRect (0, 0, canvas.width, canvas.height);

requestAnimationFrame(frame);

function frame(t)
{
    //Colocar em função do tempo e nao do fps
    t0 = t0 ?? t;
    dt = (t - t0)/1000;

    //Cria fundo preto para limpar
    contexto.fillStyle = "black";
    contexto.fillRect (0, 0, canvas.width, canvas.height);

    //Atualiza estado
    attEstado(t);


    //Desenha elemento
    contexto.fillStyle = "white";
    contexto.fillRect(posX, posY, 20, 20);

    //Request next
    requestAnimationFrame(frame);
    t0 = t;
}

function attEstado(t)
{
    posX = posX + vX *dt;
    posY = posY + vY *dt;
}

addEventListener("keydown", teclaPressionada);
addEventListener("keyup", teclaSolta);

function teclaPressionada(event) 
{
    switch(event.key)
    {
        case "ArrowUp":
            vY = -200;
            break;
        case "ArrowDown":
            vY = +200;
            break;
        case "ArrowRight":
            vX = +200;
            break;
        case "ArrowLeft":
            vX = -200;
            break;
    }
}

function teclaSolta(event) 
{
    switch(event.key)
    {
        case "ArrowUp":
        case "ArrowDown":
            vY = 0;
            aY = 0;
            break;
        case "ArrowRight":
        case "ArrowLeft":
            vX = 0;
            aX = 0;
            break;
    }
}