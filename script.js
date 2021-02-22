// CRIAÇÃO DO CANVAS
let canvas = document.querySelector("canvas");
canvas.width = 960;
canvas.height = 720;
let pontos = 0;

// DEFINIÇÃO DE CONTEXTO
let contexto = canvas.getContext("2d");
contexto.fillStyle = "black";
contexto.fillRect (0, 0, canvas.width, canvas.height);


// CRIAÇÃO DAS ENTIDADES
let player = {
    // SKIN
    cor: "white",
    w: 40,
    h: 40,

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

    mover: moverElemento,
    desenhar: desenharElemento
};


const enemies = [];
for (let ne = 0; ne <10; ne++)
{
    let e = {
        cor: "red",
        w: 20,
        h: 20,
    
        // Posição
        posX: 1000 + (canvas.width-20) * Math.random(),
        posY: (canvas.height-20) * Math.random(),
    
        // MOVIMENTO
            // Velocidade nos eixos X e Y
            vX: 0,
            vY: 0,
    
            // Aceleração
            aX: 0,
            aY: 0,
    
        mover: moverElemento,
        desenhar: desenharElemento,
        perseguir: perseguirAlvo
    };
    enemies.push(e);
}

let o = {
    // SKIN
    cor: "blue",
    w: 10,
    h: 10,

    // Posição
    posX: canvas.width + 20,
    posY: -20,
 
    // MOVIMENTO
        // Velocidade nos eixos X e Y
        vX: 0,
        vY: 0,

        // Aceleração
        aX: 0,
        aY: 0,

    mover: moverElemento,
    desenhar: desenharElemento,
    controlar: function()
    {
        if (this.posX > (canvas.width + 20)){
            this.posX = -20;
            this.aX = 0;
            this.vX = 0;
        }
    }
};
enemies.push(o);


//Velocidade de X e Y
const K = 300;

//Em função do tempo
let t0;
let dt;


requestAnimationFrame(frame);
addEventListener("keydown", teclaPressionada);
addEventListener("keyup", teclaSolta);


function frame(t)
{
    //Colocar em função do tempo e nao do fps
    t0 = t0 ?? t;
    dt = (t - t0)/1000;

    //Cria fundo preto para limpar
    contexto.fillStyle = "black";
    contexto.fillRect (0, 0, canvas.width, canvas.height);

    for (let s = 0; s < enemies.length; s++)
    {
        const enemy = enemies[s];
        enemies[s].perseguir?.(player) //Perseguir Alvo
        enemies[s].mover(); //Atualiza estado
        enemies[s].desenhar(); //Desenha Elementos

        if (colidiram(o, enemy) && o !== enemy){
            o.posX = canvas.width + 20;
            o.posY = -20;
            o.vX = 0;
            o.vY = 0;
            enemy.posX = canvas.width + 2000;
            enemy.posY = canvas.height * Math.random();
            enemy.vX = 0;
            enemy.aX = 150;
            pontos += 2;
        }
        if (colidiram(player, enemy) && o !== enemy){
            enemy.posX = canvas.width + 2000;
            enemy.posY = canvas.height * Math.random();
            enemy.vX = 0;
            enemy.aX = 150;
            pontos -= 3;
        }
    }
    o.controlar();

    player.mover();//Atualiza estado
    player.desenhar(); //Desenha Elementos

    contexto.fillStyle = "yellow";
    contexto.font = "20px Impact";
    contexto.fillText(pontos, 20, 30);
    //Request next
    requestAnimationFrame(frame);
    t0 = t;
}

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
        case " ":
                o.posX = player.posX+((player.h-o.h)/2);
                o.posY = player.posY+((player.h-o.h)/2);
                o.vX = 0;
                o.aX = 200;

    }

}

function teclaSolta(event) 
{
    switch(event.key)
    {
        case "ArrowUp":
        case "ArrowDown":
            player.vY = 0;
            player.aY = 0;
            break;
        case "ArrowRight":
        case "ArrowLeft":
            player.vX = 0;
            player.aX = 0;
            break;
    }
}

function moverElemento( )
{
    //Dinamicamente definindo posição
    this.vX = this.vX + this.aX * dt;
    this.vY = this.vY + this.aY * dt;
    this.posX = this.posX + this.vX *dt;
    this.posY = this.posY + this.vY *dt;
}

function desenharElemento( ) 
{
    //Desenha elemento
    contexto.fillStyle = this.cor;
    contexto.fillRect(this.posX, this.posY, this.w, this.h);
}

function perseguirAlvo(alvo)
{
    this.aX = 300 * Math.sign(alvo.posX - this.posX) - 0.2 * this.vX;
    this.aY = 300 * Math.sign(alvo.posY - this.posY) - 0.2 * this.vY;
}
function evitarAlvo(alvo)
{
    this.aX = -0.5 * (alvo.posX - this.posX) - 0.2 * this.vX;
    this.aY = -0.5 * (alvo.posY - this.posY) - 0.2 * this.vY;
}

function colidiram (A,B) {
    return !(
        (A.posX > B.posX + B.w)
     || (A.posX + A.w < B.posX)
     || (A.posY > B.posY + B.h)
     || (A.posY + A.h < B.posY)
      );
    
}