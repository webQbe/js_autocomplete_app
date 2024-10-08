// select search input
const search = document.getElementById('search');

// select div for results
const matchList = document.getElementById('match-list');

// get states.json file
// use async to handle promise from fetch()
const searchStates = async searchText => {

    // get data from states.json
    // use await for promise to finish
    const res = await fetch('../data/states.json');
    
    // convert response to json
    const states = await res.json();

    // log all data
    console.log(states);
}

// pass search value to searchStates() on input
search.addEventListener('input', () => searchStates(search.value));

