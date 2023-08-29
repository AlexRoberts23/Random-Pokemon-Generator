/**
 * Gets URL to request info from PokeAPI
 */
function getPokeData(){
    var pokeURL = createPokeURL();

    fetch(pokeURL)
    .then((response) => {
        if(response.ok){
            console.log("SUCCESS");
            return response.json();
        }else{
            console.log("it failed bro");
            throw new Error("NETWORK RESPONSE ERROR");
        }
    })
    .then(data => {
        console.log(data);
        displayPokemon(data);
    })
    .catch((error) => console.error("FETCH ERROR:", error));

    document.getElementById("pokemon").style.display = "block";
}

/**
 * Displays data such as name, id, type, and generation for the requested pokemon
 * @param {json} data The data from request
 */
function displayPokemon(data){
    const name = data.name;
    const pokeId = data.id;
    const types = getTypes(data);
    const pokePic = data.sprites.other["official-artwork"].front_default;
    const pokeGen = getGeneration(pokeId);

    const pokeInfoName = document.getElementById("pokemonName");
    const pokeInfoId = document.getElementById("pokemonID");
    const pokeInfoTypes = document.getElementById("pokemonTypes");
    const pokeInfoPic = document.getElementById("pokemonImage");
    const pokeInfoGen = document.getElementById("pokemonGen");

    pokeInfoName.innerText = name;
    pokeInfoId.innerText = "#"+pokeId;
    pokeInfoGen.innerText = pokeGen;

    const pokeInfoType1 = document.getElementById("type1");
    const pokeInfoType2 = document.getElementById("type2");

    pokeInfoType1.innerText = types[0];
    if(types.length==1){
        pokeInfoType2.innerText = " ";
    }else if(types.length>1){
        pokeInfoType2.innerText = types[1];
    }

    console.log("pokeInfoTypes: "+pokeInfoTypes.children);

    pokeInfoPic.src = pokePic;

    setColors(types);
}

/**
 * Creates a URL to request a random pokemon based on a random number
 * @returns URL(as a string)
 */
function createPokeURL(){
    var randomID = getRandomID(1, 1010); //was 1-897
    return "https://pokeapi.co/api/v2/pokemon/"+randomID.toString()+"/";
}

/**
 * Gives a random number between any two integers
 * @param {number} min 
 * @param {number} max 
 * @returns random number between min and max
 */
function getRandomID(min, max){ 
    var num = Math.floor(Math.random()*(max-min)+min);
    console.log("random num: "+num);
    return num;
}

/**
 * Gets the type(s) of the requested pokemon
 * @param {json} data 
 * @returns an array of types 
 */
function getTypes(data){
    const types = [];
    for(let i=0;i<data.types.length;i++){
        types.push(data.types[i].type.name);
    }
    return types;
}

/**
 * Sets the color of the background and border based on the type(s) of the requested pokemon
 * @param {array} types 
 */
function setColors(types){

    const pokemonCard = document.getElementById("pokemon");
    const bgColors = new Map([
        ["bug", "#59941E"],
        ["dark", "#2B0B3E"],
        ["electric", "#E2E540"],
        ["dragon", "#15186F"],
        ["water", "#2678CB"],
        ["fire", "#DA4414"],
        ["grass", "#23C11E"],
        ["ice", "#61F3F1"],
        ["fairy", "#F33ACC"],
        ["fighting", "#E3A218"],
        ["flying", "#7CABC5"],
        ["ghost", "#7036A7"],
        ["ground", "#AC7E1C"],
        ["steel", "#5F9E8F"],
        ["poison", "#872CD8"],
        ["rock", "#D4AF4B"],
        ["psychic", "#CB436C"],
        ["normal", "#AF90A7"]
    ]);

    const brColors = new Map([
        ["bug", "#78C42C"],
        ["dark", "#490E6C"],
        ["electric", "#F6FA16"],
        ["dragon", "#1217A9"],
        ["water", "#539DE8"],
        ["fire", "#E56137"],
        ["grass", "#58DC54"],
        ["ice", "#9DF7F6"],
        ["fairy", "#F577DA"],
        ["fighting", "#F3C051"],
        ["flying", "#A8D3E9"],
        ["ghost", "#9864CA"],
        ["ground", "#CB9F41"],
        ["steel", "#8AC1B4"],
        ["poison", "#B26AF2"],
        ["rock", "#ECCD79"],
        ["psychic", "#E86F93"],
        ["normal", "#C7B6C3"]
    ]);

    pokemonCard.style.backgroundColor = bgColors.get(types[0]);
    if(types.length>1){
        pokemonCard.style.borderColor = brColors.get(types[1]);
    }else{
        pokemonCard.style.borderColor = brColors.get(types[0]);
    }
}

/**
 * Determines the generation and region of the requested pokemon based on its ID
 * @param {number} id 
 * @returns name of genertaion and region of requested pokemon
 */
function getGeneration(id){
    var generation;
    if(id<=1010 && id>905){
        generation = "Gen 9 (Paldea)";
    }else if(id<=905 && id>809){
        generation = "Gen 8 (Galar/Hisui)";
    }else if(id<=809 && id>721){
        generation = "Gen 7 (Alola)";
    }else if(id<=721 && id>649){
        generation = "Gen 6 (Kalos)";
    }else if(id<=649 && id>493){
        generation = "Gen 5 (Unova)";
    }else if(id<=493 && id>386){
        generation = "Gen 4 (Sinnoh)";
    }else if(id<=386 && id>251){
        generation = "Gen 3 (Hoenn)";
    }else if(id<=251 && id>151){
        generation = "Gen 2 (Johto)";
    }else{
        generation = "Gen 1 (Kanto)";
    }
    return generation;
}
