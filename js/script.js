const target = document.getElementById('target');
const health = document.getElementById('health');
const power = document.getElementById('power');
const type = document.getElementById('type');
const namee = document.getElementById('name');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const sprite = document.getElementById('image-main');
const chain = document.getElementById('evo-chain');
const template = document.getElementById('tpl-moves');
const moveTarget = document.getElementById('move-target');
const run = document.getElementById('run');
const leftBtn = document.getElementById('left-btn');
const rightBar = document.querySelector('.right-bar');

const getData = async (value, callback) => {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);
  const species = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${value}`
  );
  const speciesData = await species.json();
  const result = await data.json();
  const chain = await fetch(speciesData.evolution_chain.url);
  const chainData = await chain.json();
  callback({ ...result, ...speciesData, ...chainData });
};

const createImg = (data) => {
  const img = document.createElement('img');
  img.src = data.sprites.front_default;
  img.alt = `${data.name} was here`;
  return img;
};

leftBtn.addEventListener('click', () => {
  rightBar.classList.toggle('slider');
  console.log(rightBar.classList);
});

run.addEventListener('click', () => {
  const input = document.getElementById('input').value;
  getData(input, (data) => {
    console.log(data);
    health.textContent = `${data.stats[0].base_stat} HP`;
    power.textContent = `${data.stats[1].base_stat} Attack`;
    type.textContent = `${data.types[0].type.name}`;
    namee.textContent = `${data.id}•${data.name}`;
    height.textContent = `HT•${data.height}\"`;
    weight.textContent = `WT•${data.weight} lbs`;

    // Getting evolutions
    chain.innerHTML = '';
    for (let key in data.chain) {
      if (key === 'species') {
        getData(data.chain[key].name, (data) => {
          chain.appendChild(createImg(data));
        });
      } else if (key === 'evolves_to') {
        for (let key2 in data.chain[key][0]) {
          if (key2 == 'species') {
            getData(data.chain[key][0][key2].name, (data) => {
              chain.appendChild(createImg(data));
            });
          } else if (key2 == 'evolves_to') {
            for (let key3 in data.chain[key][0][key2][0]) {
              if (key3 == 'species') {
                getData(data.chain[key][0][key2][0][key3].name, (data) => {
                  chain.appendChild(createImg(data));
                });
              }
            }
          }
        }
      }
    }
    // End of evolutions

    // Getting moves
    moveTarget.innerHTML = '';
    for (let i = 0; i < 8; i++) {
      const clone = template.content.cloneNode(true);
      console.log(data.moves[i]);
      clone.querySelector('.move').textContent = data.moves[i].move.name;
      moveTarget.appendChild(clone);
    }

    sprite.innerHTML = '';
    sprite.appendChild(createImg(data));
  });
});
