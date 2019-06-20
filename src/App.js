import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import swim_dog from "./swim_dog.jpg"
import art from "./picasso_style.jpg"


class App extends Component {
  constructor() {
    super();
    this.state = {
      dogurl: "",
      arturl: "https://apollo.imgix.net/content/uploads/2016/11/Picasso.jpg",
      generatedurl: "",
    };
  }

  async componentDidMount() {
    //const art_data = await axios.get(this.state.arturl)
    //console.log("art data is a hot mess of jpg noise")
    try {
      const { data: dog } = await axios.get(
        "https://dog.ceo/api/breeds/image/random"
      );
      console.log("dog (is json w/ status and url)", dog)
      this.setState({ dogurl: dog.message });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>Welcome to my NST App!</h1>
        </header>
        <div className="style-content-generated">
          <p>Style Image:</p>
          <img src={art} alt="art" />
          <p>Content Image:</p>
          <img src={swim_dog} alt="swimming dog" />
          <p>Generated Image:</p>
          <img src={this.state.dogurl} alt="a random dog" />
        </div>
      </div>
    );
  }
}

export default App;

//old code for grabbing and showing random art from artsy

      // const url = "https://apollo.imgix.net/content/uploads/2016/11/Picasso.jpg";
      // const { data: art } = await axios.get(url, {
      //   headers: {
      //     "X-Xapp-Token":
      //       "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1ODk4NDc5NywiaWF0IjoxNTU4Mzc5OTk3LCJhdWQiOiI1Y2QyMWQ4YWJlYTcwNTMyNjdlNjQzOWYiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWNlMmZkZGRiNGZiYTQ2ZTliYTZjM2M2In0.5bP9rQZb1HoQlUpxElO6eTLZLlQdGMPS6uWKIhG8Ml4"
      //   }
      // });
      // console.log("art", art);
      //console.log("art._links.thumbnail.href", art._links.thumbnail.href);
      // this.setState({ arturl: art._links.thumbnail.href });


//fix later to use artsy random art generator - need new auth/key "https://api.artsy.net/api/artworks?sample=1"
//"https://apollo.imgix.net/content/uploads/2016/11/Picasso.jpg?auto=compress,enhance,format&amp;crop=faces,entropy,edges&amp;fit=crop&amp;w=400&amp;h=300" 
