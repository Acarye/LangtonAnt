let Canvas,
    Ctx,
    CanvasX= 750,
    CanvasY= 750,
    TileX,TileY,
    blanco='#FFFFFF',
    negro='#000000',
    colorAnt='blue', //hormiga es represtentada como un 2 en su propia matriz (color azul)
    colorX, //color que se pasa;
    celdasSuma=0;
let celdas=document.getElementById('celdas');
let Ite=document.getElementById('iteracion');
let sentido= 3; // toma 4 valores en sentido horario parte mirando hacia arriba(1)
let filas=350,
    columnas=350,
    fps=60,
    Tablero,
    ant, //la hormiga es una matriz llena de 0, que esta "superpuesta" sobre la matriz Tablero
    antx,
    anty,//posicion de la hormiga
    generacion=0;
function hormiga(tab){
    for (let i=0;i<filas;i++){
        for (let j=0;j<columnas;j++){
            if (ant[i][j]==2 && tab[i][j]==1){
                Ctx.fillStyle=colorAnt;
                Ctx.fillRect(i*TileX,j*TileY,TileX,TileY);
                tab[i][j]=0;
                antx=i;
                anty=j;
                ++sentido;
                ++generacion;
                if (sentido==5){
                    sentido=1; // se reinicia sus sentidos en la pos 1
                }
                ++celdasSuma;
                return blanco;// cambia a color blanco que se envia a la funcion pintar
            }
            if (ant[i][j]==2 && tab[i][j]==0){
                Ctx.fillStyle=colorAnt;
                Ctx.fillRect(i*TileX,j*TileY,TileX,TileY);
                tab[i][j]=1;
                antx=i;
                anty=j;
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
    switch (sentido) {
        case 1:
            Ctx.fillStyle=colorX;
            Ctx.fillRect(antx*TileX,anty*TileY,TileX,TileY);
            ant[antx][anty]=0;
            ant[antx][--anty]=2;
            Ctx.fillStyle=colorAnt;
            Ctx.fillRect(antx*TileX,anty*TileY,TileX,TileY);
            break;
        case 2:
            Ctx.fillStyle=colorX;
            Ctx.fillRect(antx*TileX,anty*TileY,TileX,TileY);
            ant[antx][anty]=0;
            ant[++antx][anty]=2;
            Ctx.fillStyle=colorAnt;
            Ctx.fillRect(antx*TileX,anty*TileY,TileX,TileY);
            break;
        case 3:
            Ctx.fillStyle=colorX;
            Ctx.fillRect(antx*TileX,anty*TileY,TileX,TileY);
            ant[antx][anty]=0;
            ant[antx][++anty]=2;
            Ctx.fillStyle=colorAnt;
            Ctx.fillRect(antx*TileX,anty*TileY,TileX,TileY);
            break;
        case 4:
            Ctx.fillStyle=colorX;
            Ctx.fillRect(antx*TileX,anty*TileY,TileX,TileY);
            ant[antx][anty]=0;
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