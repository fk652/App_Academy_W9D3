import { API } from "./util";

export default class InfiniteTweets {
  constructor(rootEl) {
    // Your code here
    this.rootEl = rootEl;
    this.fetchButton = document.querySelector("button.fetch-tweets-btn");
    this.tweetsUl = document.querySelector("ul.tweets");
    // console.log(this.tweetsUl);
    // console.log(this.fetchButton);
    // console.log(window.location.origin);

    this.fetchButton.addEventListener('click', this.handleFetchTweets.bind(this));
  }

  async handleFetchTweets(event) {
    // Your code here
    event.preventDefault();

    this.fetchButton.disabled = true;
    this.fetchButton.innerText = "Fetching...";

    const newTweets = await API.fetchTweets({
      type: this.rootEl.getAttribute("data-type"),
      offset: this.tweetsUl.children.length
    })
    // console.log(newTweets);
    newTweets.forEach(tweet => this.appendTweet(tweet));

    this.fetchButton.disabled = false;
    this.fetchButton.innerText = "Fetch more tweets!";

    // Remove fetch tweets button if you've run out of tweets to fetch
    if (newTweets.length < 10) {
      const noMoreTweets = document.createElement("p");
      noMoreTweets.innerText = "No more tweets!";
      // Your code here
      this.fetchButton.replaceWith(noMoreTweets);
    }
  }

  appendTweet(tweetData) {
    const tweetEl = this.createTweet(tweetData);
    // Your code here
    this.tweetsUl.appendChild(tweetEl);
  }

  createTweet(tweetData) {
    const li = document.createElement("li");
    // Your code here
    const tweetDiv = document.createElement("div");
    tweetDiv.setAttribute("class", "tweet");

    const authorH3 = document.createElement("h3");
    authorH3.setAttribute("class", "author");

    const authorA = document.createElement("a");
    const authorId = tweetData["author"]["id"];
    authorA.setAttribute("href", `${window.location.origin}/users/${authorId}`);
    authorA.innerText = `@${tweetData["author"]["username"]}`;

    authorH3.appendChild(authorA);
    tweetDiv.appendChild(authorH3);

    const dateCreated = new Date(tweetData["createdAt"]);
    const dateSpan = document.createElement("span");
    dateSpan.setAttribute("class", "created-at");
    dateSpan.innerText = dateCreated.toLocaleDateString('en-US', { dateStyle: "long" });

    tweetDiv.appendChild(dateSpan);

    const tweetP = document.createElement("p");
    tweetP.innerHTML = tweetData["body"];

    tweetDiv.appendChild(tweetP);

    const tweetMentionDiv = document.createElement("div");
    tweetMentionDiv.innerText = " Mentions: ";

    const mentionA = document.createElement("a");
    const mentionAId = tweetData["mentionedUser"]["id"];
    mentionA.setAttribute("href", `${window.location.origin}/users/${mentionAId}`); //change to user show page link
    mentionA.innerHTML = `@${tweetData["mentionedUser"]["username"]}`;

    tweetMentionDiv.appendChild(mentionA);
    tweetDiv.appendChild(tweetMentionDiv);
    li.appendChild(tweetDiv);

    // console.log(li);

    return li;
  }

  // Helper methods...
  // createTweetDiv() {
  //   const tweetDiv = document.createElement("div");
  //   tweetDiv.setAttribute("class", "tweet");
  //   return tweetDiv;
  // }
}