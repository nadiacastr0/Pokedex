const pokeApi = {};

function convertPokeApiDetailPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    pokemon.abilities = pokeDetail.abilities.map((ability) => ability.ability.name);
    pokemon.height = pokeDetail.height / 10; 
    pokemon.weight = pokeDetail.weight / 10; 

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails);
};
