import {getData} from './shared.js';

const name = document.getElementById('name');
const description = document.getElementById('description');
const picture = document.getElementById('picture');
const choice = document.getElementById('technology-choice');
const buttons = choice.querySelectorAll('button');
let active_choice = null;

let spaceData;
const key = 'myData';
const fetchUrl = './data.json';
const key2 = 'technology_choice';

getData(key, fetchUrl).then((data) => {
if (data) {
    console.log('Data loaded:', data);
    spaceData = data;
    active_choice = localStorage.getItem(key2);
    console.log(active_choice);
    if(!active_choice) {
        active_choice = "Launch vehicle";
    }
    let idx = spaceData.technology.findIndex(elm => elm.name == active_choice);
    if(idx < 0) {
        idx = 0;
        active_choice = spaceData.technology[0].name;
    }
    populateTechnology(spaceData, spaceData.technology[idx]);
    localStorage.setItem(key2, active_choice);
    updateActiveState();
    
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
    }
}

const updateActiveState = () => {
    let idx = spaceData.technology.findIndex(elm => elm.name == active_choice);
    for(let i=0; i<buttons.length; ++i) {
        if(i == idx) {
            buttons[i].setAttribute('aria-selected', true);
        } else {
            buttons[i].setAttribute('aria-selected', false);
        }
    }
}

buttons.forEach((btn, idx) => {
    btn.addEventListener('click', ()=> {
        console.log(btn);
        active_choice = spaceData.technology[idx].name;
        populateTechnology(spaceData, spaceData.technology[idx]);
        localStorage.setItem(key2, active_choice);
        updateActiveState();
    });
});
