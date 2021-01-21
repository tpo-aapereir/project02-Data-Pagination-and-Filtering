/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const itemsPerPage = 9;

//creates a paragraph element to display search errors later in the code
const body = document.querySelector('body');
const p = document.createElement('p');
body.appendChild(p);

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
utlilizing template literals to fetch data */
function showPage(list, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   const studentList = document.querySelector('ul.student-list');
   studentList.innerHTML = ``;
 // loop over the length of the `list` parameter
    // inside the loop create a conditional to display the proper students
      // inside the conditional:
        // create the elements needed to display the student information
        // insert the above elements
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         studentList.insertAdjacentHTML('beforeend', `
         <li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
           <h3>${list[i].name.title} ${list[i].name.first} ${list[i].name.last}</h3>
           <span class="email"${list[i].email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${list[i].registered.date}</span>
         </div>
         </li>
         `);
      }
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
utilized a template literal*/

function addPagination (list) {
   let pageAmount = Math.ceil(list.length / itemsPerPage);
   const linkList = document.querySelector('ul.link-list');
   linkList.innerHTML = ``;

   //creating the list item for the link-list buttons
   for (let i = 1; i <= pageAmount; i++) {
      let button =  `<li>
                        <button type="button">${i}</button>
                     </li>`
      linkList.insertAdjacentHTML('beforeend', button);
      document.querySelector('li button').className = 'active';
   }

   //adding an event listener to wait for the click event to make active and show the page
linkList.addEventListener('click', (e) => {
   if (e.target.tagName === 'BUTTON') {
      document.querySelector('.active').className = '';
      e.target.className = 'active';
      showPage(list, e.target.textContent);
      }
   });
}

//creating the searchBar as a function and inserting/aligning to the right
function createSearchBar () {
   const h2 = document.querySelector('h2');
 
   const searchBarHTML = `<label for="search" class="student-search">
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;

   h2.insertAdjacentHTML('afterend',searchBarHTML);
}

/**The function performed to search the site for students based on inputs in the searchBar. 
Amedning to lower case for easier search functionality. 
Calling searchInput and searchInfo to populate data.
*/
function performSearch(searchInput, studentInfo) {
   const searchTerm = searchInput.toLowerCase();
   let searchResults = [];
   p.textContent = '';

   for (let i=0;i<studentInfo.length; i++) {
      const firstName = studentInfo[i].name.first;
      const lastName = studentInfo[i].name.last;
      const fullName = `${firstName.toLowerCase()} ${lastName.toLowerCase()}`;
   
      if (searchInput.length !== 0 && fullName.includes(searchTerm)) {
         searchResults.push(studentInfo[i]);
      };
   };
   
   if (searchInput.length > 0){
      showPage(searchResults,1);
      addPagination(searchResults);
   } else if (searchInput.length === 0){
      showPage(data, 1);
      addPagination(data);   
   };

   if (searchResults.length === 0) {
      p.textContent = 'Unfortunately, no results match your criteria, please try again!';
   };
}

// Call functions
showPage(data, 1);
addPagination(data);
createSearchBar();


//Set up eventListener for search bar
const searchField = document.getElementById("search");
const searchFieldButton = document.querySelector('button');

searchField.addEventListener('keyup', ()=> {
   performSearch(searchField.value,data);  
});

searchBoxButton.addEventListener('click', ()=> {
   performSearch(searchBox.value,data);
});