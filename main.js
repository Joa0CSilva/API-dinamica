"use strict";

const root = document.getElementById("root");

async function tiposPage() {
  const resposta = await fetch("https://pokeapi.co/api/v2/type");
  const dados = await resposta.json();

  const titulo = document.createElement("h1");
  titulo.textContent = "Tipos de Pokémon";
  root.replaceChildren(titulo);

  const botao = document.createElement("button");
  botao.textContent = dados.results[0].name;
  botao.classList.add("botao");

  const container = document.createElement("div");
  container.classList.add("container-tipos");

  root.replaceChildren(container);

  for (let i = 1; i < dados.results.length; i++) {
    if (
      dados.results[i].name === "unknown" ||
      dados.results[i].name === "stellar"
    ) {
      continue;
    }

    const botao = document.createElement("button");
    botao.textContent = dados.results[i].name;
    botao.classList.add("botao");
    root.appendChild(botao);

    botao.onclick = function () {
      pokemonsPage(dados.results[i].name);
    };
  }
}

tiposPage();

//Página com os nomes dos pokémons do tipo escolhido
async function pokemonsPage(tipo) {
  const reposta = await fetch(`https://pokeapi.co/api/v2/type/` + tipo);
  const dados = await reposta.json();

  const titulo = document.createElement("h1");

  root.replaceChildren(titulo);

  const voltar = document.createElement("button");
  voltar.textContent = "Voltar";
  voltar.classList.add("botao");

  voltar.onclick = tiposPage;
  root.appendChild(voltar);

  for (let i = 0; i < dados.pokemon.length; i++) {
    const linha = document.createElement("div");
    linha.classList.add("linha");

    const nome = document.createElement("p");
    nome.textContent = dados.pokemon[i].pokemon.name.replaceAll("-", " ");

    const botao = document.createElement("button");
    botao.textContent = "Ver";
    botao.classList.add("botao");

    botao.onclick = function () {
      detalhesPage(dados.pokemon[i].pokemon.name, tipo);
    };

    linha.appendChild(nome);
    linha.appendChild(botao);

    root.appendChild(linha);
  }
}

//Página com os detalhes dos pokémons
async function detalhesPage(nomePokemon, tipo) {
  const resposta = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + nomePokemon,
  );
  const dados = await resposta.json();

  //Criando o card
  const card = document.createElement("div");
  card.classList.add("card");

  //Nome do Pokemon
  const nome_Pokemon = document.createElement("p");
  nome_Pokemon.textContent = dados.name;

  //Imagem do Pokemon
  const imagem = document.createElement("img");
  imagem.src = dados.sprites.front_default;

  const shiny = document.createElement("img");
  shiny.src = dados.sprites.front_shiny;

  const imagens = document.createElement("div");
  imagens.classList.add("imagens");
  imagens.appendChild(imagem);
  imagens.appendChild(shiny);

  //Altura do pokemon
  const altura = document.createElement("P");
  altura.textContent = "Altura: " + dados.height / 10 + "m";

  //Peso do pokemon
  const peso = document.createElement("p");

  peso.textContent = "Peso: " + dados.weight / 10 + "kg";

  //Tipo do pokémon escolhido
  const tipos = document.createElement("p");

  if (dados.types.length == 1) {
    tipos.textContent = "Tipo: " + dados.types[0].type.name;
  } else {
    tipos.textContent =
      "Tipo: " + dados.types[0].type.name + " / " + dados.types[1].type.name;
  }

  //Botão voltar
  const voltar = document.createElement("button");
  voltar.textContent = "Voltar";
  voltar.classList.add("botao");

  voltar.onclick = function () {
    pokemonsPage(tipo);
  };

  //Adicionando os dados na div
  card.appendChild(nome_Pokemon);
  card.appendChild(imagens);
  card.appendChild(altura);
  card.appendChild(peso);
  card.appendChild(tipos);
  card.appendChild(voltar);

  //
  root.replaceChildren(card);
}
