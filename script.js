// CRIAÇÃO DO CANVAS
let canvas = document.querySelector("canvas");
canvas.width = 960;
canvas.height = 720;

// CRIAÇÃO DO PLAYER EM OBJETO
let player = {
    // Posição
    posX: 470,
    posY: 350,

    // MOVIMENTO
        // Velocidade nos eixos X e Y
        vX: 0,
        vY: 0,

        // Aceleração
        aX: 0,
        aY: 0,

    //METODOS
    desenhar: function() 
    {
        //Desenha elemento
        contexto.fillStyle = "white";
        contexto.fillRect(this.posX, this.posY, 20, 20);
    }
};

let enemy = {
    // Posição
    posX: 20,
    posY: 20,

    // MOVIMENTO
        // Velocidade nos eixos X e Y
        vX: 0,
        vY: 0,

        // Aceleração
        aX: 0,
        aY: 0
};

//Velocidade de X e Y
const K = 200;

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

    //Desenha Player
    player.desenhar();

    //Atualiza estado
    attEstado(t);

    //Request next
    requestAnimationFrame(frame);
    t0 = t;
}

function attEstado(t)
{
    //Dinamicamente definindo posição
    player.vX = player.vX + player.aX * dt;
    player.vY = player.vY + player.aY * dt;
    player.posX = player.posX + player.vX *dt;
    player.posY = player.posY + player.vY *dt;
}

addEventListener("keydown", teclaPressionada);
addEventListener("keyup", teclaSolta);

function teclaPressionada(event) 
{
    switch(event.key)
    {
        case "ArrowUp":
            player.aY = -K;
            break;
        case "ArrowDown":
            player.aY = +K;
            break;
        case "ArrowRight":
            player.aX = +K;
            break;
        case "ArrowLeft":
            player.aX = -K;
            break;
    }
}

function teclaSolta(event) 
{
    switch(event.key)
    {
        case "ArrowUp":
        case "ArrowDown":
            //player.vY = 0;
            player.aY = 0;
            break;
        case "ArrowRight":
        case "ArrowLeft":
            //player.vX = 0;
            player.aX = 0;
            break;
    }
}