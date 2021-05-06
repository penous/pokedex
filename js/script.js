const target = document.getElementById('target');

const getData = async (value, callback) => {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);
  const species = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${value}`
  );
  const speciesData = await species.json();
  const result = await data.json();
  callback({ ...result, ...speciesData });
};

getData(3, (data) => {
  console.log(data);
  // target.textContent = ` The name is: ${data.name} and he evolves from: ${data.evolves_from_species.name}`;
});
