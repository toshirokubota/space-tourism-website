import {getData} from './shared.js';

const name = document.getElementById('name');
const description = document.getElementById('description');
const picture = document.getElementById('picture');
const distance = document.getElementById('distance');
const travel = document.getElementById('travel');
const choice = document.getElementById('destination-choice');
const buttons = choice.querySelectorAll('button');
let active_choice = null;

let spaceData;
const key = 'myData';
const fetchUrl = './data.json';
const key2 = 'destination_choice';

getData(key, fetchUrl).then((data) => {
    if (data) {
        console.log('Data loaded:', data);
        spaceData = data;
        active_choice = localStorage.getItem(key2);
        console.log(active_choice);
        if(!active_choice) {
            active_choice = "Moon";
        }
        let content = data.destinations.find(e=> e.name == active_choice);
        if(content) {
            populateDestination(spaceData, content);
            localStorage.setItem(key2, active_choice);
            updateActiveState();
        } else {
            console.log('Cannot find destination ', active_choice);
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
    }
}

const updateActiveState = () => {
    for(let button of buttons) {
        if(button.innerHTML == active_choice) {
            button.setAttribute('aria-selected', true);
        } else {
            button.setAttribute('aria-selected', false);
        }
    }
}

buttons.forEach(btn => {
    btn.addEventListener('click', ()=> {
        console.log(btn);
        let content = spaceData.destinations.find(e=> e.name == btn.innerHTML);
        if(content) {
            active_choice = content.name;
            populateDestination(spaceData, content);
            localStorage.setItem(key2, active_choice);
            updateActiveState();
        } else {
            console.log('Cannot find destination ', btn.innerHTML);
        }
    });
});
