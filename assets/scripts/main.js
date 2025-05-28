import '../styles/style.css';
import { getPokemonData } from './modules/HttpRequest';
import { extractData, showData } from './modules/PokemonData';
import { getEvolutionChain, showEvolutionData } from './modules/EvolutionChain';

const getInputName = (e) => {
  const form = new FormData(e.target);
  const pokeName = form.get("pokeName").toLowerCase();
  return pokeName;
}

const submitHandler = async (e) => {
  e.preventDefault();
  const inputName = getInputName(e);
  const pokemonData = await getPokemonData(inputName);
  const extractedData = extractData(pokemonData);
  showData(extractedData);

  const evolutionNames = await getEvolutionChain(inputName);
  showEvolutionData(evolutionNames);
}

document.querySelector("#js-form").addEventListener("submit", (e) => submitHandler(e));