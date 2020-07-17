"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;


/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  const hostName = story.getHostName();

  // render all the rest of the story markup

  return $(`
        <li id="${story.storyId}">
          <span class="favourite">
            <i class="far fa-star"></i>
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

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  // empty out that part of the page
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const markup = generateStoryMarkup(story);
    $allStoriesList.append(markup);
  }

  $allStoriesList.show();
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
  generateStoryMarkup(story);
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

//Add story to favs
function addStoryToFavorites(event) {
  currentUser.favorites.push("story added");
  let favStoryId = $(event.target).closest("li").attr("id");
  let favStory = getStoryIdFormStoryList(favStoryId);
  currentUser.favorites.push(favStory);
}


$allStoriesList.on("click", "i", addStoryToFavorites)