/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

let $tweetsArray = [];


const getTweets = function(callback) {
  $.get("/tweets", function(data) {
    $tweetsArray = data;
    callback($tweetsArray);
  });
};

const loadTweets = function() {
  renderTweets($tweetsArray);
};

const loadTweet = function() {
  const newTweet = $tweetsArray.slice(-1);
  renderTweets(newTweet);
};

const renderTweets = function(tweets) {
  tweets.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    $('.tweets-container').append($tweet);
  });
};

const tweetErrorTest = function(tweet) {
  if (typeof tweet === 'undefined') {
    $('#tweet-errorWrap').css({"opacity": 0, "max-width": 0});//hide on docready
    return;
  }
  const createErr = function(errMsg) {
    const errIcon = '<i class="fa-solid fa-triangle-exclamation"></i>';
    return `${errIcon}&nbsp${errMsg}&nbsp${errIcon}`;
  };
  const createAnim = function() {
    const $newWidth = ($('#tweet-error').width()) + 10;
    $('#tweet-errorWrap').css({"opacity": 0, "max-width": 0}).animate({"opacity": 1, "max-width": $newWidth});
  };

  const tweetText = tweet.split('text=', 2)[1];
  const tweetTextLength = $("#tweet-textarea").val().length;//unsanitized length

  if (tweetTextLength < 1) {
    $('#tweet-error').html(createErr('forgot the tweet'));
    createAnim();
    return true;
  }
  if (tweetTextLength > 140) {
    $('#tweet-error').html(createErr('char limit exceeded'));
    createAnim();
    return true;
  }
  if (tweetText.includes("world")) { //wonderful use of MDN example
    $('#tweet-error').html(createErr('no lame tweets'));
    createAnim();
    return true;
  }
  if (tweetText.includes(".empty()")) { //wonderful use of MDN example
    $('#tweet-error').html(createErr('no evil tweets'));
    createAnim();
    return true;
  }
  // happy path
  $('#tweet-errorWrap').css({"opacity": 0, "width": 0}).animate({"width": '100%'}, 500);
  return false;
};


const createSubmitHandler = function() {
  $('#new-tweet-submit').on("submit", function(event) {
    event.preventDefault();
    const $tweet = $('#new-tweet-submit').serialize();
    const tweetErr = tweetErrorTest($tweet);
    if (!tweetErr) {
      $.post("/tweets", $tweet, function() {
        getTweets(loadTweet);
      });
    }
  });
};

const escapeEvilTweet = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  const $tweet = $(`
    <div class="tweet-wrapper">
      <article class="tweet">
        <header class="tweet">
          <div class="user-info">
            <img alt="user avatar" class="user-image" src="${tweet.user.avatars}" height="64px" width="64px">
            <div class="user-name">${tweet.user.name}</div>
            <div class="user-handle">${tweet.user.handle}</div>
          </div>
        </header>
          <p>
            ${escapeEvilTweet(tweet.content.text)}
          </p>
        <footer class="tweet">
          <div class="tweet-date">${timeago.format(tweet.created_at)}</div>
          <div class="tweet-actions">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    </div>
  `);
  return $tweet;
};


$(document).ready(() => {
  getTweets(loadTweets);
  createSubmitHandler();
  tweetErrorTest();
});