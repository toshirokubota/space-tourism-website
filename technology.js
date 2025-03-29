const name = document.getElementById('name');
const description = document.getElementById('description');
const picture = document.getElementById('picture');
const choice = document.getElementById('technology-choice');

let spaceData;
const key = 'myData';
const fetchUrl = './data.json';
const key2 = 'technology_choice';

async function getData(key, fetchUrl) {
    try {
      // Try loading data from localStorage
      const storedData = localStorage.getItem(key);
  
      if (storedData) {
        console.log('Loaded data from localStorage');
        return JSON.parse(storedData); // Parse and return if valid
      }
  
      // If data is not in localStorage, fetch it asynchronously
      console.log('Fetching data asynchronously...');
      const response = await fetch(fetchUrl);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Save the fetched data to localStorage for future use
      localStorage.setItem(key, JSON.stringify(data));
      console.log('Fetched and stored data');
      return data;
  
    } catch (error) {
      console.error('Error loading data:', error);
      return null; // Handle errors gracefully
    }
}
  
getData(key, fetchUrl).then((data) => {
if (data) {
    console.log('Data loaded:', data);
    spaceData = data;
    let choice = localStorage.getItem(key2);
    console.log(choice);
    if(!choice) {
        choice = "Launch vehicle";
    }
    let idx = spaceData.technology.findIndex(elm => elm.name == choice);
    if(idx < 0) {
        idx = 0;
    }
    populateTechnology(spaceData, spaceData.technology[idx]);
    } else {
        console.log('Failed to load data');
    }
});

const populateTechnology = (data, tech) => {
    if(tech) {
        name.innerText = tech.name;
        description.innerText = tech.description;
        picture.innerHTML = `
                <source srcset="${tech.images.portrait}" media="(orientation: portrait)" />
                <img src="${tech.images.landscape}" alt="" />
        `;
        localStorage.setItem(key2, tech.name);
    }
}

choice.querySelectorAll('button').forEach((btn, idx) => {
    btn.addEventListener('click', ()=> {
        console.log(btn);
        populateTechnology(spaceData, spaceData.technology[idx]);
    });
});
