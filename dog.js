async function fetchData() {
    try {
        const dogName = document.getElementById("search-input").value;
        const response = await fetch(`https://freetestapi.com/api/v1/dogs?search=${dogName}`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        console.log(data);

        //Clear previous search results
        const searchResults = document.querySelector(".search-results");
        searchResults.innerHTML = '';

        //Assuming the API response returns an array of dogs
        if (Array.isArray(data) && data.length > 0) {
            data.forEach(dog => {
                const dogImage = dog.image;
                
                //Create new elements for each search result
                const newSearchResult = document.createElement("div");
                newSearchResult.className = "search-result";

                const imgElement = document.createElement("img");
                imgElement.src = dogImage;
                imgElement.alt = dog.name;

                const linkElement = document.createElement("a");
                linkElement.href = "#";
                linkElement.textContent = dog.name;
                linkElement.addEventListener('click', (event) => {
                    event.preventDefault();
                    showDetails(dog);
                });

                newSearchResult.appendChild(imgElement);
                newSearchResult.appendChild(linkElement);
                searchResults.appendChild(newSearchResult);
            });
        } else {
            throw new Error("No dogs found with the provided search criteria");
        }
    } catch (error) {
        console.error(error);
    }
}

function showDetails(dog) {
    const detailsElement = document.getElementById('animal-details');
    const detailsContent = document.getElementById('animal-details-content');
    
    detailsElement.querySelector('.details-title').textContent = dog.name;
    detailsElement.querySelector('.details-category').textContent = dog.size || 'Unknown Category';
    detailsElement.querySelector('#details-description').textContent = dog.description || 'No description available.';
    detailsElement.querySelector('#details-lifespan').textContent = dog.lifespan || 'Not known';
    detailsElement.querySelector('#details-colors').textContent = dog.colors || 'Not known';
    detailsElement.querySelector('#details-origin').textContent = dog.origin || 'Not known';
    detailsElement.querySelector('#details-temperament').textContent = dog.temperament || 'Not known';

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
        const response = await fetch(`https://freetestapi.com/api/v1/dogs?seed=${seed}`);

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
