import {getData} from './shared.js';

const name = document.getElementById('name');
const role = document.getElementById('role');
const bio = document.getElementById('bio');
const picture = document.getElementById('picture');
const choice = document.getElementById('crew-choice');
const buttons = choice.querySelectorAll('button');
let active_choice = null;

let spaceData;
const key = 'myData';
const fetchUrl = './data.json';
const key2 = 'crew_choice';
  
//initialize the page
getData(key, fetchUrl).then((data) => {
if (data) {
    console.log('Data loaded:', data);
    spaceData = data;
    active_choice = localStorage.getItem(key2);
    console.log(active_choice);
    if(!active_choice) {
        active_choice = "Douglas Hurley";
    }
    let idx = spaceData.crew.findIndex(elm => elm.name == active_choice);
    if(idx < 0) {
        idx = 0;
        active_choice = data.crew[0].name;
    }
    populateCrew(spaceData, spaceData.crew[idx]);
    localStorage.setItem(key2, active_choice);
    updateActiveState();

    } else {
        console.log('Failed to load data');
    }
});

//populate the page
const populateCrew = (data, crew) => {
    if(crew) {
        name.innerText = crew.name;
        role.innerText = crew.role;
        bio.innerText = crew.bio;
        picture.innerHTML = `
            <source srcset="${crew.images.webp}" type="image/webp">
            <img src="${crew.images.png}" alt="image of ${crew.name}">          
        `;
    }
}

//update aria-selected attribute
const updateActiveState = () => {
    let idx = spaceData.crew.findIndex(elm => elm.name == active_choice);
    for(let i=0; i<buttons.length; ++i) {
        if(i == idx) {
            buttons[i].setAttribute('aria-selected', true);
            console.log(i, active_choice);
        } else {
            buttons[i].setAttribute('aria-selected', false);
        }
    }
}

//callback for each selection button
buttons.forEach((btn, idx) => {
    btn.addEventListener('click', ()=> {
        //console.log(btn);
        active_choice = spaceData.crew[idx].name;
        populateCrew(spaceData, spaceData.crew[idx]);
        localStorage.setItem(key2, active_choice);
        updateActiveState();
    });
});
