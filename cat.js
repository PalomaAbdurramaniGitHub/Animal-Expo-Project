async function fetchData() {
    try {
        const catName = document.getElementById("search-input").value;
        const response = await fetch(`https://freetestapi.com/api/v1/cats?search=${catName}`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        console.log(data);

        //Clear previous search results
        const searchResults = document.querySelector(".search-results");
        searchResults.innerHTML = '';

        //Assuming the API response returns an array of cats
        if (Array.isArray(data) && data.length > 0) {
            data.forEach(cat => {
                const catImage = cat.image;
                
                //Create new elements for each search result
                const newSearchResult = document.createElement("div");
                newSearchResult.className = "search-result";

                const imgElement = document.createElement("img");
                imgElement.src = catImage;
                imgElement.alt = cat.name;

                const linkElement = document.createElement("a");
                linkElement.href = "#";
                linkElement.textContent = cat.name;
                linkElement.addEventListener('click', (event) => {
                    event.preventDefault();
                    showDetails(cat);
                });

                newSearchResult.appendChild(imgElement);
                newSearchResult.appendChild(linkElement);
                searchResults.appendChild(newSearchResult);
            });
        } else {
            throw new Error("No cats found with the provided search criteria");
        }
    } catch (error) {
        console.error(error);
    }
}

function showDetails(cat) {
    const detailsElement = document.getElementById('animal-details');
    const detailsContent = document.getElementById('animal-details-content');
    
    detailsElement.querySelector('.details-title').textContent = cat.name;
    detailsElement.querySelector('#details-description').textContent = cat.description || 'No description available.';
    detailsElement.querySelector('#details-colors').textContent = cat.colors || 'Not known';
    detailsElement.querySelector('#details-origin').textContent = cat.origin || 'Not known';
    detailsElement.querySelector('#details-temperament').textContent = cat.temperament || 'Not known';

    detailsElement.classList.add('showDetails');
}

function closeDetails() {
    const detailsElement = document.getElementById('animal-details');
    detailsElement.classList.remove('showDetails');
}

async function getRandomSeed() {
    const date = new Date();
    return date.getFullYear() + date.getMonth() + date.getDate();
}

async function fetchRandomPhotos(numPhotos) {
    try {
        const seed = getRandomSeed();
        const response = await fetch(`https://freetestapi.com/api/v1/cats?seed=${seed}`);

        if (!response.ok) {
            throw new Error('Could not fetch resource');
        }

        const data = await response.json();
        const photos = data.slice(0, numPhotos);
        return photos;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function displayRandomPhotos(numPhotos) {
    const photos = await fetchRandomPhotos(numPhotos);

    const searchResults = document.querySelector('.search-results');
    searchResults.innerHTML = '';

    photos.forEach(photo => {
        const newSearchResult = document.createElement('div');
        newSearchResult.className = 'search-result';

        const imgElement = document.createElement('img');
        imgElement.src = photo.image;
        imgElement.alt = photo.name;

        const linkElement = document.createElement('a');
        linkElement.href = '#';
        linkElement.textContent = photo.name;
        linkElement.addEventListener('click', (event) => {
            event.preventDefault();
            showDetails(photo);
        });

        newSearchResult.appendChild(imgElement);
        newSearchResult.appendChild(linkElement);
        searchResults.appendChild(newSearchResult);
    });
}

//Useage of function that generates 3 random photos
displayRandomPhotos(39);
