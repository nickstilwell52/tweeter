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
  })
}

const loadTweets = function() {
  renderTweets($tweetsArray);
}

const loadTweet = function() {
  const newTweet = $tweetsArray.slice(-1)
  renderTweets(newTweet);
}

const renderTweets = function(tweets) {
  tweets.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    $('.tweets-container').append($tweet);
  });
}

const tweetErrorTest = function(tweet) {
  const tweetText = tweet.split('text=', 2)[1]
  if (tweetText.length < 1) {
    return 'tweet too short';
  }
  if (tweetText.length > 140) {
    return 'tweet too long'
  }
  return false;
}


const createSubmitHandler = function() {
  $('#new-tweet-submit').on("submit", function(event) {
    event.preventDefault();
    const $tweet = $('#new-tweet-submit').serialize()
    const tweetErr = tweetErrorTest($tweet);
    if (!tweetErr) {
      $.post("/tweets", $tweet, function() {
        getTweets(loadTweet);
      })
    } else {
      alert(`${tweetErr}`)
    }
  })
}

const escapeEvilTweet = function (str) {
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
}


$(document).ready(() => {
  getTweets(loadTweets);
  createSubmitHandler();
});