// CRIAÇÃO DO CANVAS
let canvas = document.querySelector("canvas");
canvas.width = 960;
canvas.height = 720;

// POSIÇÃO DO QUADRADINHO
let posX = 470;
let posY = 350;

// DEFINIÇÃO DE CONTEXTO
let contexto = canvas.getContext("2d");
                // posição 0, 0 (meio) de tamanho max (largura x altura)
contexto.fillRect (0, 0, canvas.width, canvas.height);

frame();

function frame()
{
    //Cria fundo preto para limpar
    contexto.fillStyle = "black";
    contexto.fillRect (0, 0, canvas.width, canvas.height);

    //Branco
    contexto.fillStyle = "white";
    contexto.fillRect(posX, posY, 20, 20);
}


