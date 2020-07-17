"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");
const $allStoriesContainer = $(".stories-container");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");

const $navStoryComponents = $('.nav-story-components')
const $hackOrSnooze = $('#nav-all');
const $navSubmitStory = $('#nav-submit-story');
const $navFavorites = $('#nav-favorites');
const $navMyStories = $('#nav-my-stories');

const $newStoryForm = $("#submit-story-form");

const $favoriteIcon = $(".favourite");
const $favoriteStoriesList = $('#favorite-stories-list')

//const $newstoryFormContainer = $("#submit-story-container");


/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hidePageComponents() {
  const components = [
    $allStoriesList,
    $loginForm,
    $signupForm,
    $newStoryForm,
    $favoriteStoriesList
  ];
  components.forEach(c => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");
  $navStoryComponents.hide();
  $newStoryForm.hide();
  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();

  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage(storyList.stories, $allStoriesList);
}


// Once the DOM is entirely loaded, begin the app
$(start);