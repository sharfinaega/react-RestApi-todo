import React, { Component } from "react";
import axios from "axios";

class SpecificTodos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      isLoaded: false,
      error: ""
    };
  }

  componentDidMount() {
    // console.log(this.props)
    axios
      .get(`https://cobacoba-hayepe.herokuapp.com/${this.props.match.params.id}`)
      .then(result => {
        this.setState({
          isLoaded: true,
          detail: result.data
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
    const { detail, error, isLoaded } = this.state;
    if (error) {
      return <div>{error}</div>;
    }
    if (!isLoaded) {
      return <div>Loading ...</div>;
    }
    return <div style={{ textAlign: "center", fontSize: 20 }}></div>;
  }
}

export default SpecificTodos;
