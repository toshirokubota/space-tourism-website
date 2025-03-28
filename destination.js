
const name = document.getElementById('name');
const description = document.getElementById('description');
const picture = document.getElementById('picture');
// const webp = picture.querySelector('source');
// const png = picture.querySelector('img');
const distance = document.getElementById('distance');
const travel = document.getElementById('travel');
const choice = document.getElementById('destination-choice');

let spaceData; // = localStorage.getItem('spaceData');
//if(!spaceData) {
    fetch('data.json').then((response) => {
        if(!response.ok) return console.log('Oops! Something went wrong');
        return response.json();
      }).then((data0) => {
        spaceData = data0;
        localStorage.setItem('spaceData', JSON.stringify(spaceData));
        console.log(spaceData);

        populateDestination(spaceData, 'Mars');
      });    
//}

const populateDestination = (data, destination) => {
    console.log(data);
    let content = data.destinations.find(e=> e.name == destination);
    if(content) {
        description.innerText = content.description;
        distance.innerText = content.distance;
        travel.innerText = content.travel;
        name.innerText = content.name;
        picture.innerHTML = `
            <source srcset="${content.images.webp}" type="image/webp">
            <img src="${content.images.png}" alt="">          
        `;
    }
}

choice.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', ()=> {
        console.log(btn);
        populateDestination(spaceData, btn.innerHTML);
    });
})
