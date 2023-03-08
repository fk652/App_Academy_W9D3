import { API, broadcast } from "./util";

export default class FollowToggle {
  constructor(toggleButton) {
    // Your code here
    this.toggleButton = toggleButton;
    this.toggleButton.addEventListener('click', this.handleClick.bind(this));
  }

  async handleClick(event) {
    // Your code here
    event.preventDefault();
    // console.log(this.followState);
    if (this.followState === "followed") {
      this.unfollow();
    } else if (this.followState === "unfollowed") {
      this.follow();
    }
  }

  async follow() {
    // Your code here
    // console.log(this.toggleButton.dataset.dataUserId);
    // console.log(this.toggleButton.getAttribute("data-user-id"));

    this.followState = "following";
    const data = await API.followUser(this.toggleButton.getAttribute("data-user-id"));
    if (data) {
      console.log("Success!");      
      this.followState = "followed";
    } else {
      console.log("Failure!")
    }
  }

  async unfollow() {
    // Your code here
    // console.log(this.toggleButton.dataset.dataUserId);
    // console.log(this.toggleButton.getAttribute("data-user-id"));

    this.followState = "unfollowing";
    const data = await API.unfollowUser(this.toggleButton.getAttribute("data-user-id"));
    if (data) {
      console.log("Success!");      
      this.followState = "unfollowed";
    } else {
      console.log("Failure!")
    }
  }

  render() {
    switch (this.followState) {
      // Your code here
      case "followed":
        this.toggleButton.disabled = false;
        this.toggleButton.innerText = "Unfollow!";
        break;
      case "unfollowed":
        this.toggleButton.disabled = false;
        this.toggleButton.innerText = "Follow!";
        break;
      case "following":
        this.toggleButton.disabled = true;
        this.toggleButton.innerText = "Following...";
        break;
      case "unfollowing":
        this.toggleButton.disabled = true;
        this.toggleButton.innerText = "Unfollowing...";
        break;
    }
    // console.log(this.followState);
  }

  get followState() {
    return this.toggleButton.dataset.followState;
  }

  set followState(newState) {
    this.toggleButton.dataset.followState = newState;
    this.render();
  }
}