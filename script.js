const degrade4 = document.querySelector(".degrade4");
const degrade5 = document.querySelector(".degrade5");

const container = document.querySelector(".container");
const cards = document.querySelectorAll(".card");
const inputPersonagem = document.getElementById("personagem");

const tempoParaRemover = 3700;
let isScrolling = true;
let scrollSpeed = 5;
let scrollDirection = 1; 
let personagemSelecionado = false;

const removerElemento = (elemento) => {
    if (elemento) {
        elemento.style.transition = "opacity 0.5s ease-out";
        elemento.style.opacity = "0";

        setTimeout(() => {
            elemento.remove();
        }, 500);
    }
};

const scrollContinuo = () => {
    if (container && isScrolling && !personagemSelecionado) {
        container.scrollLeft += scrollSpeed * scrollDirection;

        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 1) {
            scrollDirection = -1; 
        }
        else if (container.scrollLeft <= 0) {
            scrollDirection = 1; 
        }
    }
};

const scrollParaPersonagem = (nomePersonagem) => {
    personagemSelecionado = true;

    cards.forEach((card) => {
        card.classList.remove("selecionado");
    });

    const card = Array.from(cards).find((card) => {
        const titulo = card.querySelector("div").textContent.trim();
        return titulo === nomePersonagem;
    });

    if (card) {
        card.classList.add("selecionado");

        const cardOffsetLeft = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        const containerWidth = container.clientWidth;

        container.scrollLeft = cardOffsetLeft - (containerWidth / 2) + (cardWidth / 2);
    } else {
        personagemSelecionado = false;
    }
};

inputPersonagem.addEventListener("input", (event) => {
    const nomePersonagem = event.target.value.trim();
    if (nomePersonagem) {
        scrollParaPersonagem(nomePersonagem);
    }
});

cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
        isScrolling = false;
    });

    card.addEventListener("mouseleave", () => {
        isScrolling = true;
    });
});

setTimeout(() => removerElemento(degrade4), tempoParaRemover);
setTimeout(() => removerElemento(degrade5), tempoParaRemover);

setInterval(scrollContinuo, 20);