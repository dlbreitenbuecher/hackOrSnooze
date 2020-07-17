"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */


/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage(storyList.stories, $allStoriesList);
}

$body.on("click", "#nav-all", navAllStories);


/** Show login/signup on click on "login" */
function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);


/** When a user first logins in, update the navbar to reflect that. */
function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navStoryComponents.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

// Shows add new story form only when the user clicks on 'submit' in the navbar
function navStoryForm(event){
  event.preventDefault();
  // console.log("entering show stroy form")
  $newStoryForm.show();
}

$navSubmitStory.on("click", navStoryForm);