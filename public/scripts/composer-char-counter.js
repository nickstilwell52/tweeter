let tweetCharCount = 140;

const addCharCountEventHandler = () => {
  $("#tweet-textarea").on('input', function() {
    tweetCharCount = (140 - this.textLength);
    const counterColor = tweetCharCount < 0 ? "red" : "false";
    const theCounter = $(this).parent().next().find(".counter");
    $(theCounter).text(tweetCharCount);
    $(theCounter).attr("changeColor", counterColor);
  });
  console.log('added CharCountEventHandler');
};

$(document).ready(() => {
  addCharCountEventHandler();
});