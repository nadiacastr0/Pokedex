function setBackgroundByType(type) {
    document.body.classList.add(type); 
}

function loadPokemonDetail(pokemon) {
    const pokemonDetailHtml = `
        <div id="pokemonDetail">
            <h2>${pokemon.name}</h2>
            <div id="pokemonNumber">N° ${pokemon.number}</div>
            <img id="pokemonImage" src="${pokemon.photo}" alt="${pokemon.name}">
            <div id="pokemonTypes">Tipos: ${pokemon.types.join(', ')}</div>
            <div id="pokemonAbilities">Habilidades: ${pokemon.abilities.join(', ')}</div>
            <div id="pokemonHeight">Altura: ${pokemon.height} m</div>
            <div id="pokemonWeight">Peso: ${pokemon.weight} kg</div>
            <a href="index.html">Back to Pokédex</a>
        </div>
    `;

    document.getElementById('pokemonDetailContainer').innerHTML = pokemonDetailHtml;
    setBackgroundByType(pokemon.type);
}

const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id'); 
pokeApi.getPokemonDetail({ url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}/` })
    .then(pokemon => loadPokemonDetail(pokemon));
