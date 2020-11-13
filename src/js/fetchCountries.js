export default function fetchCountries(name) {
    return fetch(`https://restcountries.eu/rest/v2/name/${name}`).then(response => {
        if (response.ok === true) { return response.json() }
        else {
throw new Error('Not found');
        }  
    })
}