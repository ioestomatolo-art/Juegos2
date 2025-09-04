const cartasBase = [
  "imagenes/azucar.jpg",
  "imagenes/cepillo.jpg",
  "imagenes/diente.jpg",
  "imagenes/enjuague.jpg",
  "imagenes/implante.jpg",
  "imagenes/pasta.jpg",
  "imagenes/manzana.jpg",
  "imagenes/sonrisa.jpg"
];

let cartas = [];
let seleccionadas = [];
let bloqueado = false;
let parejasEncontradas = 0;

function iniciarJuego() {
  const tablero = document.getElementById("tablero");
  const mensaje = document.getElementById("mensaje");
  tablero.innerHTML = "";
  mensaje.textContent = "";
  parejasEncontradas = 0;

  // duplicar y mezclar cartas
  cartas = [...cartasBase, ...cartasBase].sort(() => 0.5 - Math.random());

  cartas.forEach((src, i) => {
    const div = document.createElement("div");
    div.classList.add("carta");
    div.dataset.valor = src;
    div.dataset.index = i;
    div.addEventListener("click", voltearCarta);

    const inner = document.createElement("div");
    inner.classList.add("carta-inner");

    // reverso (parte que se ve al inicio)
    const front = document.createElement("div");
    front.classList.add("carta-front");

    // parte trasera (imagen que aparece al voltear)
    const back = document.createElement("div");
    back.classList.add("carta-back");
    const img = document.createElement("img");
    img.src = src;
    back.appendChild(img);

    inner.appendChild(front);
    inner.appendChild(back);
    div.appendChild(inner);

    tablero.appendChild(div);
  });
}

function voltearCarta() {
  if (bloqueado) return;
  if (this.classList.contains("volteada")) return;

  this.classList.add("volteada");
  seleccionadas.push(this);

  if (seleccionadas.length === 2) {
    comprobarPareja();
  }
}

function comprobarPareja() {
  bloqueado = true;
  const [carta1, carta2] = seleccionadas;

  if (carta1.dataset.valor === carta2.dataset.valor) {
    parejasEncontradas++;
    document.getElementById("mensaje").textContent =
      "¡Bien hecho! Encontraste una pareja 🦷✨";
    seleccionadas = [];
    bloqueado = false;

    if (parejasEncontradas === cartasBase.length) {
      document.getElementById("mensaje").textContent =
        "¡Felicidades! Has completado el memorama de salud dental 🎊";
    }
  } else {
    setTimeout(() => {
      carta1.classList.remove("volteada");
      carta2.classList.remove("volteada");
      seleccionadas = [];
      bloqueado = false;
    }, 1000);
  }
}

// iniciar automáticamente al cargar
iniciarJuego();
