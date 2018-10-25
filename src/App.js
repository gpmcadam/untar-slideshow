import React, { Component } from "react";
import untar from "js-untar";
import ImageGallery from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";

import "./App.css";

class App extends Component {
  state = {
    items: null
  };

  onUpload = e => {
    const fileReader = new FileReader();
    fileReader.onload = event => {
      const arrayBuffer = event.target.result;
      untar(arrayBuffer).then(files => {
        this.setState({
          items: files.map((file, i) => {
            return {
              original: file.getBlobUrl(),
              originalTitle: file.name,
              description: file.name
            };
          })
        });
      });
    };
    fileReader.readAsArrayBuffer(e.target.files[0]);
  };

  render() {
    const { items } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <label htmlFor="">
            <input type="file" onChange={this.onUpload} accept=".tar" />
          </label>
          {items && (
            <ImageGallery
              showThumbnails={false}
              infinite={false}
              items={items}
              showPlayButton={false}
            />
          )}
        </header>
      </div>
    );
  }
}

export default App;
