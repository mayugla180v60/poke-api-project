import axios from 'axios';

export const getEvolutionChain = async (pokeName) => {
  try {
    const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}`);
    const speciesData = speciesResponse.data;
    const evolutionChainUrl = speciesData.evolution_chain.url;

    const evolutionResponse = await axios.get(evolutionChainUrl);
    const evolutionData = evolutionResponse.data;

    const evolutionList = [];
    let current = evolutionData.chain;
    do {
      const speciesName = current.species.name;
      //進化系のポケモン画像を取得
      const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${speciesName}`);
      const sprite = pokemonResponse.data.sprites.front_default;

      evolutionList.push({ name: speciesName, img: sprite });
      current = current.evolves_to[0];
    } while (current);

    return evolutionList;
  } catch (error) {
    console.error('エラー:', error);
    throw error;
  }
};

export const showEvolutionData = (evolutionList) => {
  const htmlEvoData = `<dl>
    <dt>進化系</dt>
    ${evolutionList.map(evo => `
      <dd>
        <img src="${evo.img}" alt="${evo.name}" style="width:50px;height:50px;">
        ${evo.name}
      </dd>
    `).join('')}
  </dl>`;
  document.querySelector("#js-evolution").innerHTML = htmlEvoData;
};

