import React from "react";
import axios from "axios";

import "./App.css";

class App extends React.Component {
  state = {
    title: "",
    body: "",
    posts: [],
  };

  componentDidMount = () => {
    this.getBlogPost();
  };

  getBlogPost = () => {
    axios
      .get("/api")
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log("Data has been recieved");
      })
      .catch(() => {
        console.log("Some error while recieving the data");
      });
  };

  // Display the posts on the page
  displayBlogPost = (posts) => {
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} className="disp-blog-post">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
  };

  //Function to handle the changes
  handleChanges = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };
  // handleChanges = (event) => {
  //   const target = event.target;
  //   const name = target.name;
  //   const value = target.value;

  //   this.setState({
  //     [name]: value,
  //   });
  // };

  //function to handle submit event
  handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      title: this.state.title,
      body: this.state.body,
    };
    axios({
      url: "/api/save",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Data has been sent to server successfully");
        this.resetUserInputs();
        this.getBlogPost();
      })
      .catch((error) => {
        console.log("Some error occured", error);
      });
  };

  // Reset the user inputs on the page after save
  resetUserInputs = () => {
    this.setState({
      title: "",
      body: "",
    });
  };

  render() {
    console.log("State:", this.state);

    //JSX
    return (
      <div className="app">
        <h2>Welcome to my React App</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-input">
            <input
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleChanges}
              placeholder="Enter the title"
            ></input>
          </div>
          <div className="form-input">
            <textarea
              name="body"
              cols="30"
              rows="10"
              value={this.state.body}
              onChange={this.handleChanges}
              placeholder="Enter the notes"
            ></textarea>
          </div>
          <div className="submit-btn">
            <button type="Submit">Submit</button>
          </div>
        </form>

        <div className="Blog-">{this.displayBlogPost(this.state.posts)}</div>
      </div>
    );
  }
}

export default App;
