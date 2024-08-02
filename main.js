import axios from 'axios';
import './style.css'

const extractParams = (pokemonData) => {
  const id = pokemonData.id;
  const name = pokemonData.name;
  const img = pokemonData.sprites.front_default
  const types = [];
  pokemonData.types.forEach(typeItem => {
    types.push(typeItem.type.name);
  });
  console.log("types:", types);
  return {id, name, img, types}
}

const showData = (data) => {
  const htmlData = `<dl>
    <dt>Name: ${data.name}</dt>
    <dd><img src="${data.img}" alt=""></dd>
    <dd>ID: ${data.id}</dd>
    <dt>Types: ${data.types.join(", ")}</dd>
  </dl>`
  document.querySelector("#js-result").innerHTML = htmlData;
}

const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/',
  timeout: 1000,
});

// instance
const submitHandler = async (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  const pokeName = form.get("pokeName").toLowerCase();
  console.log("pokeName:", pokeName);

  try {
    const response = await instance.get(pokeName);
    console.log("response:", response.data);
    const extractedData = extractParams(response.data)
    showData(extractedData);
  } catch (error) {
    console.error(error);
    alert("Pokemon not found");
  }
  
  // console.log(response.data);
  // document.querySelector("#js-result").innerHTML = response.data.name;
}
document.querySelector("#js-form").addEventListener("submit", (e) => submitHandler(e));