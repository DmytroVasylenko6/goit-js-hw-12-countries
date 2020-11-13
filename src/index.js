import './styles.css';

const debounce = require('lodash.debounce');
const { error } = require('@pnotify/core')
import '@pnotify/core/dist/PNotify.css'
import '@pnotify/core/dist/BrightTheme.css'
import countriesCardTpl from './templates/countries-card.hbs'
import countriesListTpl from './templates/countries-list.hbs'
import countriesAPI from './js/fetchCountries'
import countriesErrorTpl from './templates/error.hbs'


const refs = {
    countersContainerEl: document.querySelector('.countries-list'),
    form: document.querySelector('.form'),
    input: document.querySelector('.input'),
}

refs.form.addEventListener('input', debounce(onInputCountries, 500))

function onInputCountries(e) {
    let form = e.target.value.trim()

    if (form === '') return
    
    countriesAPI(form)
        .then(country => {
            if (country.length === 1) {
            addClassListCountersContainer()
                renderCountriesCard(country)
            } else if (country.length >= 2 && country.length <= 10) {

            removeClassListCountersContainer()
            renderCountriesList(country)
                
            } else if (country.length > 10) {
                
                error({
                    text: 'Необходимо сделать запрос более специфичным',
                    type: 'info'
                })
            }
        })
        .catch(errorEl)
}

function renderCountriesCard(result) {
        const countries = countriesCardTpl(result)
        refs.countersContainerEl.innerHTML = countries
}

function renderCountriesList(result) {
    const countries = countriesListTpl(result)
    refs.countersContainerEl.innerHTML = countries
}

function renderCountriesError(result) {
        const countries = countriesErrorTpl(result)
        refs.countersContainerEl.innerHTML = countries
}

function addClassListCountersContainer() {
    refs.countersContainerEl.classList.add('list')
}

function removeClassListCountersContainer() {
if (refs.countersContainerEl.classList.contains('list')) {
                    refs.countersContainerEl.classList.remove('list')
                }
}

function errorEl() { 
     addClassListCountersContainer() 
     renderCountriesError()
            error({
                text: 'Такой страны не найдено',
                type: 'info'
            })
}