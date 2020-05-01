//------------------CANVAS-----------------
let Canvas,
    Ctx,
    CanvasX= 750,
    CanvasY= 750,
    TileX,TileY,
    blanco='#FFFFFF',
    negro='#000000',
    colorAnt='blue', //hormiga es represtentada como un 2 en su propia matriz (color azul)
    colorX, //color que se retorna de una funcion;
    celdasSuma=0;
let celdas=document.getElementById('celdas');
let Ite=document.getElementById('iteracion');
let color1='#fa744f';
let color2='#0779e4';
let color3='#f4e04d';
let color4='#10375c';
//------------------CANVAS-----------------
//------------------Ant-----------------
let sentido= 3; // toma 4 valores en sentido horario parte mirando hacia arriba(1)
/*
   |__|_1|__|
   |_4|_A|_2|
   |__|_3|__|
 */
let filas=350,
    columnas=350,
    fps=60,
    Tablero,
    ant, //la hormiga es una matriz llena de 0, que esta "superpuesta" sobre la matriz Tablero
    antx,
    anty,//posicion de la hormiga
    generacion=0;
//------------------Ant-----------------
function hormiga(tab){
    for (let i=0;i<filas;i++){
        for (let j=0;j<columnas;j++){
            //Si está sobre un cuadrado negro("tabla=1"), cambia el color del cuadrado, gira noventa grados a la derecha y avanza un cuadrado.
            if (ant[i][j]==2 && tab[i][j]==1){
                Ctx.fillStyle=colorAnt;
                Ctx.fillRect(i*TileX,j*TileY,TileX,TileY);
                //cambio el valor del tablero por un cero(blanco)
                tab[i][j]=0;
                antx=i;
                anty=j;
                //como inicia en 0 solo una vez partira mirando hacia arriba(1), y luego girar el sentido a la derecha(+1)
                ++sentido;
                ++generacion;
                if (sentido==5){
                    sentido=1; // se reinicia sus sentidos en la pos 1
                }
                ++celdasSuma;
                return blanco;// cambia a color blanco que se envia a la funcion pintar
            }
            //Si está sobre un cuadrado blanco ("tabla=0"), cambia el color del cuadrado, gira noventa grados a la izquierda y avanza un cuadrado.
            if (ant[i][j]==2 && tab[i][j]==0){
                Ctx.fillStyle=colorAnt;
                Ctx.fillRect(i*TileX,j*TileY,TileX,TileY);
                //cambio el valor del tablero por un 1(negro)
                tab[i][j]=1;
                antx=i;
                anty=j;
                //el sentido cambia hacia la izquierda
                --sentido;
                ++generacion;
                if (sentido==0){
                    sentido=4; // se reinicia sus sentidos en la pos 4
                }
                return negro;
            }
        }
    }
}

function pintar(tab){
    colorX=hormiga(tab);
        //como la hormiga ya tomo el sentido(hizo un grio en noventa grados hacia la derecha), avanza
         switch (sentido) {
            case 1:
                /*
                   |__|_x|__|
                   |_4|_A|_2|
                   |__|_3|__|
                 */
                //console.log('arriba');
                //donde esta actualmente lo deja en blanco
                Ctx.fillStyle=colorX;
                Ctx.fillRect(antx*TileX,anty*TileY,TileX,TileY);
                //como la hormiga ya estuvo en la cordenada, antes de avanzar queda un 0 en la matriz, y luego avanza para ingresar un 2
                ant[antx][anty]=0;

                //avanza hacia arriba la hormiga quedando un bloque colorAnt
                ant[antx][--anty]=2;
                Ctx.fillStyle=colorAnt;
                Ctx.fillRect(antx*TileX,anty*TileY,TileX,TileY);
                break;
            case 2:
                /*
                   |__|_1|__|
                   |_4|_A|_x|
                   |__|_3|__|
                 */
                //console.log('derecha');
                Ctx.fillStyle=colorX;
                Ctx.fillRect(antx*TileX,anty*TileY,TileX,TileY);
                //como la hormiga ya estuvo en la cordenada, antes de avanzar queda un 0 en la matriz, y luego avanza para ingresar un 2
                ant[antx][anty]=0;

                //avanza hacia la derecha
                ant[++antx][anty]=2;
                Ctx.fillStyle=colorAnt;
                Ctx.fillRect(antx*TileX,anty*TileY,TileX,TileY);
                break;
            case 3:
                /*
                   |__|_1|__|
                   |_4|_A|_2|
                   |__|_x|__|
                 */
                //console.log('abajo');
                Ctx.fillStyle=colorX;
                Ctx.fillRect(antx*TileX,anty*TileY,TileX,TileY);
                //como la hormiga ya estuvo en la cordenada, antes de avanzar queda un 0 en la matriz, y luego avanza para ingresar un 2
                ant[antx][anty]=0;
                //avanza hacia la derecha
                ant[antx][++anty]=2;
                Ctx.fillStyle=colorAnt;
                Ctx.fillRect(antx*TileX,anty*TileY,TileX,TileY);
                break;
            case 4:
                /*
                   |__|_1|__|
                   |_x|_A|_2|
                   |__|_3|__|
                 */
                //console.log('izquierda');
                Ctx.fillStyle=colorX;
                Ctx.fillRect(antx*TileX,anty*TileY,TileX,TileY);
                //como la hormiga ya estuvo en la cordenada, antes de avanzar queda un 0 en la matriz, y luego avanza para ingresar un 2

                ant[antx][anty]=0;

                //avanza hacia la derecha
                ant[--antx][anty]=2;
                Ctx.fillStyle=colorAnt;
                Ctx.fillRect(antx*TileX,anty*TileY,TileX,TileY);
                break;
        }
    Ite.innerHTML='Iteracion: '+generacion;
    celdas.innerHTML='Celdas: '+celdasSuma;
}

function TamañoCanvas(){
    Canvas=document.getElementById('canvas');
    Ctx=Canvas.getContext('2d');

    Canvas.width=CanvasX;
    Canvas.height=CanvasY;

    TileX=Math.floor(CanvasX/filas);
    TileY=Math.floor(CanvasY/columnas);

    //inicializo el tablero con bloques negros(representado por un "1")
    Tablero= new Array(filas);
    for (let y=0; y<filas;y++){
        Tablero[y]=new Array(columnas);
    }
    for (let i=0;i<filas;i++){
        for (let j=0;j<columnas;j++){
            Tablero[i][j]=1;
            Ctx.fillStyle=negro;
            Ctx.fillRect(i*TileX,j*TileY,TileX,TileY);
        }
    }
    //inicializo la hormiga al medio del tablero con bloque colorAnt( representado por un "2")
    ant =new Array(filas);
        for (let y=0;y<filas;y++){
            ant[y]=new Array(columnas);
        }
    ant[Math.floor(filas/2)][Math.floor(columnas/2)]=2;

    return Tablero;
}

function start(){
    console.log('Starting....');
    Tablero=TamañoCanvas();
    setInterval(function () { pintar(Tablero) },0 );
}