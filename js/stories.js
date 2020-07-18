"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;



// Add story markup to DOM
function addOneStoryToPage(story, $location) {
  const markup = generateStoryMarkup(story);
  $location.prepend(markup);
}



/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  const hostName = story.getHostName();

  let star = (story.isFavorite) ? "fas" : "far";
  // render all the rest of the story markup
  console.log("star element", star);

  return $(`
        <li id="${story.storyId}">
          <span class="favourite star">
            <i class="${star} fa-star"></i>
          </span>
          <a class="story-link" href="${story.url}" target="a_blank">
            ${story.title}
          </a>
          <small class="story-hostname">(${hostName})</small>
          <small class="story-author">by ${story.author}</small>
          <small class="story-user">posted by ${story.username}</small>
        </li>
    `);
}


/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage(stories, $location) {
  console.debug("putStoriesOnPage");

  // empty out that part of the page
  $location.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of stories) {
    addOneStoryToPage(story, $location);
  }

  $location.show();
}


// Collects values from the new story form and calls the add story function to make an api request for the requested story
async function addNewStoryAndPutOnPage(evt) {
  evt.preventDefault();
  // These values should only be collected once inputs have been made
  const author = $('#story-author').val();
  const title = $('#story-title').val();
  const url = $('#story-url').val();

  let newStoryAttributes = { author, title, url };
  // debugger
  let story = await StoryList.addStory(currentUser.loginToken, newStoryAttributes);
  addOneStoryToPage(story, $allStoriesList);
}

$newStoryForm.on("submit", addNewStoryAndPutOnPage);

//get the story id from storylist which matches the favstory id
function getStoryIdFormStoryList(favStoryId) {
  for (let story of storyList.stories) {
    if (favStoryId === story.storyId) {
      return story;
    }
  }
  return null;
}


//$allStoriesList.on("click", ".far", addStoryToFavorites);


// Displays favorite stories and hides all non-favorited stories
function putFavoriteStoriesOnPage(evt) {
  evt.preventDefault();
  hidePageComponents();

  if (currentUser.favorites.length === 0) {
    $favoriteStoriesList.html('<h3>No Favorites Added!</h3>');
  } else {
    putStoriesOnPage(currentUser.favorites, $favoriteStoriesList);

  }

  $favoriteStoriesList.show();
}

$navFavorites.on('click', putFavoriteStoriesOnPage);


function removeStoryFromFavorites(favStory) {
  console.log("before removed ", currentUser)
  
  let indexOfStory = currentUser.favorites.indexOf(favStory);

  currentUser.favorites.splice(indexOfStory, 1);
  console.log("removed ", currentUser)
}

/* This method lets user click on fav icon to add/remove story from favs by making corresponding API calls*/

function addOrRemoveFavorites(event) {
  console.log("while coming in ", currentUser.favorites)
 
  let favStoryId = $(event.target).closest("li").attr("id");
  let classOfId = $(event.target).attr("class");
  
  if ( classOfId === "far fa-star") {
    $(event.target).toggleClass("fas");
    StoryList.addFavStory(currentUser, favStoryId);
  }
  else {
    
    $(event.target).toggleClass("fas");
    removeStoryFromFavorites(favStory)
  }

}

$allStoriesList.on("click", "i", addOrRemoveFavorites);