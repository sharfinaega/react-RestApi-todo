import React, { Component } from "react";

import axios from "axios";
// import { Link } from "react-router-dom";

// import { ListGroupItem } from "reactstrap";

class RestApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoaded: false,
      error: ""
    };
  }

  componentDidMount() {
    axios
      .get(`https://cobacoba-hayepe.herokuapp.com/`)
      .then(result => {
        this.setState({
          isLoaded: true,
          posts: result.data
        });
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          error: error.message
        });
      });
  }
  render() {
    const { posts, error, isLoaded } = this.state;
    if (error) {
      return <div>{error}</div>;
    }
    if (!isLoaded) {
      return <div>Loading ...</div>;
    }
    return (
      <div style={{ textAlign: "center", fontSize: 20 }}>
        <ul>{posts && posts.map((data, index) => <li key={index}>{data.todo}</li>)}</ul>
      </div>
    );
  }
}

export default RestApi;
