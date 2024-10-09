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

    // Get matches to current search input
    // filter() loops through states 
    // & returns an array based on multiple conditions
    let matches = states.filter(state => {

        // create regular expression for matching
        // ^ - starts with whatever search text
        // gi - global & case insensitive flags / matches both upper & lowercase
        const regex = new RegExp(`^${searchText}`, 'gi');

        // return array that matches regex
        // match regex with state name or state abbreviation
        return state.name.match(regex) || state.abbr.match(regex);
    });

    // prevent returning all data 
    // on clearing search input
    if(searchText.length === 0){

        matches = [];
        matchList.innerHTML = '';

    }

    // output matching results to browser
    outputHtml(matches);

};

// Show results in HTML
const outputHtml = matches => {

    if(matches.length > 0){

        // map() returns an array from an array
        // return an array of html strings
        const html = matches.map(match => `
            <div class="card card-body mb-1">
                <h4>${match.name} (${match.abbr}) <span class="text-primary">
                ${match.capital}</span></h4>
                <small>Lat: ${match.lat} / Long: ${match.long}</small> 
            </div>
            `)
            .join(''); // join html strings together 

            // output to page
            matchList.innerHTML = html;

    }

}


// pass search value to searchStates() on input
search.addEventListener('input', () => searchStates(search.value));

