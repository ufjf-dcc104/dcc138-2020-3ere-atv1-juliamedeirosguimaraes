// CRIAÇÃO DO CANVAS
let canvas = document.querySelector("canvas");
canvas.width = 960;
canvas.height = 720;

// INFORMAÇÕES DO QUADRADINHO
let posX = 470
let posY = 350;
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
    posX = posX + (1190 * Math.sin(t/400))*dt;
    posY = posY + (800 * Math.cos(t/200))*dt;
}

