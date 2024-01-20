// Example data for repo cards
const repoData = [];
    for(let i=1;i<100;i++){
        repoData.push( { title: "Heroes "+i, description: "Heroes description goes here", tags: ["javascript", "angular", "angularjs"] });
    }

const repoContainer = document.getElementById('repoContainer');
const paginationContainer = document.getElementById('pagination');
const pageBox = document.getElementById('pageBox');




let itemsPerPage = 10; // Default value

function updateItemsPerPage() {
    const itemsPerPageSelect = document.getElementById('itemsPerPageSelect');
    itemsPerPage = parseInt(itemsPerPageSelect.value);

    displayRepoCards(1);
    updatePagination(1);
}

function displayRepoCards(page) {
    repoContainer.innerHTML = '';
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (let i = startIndex; i < endIndex && i < repoData.length; i++) {
        const repoCard = createRepoCard(repoData[i]);
        repoContainer.appendChild(repoCard);
    }
}

function createRepoCard(repo) {
    const repoCard = document.createElement('div');
    repoCard.className = 'repo';

    const title = document.createElement('h2');
    title.textContent = repo.title;

    const description = document.createElement('p');
    description.textContent = repo.description;

    const tags = document.createElement('div');
    tags.className = 'tags';

    repo.tags.forEach(tag => {
        const tagButton = document.createElement('button');
        tagButton.className = 'tag';
        tagButton.textContent = tag;
        tagButton.onclick = () => alert(`Clicked on tag: ${tag}`); // Replace with your desired action
        tags.appendChild(tagButton);
    });

    repoCard.appendChild(title);
    repoCard.appendChild(description);
    repoCard.appendChild(tags);

    return repoCard;
}

function changePage(offset) {
    const currentPage = parseInt(document.querySelector('.pagination a.active').textContent);
    const newPage = currentPage + offset;

    if (newPage >= 1 && newPage <= Math.ceil(repoData.length / itemsPerPage)) {
        displayRepoCards(newPage);
        updatePagination(newPage);
    }
}

function updatePagination(currentPage) {
    paginationContainer.innerHTML = '';
    pageBox.innerHTML = '';
    const pageCount = Math.ceil(repoData.length / itemsPerPage);

    // "Previous" button
    const prevBtn = document.createElement('a');
    prevBtn.classList.add('Prev_btn');
    const prevBtnImage = document.createElement('img');
    prevBtnImage.src = 'https://img.icons8.com/?size=48&id=OetYoGJk1CCi&format=gif';
    prevBtnImage.alt = 'Previous';
    prevBtnImage.style.width = '12px'; // Adjust the width as needed
    prevBtnImage.style.height = '14px'; // Adjust the height as needed
    prevBtnImage.style.margin = '0'; // Remove any default margin
    prevBtn.appendChild(prevBtnImage);
    prevBtn.onclick = () => changePage(-1);
    paginationContainer.appendChild(prevBtn);

    for (let i = 1; i <= pageCount; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.addEventListener('click', () => {
            displayRepoCards(i);
            updatePagination(i);
        });

        if (i === currentPage) {
            pageLink.classList.add('active');
        }

        const pageBoxItem = document.createElement('span');
        pageBoxItem.textContent = i;
        if (i === currentPage) {
            pageBoxItem.classList.add('active');
        }
        pageBox.appendChild(pageBoxItem);

        paginationContainer.appendChild(pageLink);
    }

    // "Next" button
    const nextBtn = document.createElement('a');
    nextBtn.classList.add('Next_btn');

    const nextBtnImage = document.createElement('img');
    nextBtnImage.src = 'https://img.icons8.com/?size=48&id=STztBzcrZxVm&format=gif';
    nextBtnImage.alt = 'Next';
    nextBtnImage.style.width = '12px'; // Adjust the width as needed
    nextBtnImage.style.height = '14px'; // Adjust the height as needed
    nextBtnImage.style.margin = '0'; // Remove any default margin
    nextBtn.appendChild(nextBtnImage);
    nextBtn.onclick = () => changePage(1);
    paginationContainer.appendChild(nextBtn);
}

// Initial display
displayRepoCards(1);
updatePagination(1);
