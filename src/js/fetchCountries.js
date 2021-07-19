export default fetchCountriesByName;
function fetchCountriesByName(searchQuery) {
	const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;
	return fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error(response.status);
			}
			return response.json();
		})
}

