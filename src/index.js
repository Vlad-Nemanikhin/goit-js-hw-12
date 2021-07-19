
import fetchCountriesByName from './js/fetchCountries';
import card from './tmp/card.hbs';
import debounce from 'lodash.debounce';
import Notiflix from "notiflix";
import './sass/main.scss';

const DEBOUNCE_DELAY = 300;
const refs = {
	searchBox: document.querySelector('#search-box'),
	countryList: document.querySelector('.country-list'),
	countryInfo: document.querySelector('.country-info')
};

console.log(refs.searchBox)

refs.searchBox.addEventListener('input',  debounce(onClickFetchCountry, DEBOUNCE_DELAY));
function onClickFetchCountry(e) {
	e.preventDefault();
	const searchQuery = e.target.value;
	

	refs.countryList.innerHTML = '';
	refs.countryInfo.innerHTML = '';
			
	fetchCountriesByName(searchQuery).then(countries => {
		
			if (countries.length >= 10) {
				Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
			} else if (countries.length < 10 && countries.length > 1) { renderCountriesList(countries); } else { renderCountryCard(countries); }
		
		}
		)
		.catch(error => {
			console.log(error);
			Notiflix.Notify.failure('Oops, there is no country with that name');
		});

}

function renderCountryCard(countries) {
	const markupCountryCardTmp = countries.map(({flag, name, capital, population, languages}) => {return card({ flag, name, capital, population, languages });
		})
	refs.countryInfo.insertAdjacentHTML('beforeend', markupCountryCardTmp);
}

function renderCountriesList(countries) {
	const countriesMarkup = countries.map(({ flag, name }) => {
					return `<li class="country">
							<img src="${flag}" alt="${name}"> 
							<h1 class="title">${name}</h1>
						</li>`
				}
				).join('');
	refs.countryList.innerHTML = countriesMarkup;
}