/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
            ${tweet.content.text}
          </p>
        <footer class="tweet">
          <div class="tweet-date">${tweet.created_at}</div>
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

const renderTweets = function(tweets) {
  tweets.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    $('.tweets-container').append($tweet);
  });
};

$(document).ready(() => {
  renderTweets(tweetData);
});

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1687648762644
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1687735162644
  }
];