"use strict"

let puntuacionUser = 0;
let puntuacionComputer = 0;

let puntuacionUser_span = document.getElementById('user-score');
let puntuacionComputer_span = document.getElementById('computer-score');
let puntuacion_div = document.getElementById('puntuacion');
let resultado_div = document.getElementById('resultado');

let opcion_vs_user = document.getElementById('opcion-user');
let opcion_vs_pc = document.getElementById('opcion-pc');


document.getElementById('piedra').addEventListener('click', () => jugar('piedra'));
document.getElementById('papel').addEventListener('click', () => jugar('papel'));
document.getElementById('tijera').addEventListener('click', () => jugar('tijera'));
let imgVs = document.querySelectorAll('.opcion-vs img');

const win = new Audio();
win.src= "sound-effects/correcto.mp3";
const tie = new Audio();
tie.src = "sound-effects/empate.mp3";
const lose = new Audio();
lose.src= "sound-effects/perdedor.mp3";

function jugar(eleccionUsuario) {
    let eleccionComp = eleccionComputer();
    document.getElementById('vs-contenedor').classList.remove('vs-none');
    document.getElementById('vs-contenedor').classList.add('vs');
    document.getElementById('vs-user').src= 'img/'+eleccionUsuario+'.png';
    document.getElementById('vs-p').innerHTML="VS";
    document.getElementById('vs-pc').src= 'img/'+eleccionComp+'.png';
    for(let i=0; i<imgVs.length; i++) {
        imgVs[i].classList.add('show');
    }

    switch (eleccionUsuario + eleccionComp) {
        case 'papelpiedra':
        case 'piedratijera':
        case 'tijerapapel':
            ganador(eleccionUsuario, eleccionComp);
        break;

        case 'piedrapapel':
        case 'papeltijera':
        case 'tijerapiedra':
            perdedor(eleccionUsuario, eleccionComp);
        break;

        case 'piedrapiedra':
        case 'papelpapel':
        case 'tijeratijera':
            empate(eleccionUsuario, eleccionComp);
        break;
    }
}

function eleccionComputer() {
    let opciones = ['piedra', 'papel', 'tijera'];
    let posicion_aleatoria = Math.floor(Math.random() *3);
    return opciones[posicion_aleatoria];
}

function ganador(user, computer) {
    puntuacionUser++;

    puntuacionUser_span.innerHTML = puntuacionUser;
    let userName = ' (yo)'.fontsize(3).sup();
    let compName = ' (pc)'.fontsize(3).sup();
    resultado_div.innerHTML = `<p>${(user)}${userName} le gana a
                                  ${(computer)}${compName}. Ganaste!</p>`;

    let estadoRonda = document.getElementById(user);
    estadoRonda.classList.add('estiloGanador');
    setTimeout(() => estadoRonda.classList.remove('estiloGanador'), 500);
    win.play();   

    opcion_vs_pc.classList.add('estiloPerdedor');
    opcion_vs_user.classList.add('estiloGanador','zoom');
    setTimeout(() => opcion_vs_pc.classList.remove('estiloPerdedor'), 1000);
    setTimeout(() => opcion_vs_user.classList.remove('estiloGanador','zoom'), 1000);
    setTimeout(() => {
        for (let i = 0; i < imgVs.length; i++) {
          imgVs[i].classList.remove('show');
        }
      }, 1200);
}

function perdedor(user, computer) {
    puntuacionComputer++;

    puntuacionComputer_span.innerHTML = puntuacionComputer;
    let userName = ' (yo)'.fontsize(3).sup();
    let compName = ' (pc)'.fontsize(3).sup();
    resultado_div.innerHTML = `<p>${(computer)}${compName} le gana a
                                  ${(user)}${userName}. Perdiste!</p>`;

    let estadoRonda = document.getElementById(user);
    estadoRonda.classList.add('estiloPerdedor');
    setTimeout(() => estadoRonda.classList.remove('estiloPerdedor'), 500);
    lose.play();   
    
    opcion_vs_user.classList.add('estiloPerdedor','zoom');
    opcion_vs_pc.classList.add('estiloGanador');
    setTimeout(() => opcion_vs_user.classList.remove('estiloPerdedor','zoom'), 1000);
    setTimeout(() => opcion_vs_pc.classList.remove('estiloGanador'), 1000);
    setTimeout(() => {
        for (let i = 0; i < imgVs.length; i++) {
          imgVs[i].classList.remove('show');
        }
      }, 1200);
}

function empate(user, computer){
    let userName = ' (yo)'.fontsize(3).sup();
    let compName = ' (pc)'.fontsize(3).sup();
    resultado_div.innerHTML = `<p>Empate! los dos eligieron ${(user)}</p>`;

    let estadoRonda = document.getElementById(user);
    estadoRonda.classList.add('estiloEmpate');
    setTimeout(() => estadoRonda.classList.remove('estiloEmpate'), 500);
    tie.play();   

    opcion_vs_pc.classList.add('estiloEmpate');
    opcion_vs_user.classList.add('estiloEmpate');
    setTimeout(() => opcion_vs_pc.classList.remove('estiloEmpate'), 1000);
    setTimeout(() => opcion_vs_user.classList.remove('estiloEmpate'), 1000);
    setTimeout(() => {
        for (let i = 0; i < imgVs.length; i++) {
          imgVs[i].classList.remove('show');
        }
      }, 1200);
}

   



