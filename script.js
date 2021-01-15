let canvas = document.querySelector("canvas");
canvas.width = 640;
canvas.height = 480;


let contexto = canvas.getContext("2d");
                // posição 0, 0 (meio) de tamanho max (largura x altura)
contexto.fillRect (0, 0, canvas.width, canvas.height);

contexto.fillStyle = "white";
                // posição 310, 230 (meio) de tamanho 20 x 20
contexto.fillRect(310,230, 20, 20);