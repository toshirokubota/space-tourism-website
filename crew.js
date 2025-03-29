const name = document.getElementById('name');
const role = document.getElementById('role');
const bio = document.getElementById('bio');
const picture = document.getElementById('picture');
const choice = document.getElementById('crew-choice');

let spaceData;
const key = 'myData';
const fetchUrl = './data.json';
const key2 = 'crew_choice';

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
        choice = "Douglas Hurley";
    }
    let idx = spaceData.crew.findIndex(elm => elm.name == choice);
    if(idx < 0) {
        idx = 0;
    }
    populateCrew(spaceData, spaceData.crew[idx]);
    } else {
        console.log('Failed to load data');
    }
});

const populateCrew = (data, crew) => {
    // console.log(data);
    // let content = data.destinations.find(e=> e.name == crew);
    if(crew) {
        name.innerText = crew.name;
        role.innerText = crew.role;
        bio.innerText = crew.bio;
        picture.innerHTML = `
            <source srcset="${crew.images.webp}" type="image/webp">
            <img src="${crew.images.png}" alt="">          
        `;
        localStorage.setItem(key2, crew);
    }
}

choice.querySelectorAll('button').forEach((btn, idx) => {
    btn.addEventListener('click', ()=> {
        console.log(btn);
        populateCrew(spaceData, spaceData.crew[idx]);
    });
});
