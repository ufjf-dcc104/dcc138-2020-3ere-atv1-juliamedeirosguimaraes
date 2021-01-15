let canvas = document.querySelector("canvas");
canvas.width = 960;
canvas.height = 720;

let contexto = canvas.getContext("2d");
                // posição 0, 0 (meio) de tamanho max (largura x altura)
contexto.fillRect (0, 0, canvas.width, canvas.height);

contexto.fillStyle = "white";
                // posição 470, 350 (meio) de tamanho 20 x 20
contexto.fillRect(470,350, 20, 20);
