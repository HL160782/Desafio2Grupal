var canvas= document.getElementById("game");
var ctx = canvas.getContext("2d");
//Crear el objeto de la nave
var rectangulo = {
	x:100,
	y: canvas.height-100,
	width:50,
	height:50
}
var teclado={};
function loadMedia(){
	fondo = new Image();
	fondo.src= 'img/space2.jpg';
	fondo.onload= function(){
		var interval = window.setInterval(frameloop,1000/50);
	}
	/*preloader= new PreloadJS();
	preloader.onProgress= progresoCarga();
	cargar();*/
}
function dibujarFondo(){
	ctx.drawImage(fondo,0,0);
}

function dibujarNave(){
	ctx.save();
	ctx.fillStyle="white";
	ctx.fillRect(rectangulo.x,rectangulo.y,rectangulo.width,rectangulo.height);
	ctx.restore();
}
function agregarEventosTeclado(){
	agregarEventos(document,"keydown",function(e){
		//Ponemos en true la tecla presionada
		teclado[e.keyCode]= true;
		console.log(e.keyCode);
	});
	agregarEventos(document,"keyup",function(e){
		//Ponemos en false la tecla dejo de ser presionada
		teclado[e.keyCode]= false;
	});
	function agregarEventos(elemento, nombreEvento,funcion){
		if(elemento.addEventListener){
			//Otros Navegadores
			elemento.addEventListener(nombreEvento,funcion,false);
		}
		else if(elemento.attachEvent){
			//IE
			elemento.attachEvent(nombreEvento,funcion);
		}
	}
}
function moverNave(){
	if(teclado[37]){
		//mOVIMIENTO A LA IZQUIERDA
		rectangulo.x-=10;
		if(rectangulo.x<0){
			rectangulo.x=0;
		}
	}
	if(teclado[39]){
		//mOVIMIENTO A LA DERECHA
		var limite= canvas.width- rectangulo.width;
		rectangulo.x += 10;
		if(rectangulo.x > limite){
			rectangulo.x= limite;
		}
	}
	if(teclado[38]){
		rectangulo.y-=10;
		if(rectangulo.y<0){
			rectangulo.y=0;
		}

	}
	if(teclado[40]){
		var limite = canvas.height-rectangulo.height;
		rectangulo.y+=10;
		if(rectangulo.y>limite){
			rectangulo.y= limite;
		}
	}
}
function frameloop(){
	moverNave();
	dibujarFondo();
	dibujarNave();

}

window.addEventListener("load", init);
function init(){
	agregarEventosTeclado();
	loadMedia();	
}