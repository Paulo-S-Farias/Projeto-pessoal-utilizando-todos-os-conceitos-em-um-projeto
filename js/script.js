const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const jump = () => {
  mario.classList.add('jump');

  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500)

}

const loop= setInterval(() => {

  console.log('loop')

  const pipePosition =pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  console.log(marioPosition);
  
  if (pipePosition <= 120 &&pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.left = `${marioPosition}px`;

    mario.src = './images/game-over.png';
    mario.style.width = '75px'
    mario.style.marginLeft = '50px'

    clearInterval(loop);
  } 

}, 10)

document.addEventListener('keydown', jump);

class Cronometro {
  constructor(display) {
      this.display = display;
      this.reset();
      this.interval = null;
  }

  reset() {
      this.tempo = 0;
      this.atualizarDisplay();
  }

  iniciar() {
      if (this.interval) return;
      this.inicio = Date.now() - this.tempo;
      this.interval = setInterval(() => this.atualizar(), 10);
  }

  pausar() {
      clearInterval(this.interval);
      this.interval = null;
  }

  atualizar() {
      this.tempo = Date.now() - this.inicio;
      this.atualizarDisplay();
  }

  atualizarDisplay() {
      const milissegundos = Math.floor((this.tempo % 1000) / 10);
      const segundos = Math.floor((this.tempo / 1000) % 60);
      const minutos = Math.floor((this.tempo / (1000 * 60)) % 60);
      this.display.textContent = 
          `${this.pad(minutos)}:${this.pad(segundos)}:${this.pad(milissegundos)}`;
  }

  pad(numero) {
      return numero.toString().padStart(2, '0');
  }
}

class Jogo {
  constructor() {
      this.mario = document.querySelector('.mario');
      this.pipe = document.querySelector('.pipe');
      this.displayCronometro = document.querySelector('#displayCronometro');
      this.cronometro = new Cronometro(this.displayCronometro);
      this.loop = null;
      this.iniciar();
  }

  iniciar() {
      document.addEventListener('keydown', () => this.pular());
      this.cronometro.iniciar();
      this.loop = setInterval(() => this.atualizar(), 10);
  }

  pular() {
      this.mario.classList.add('jump');

      setTimeout(() => {
          this.mario.classList.remove('jump');
      }, 500);
  }

  atualizar() {
      const pipePosition = this.pipe.offsetLeft;
      const marioPosition = +window.getComputedStyle(this.mario).bottom.replace('px', '');

      if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
          this.pipe.style.animation = 'none';
          this.pipe.style.left = `${pipePosition}px`;

          this.mario.style.animation = 'none';
          this.mario.style.left = `${marioPosition}px`;

          this.mario.src = './images/game-over.png';
          this.mario.style.width = '75px';
          this.mario.style.marginLeft = '50px';

          clearInterval(this.loop);
          this.cronometro.pausar();
      }
  }
}

const jogo = new Jogo();