import React, { Component } from "react";
import "./App.css";
import picasso_style from "./picasso_style.jpg";
import picasso_cat from "./picasso_cat.png"
import content_cat from "./persian_cat_content.jpg"

function App(props){
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Picasso Cat!</h1>
          <h2>This app uses neural style transfer (NST) to style your cat pics</h2>
        </header>
        <div className="App-body">
          <div className="Box">
            <p>Style Image:</p>
            <img src={picasso_style} alt="art" />
          </div>
          <div className="Box">
            <p>Content Image:</p>
            <img src={content_cat} alt="cat" />
          </div>
          <div className="Box">
            <p>Generated Image:</p>
            <img src={picasso_cat} alt="picasso cat" />
          </div>
        </div>
      </div>
    );
  }

export default App;




// for correctly formatting page w/ header and body


//class App extends Component 

  // constructor() {
  //   super();
  //   this.state = {
  //     dogurl: "",
  //     arturl: "https://apollo.imgix.net/content/uploads/2016/11/Picasso.jpg",
  //     generatedurl: "",
  //   };
  // }

//old code for grabbing random dog
  // async componentDidMount() {
  //   //const art_data = await axios.get(this.state.arturl)
  //   //console.log("art data is a hot mess of jpg noise")
  //   try {
  //     const { data: dog } = await axios.get(
  //       "https://dog.ceo/api/breeds/image/random"
  //     );
  //     console.log("dog (is json w/ status and url)", dog)
  //     this.setState({ dogurl: dog.message });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

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
