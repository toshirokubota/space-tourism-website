const name = document.getElementById('name');
const description = document.getElementById('description');
const picture = document.getElementById('picture');
const distance = document.getElementById('distance');
const travel = document.getElementById('travel');
const choice = document.getElementById('destination-choice');

let spaceData;
const key = 'myData';
const fetchUrl = './data.json';
const key2 = 'destination_choice';

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
            choice = "Moon";
        }
        let content = data.destinations.find(e=> e.name == choice);
        if(content) {
            populateDestination(spaceData, content);
        } else {
            console.log('Cannot find destination ', btn.innerHTML);
        }
    } else {
        console.log('Failed to load data');
    }
});

const populateDestination = (data, destination) => {
    if(destination) {
        description.innerText = destination.description;
        distance.innerText = destination.distance;
        travel.innerText = destination.travel;
        name.innerText = destination.name;
        picture.innerHTML = `
            <source srcset="${destination.images.webp}" type="image/webp">
            <img src="${destination.images.png}" alt="">          
        `;
        localStorage.setItem(key2, destination.name);
    }
}

choice.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', ()=> {
        console.log(btn);
        let content = spaceData.destinations.find(e=> e.name == btn.innerHTML);
        if(content) {
            populateDestination(spaceData, content);
        } else {
            console.log('Cannot find destination ', btn.innerHTML);
        }
    });
});
