import React, { Component } from "react";
import "../components/upload.css";
export default class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = { file: "", imagePreviewUrl: "" };
  }
  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log("props:", this.props.br);
    console.log("handle uploading-", this.state.file);

    let formData = new FormData();
    formData.append("photos", this.state.file);
    this.timeout = setTimeout(() => {
      fetch("http://172.18.0.135:8521/uploaddata/", {
        method: "POST",
        body: formData
      })
        .then(response => response.json())
        .then(success => {
          console.log(success);
          // Do something with the successful response
        })
        .catch(error => console.log(error));
    }, 1500);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }
  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} />;
    } else {
      $imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }

    return (
      <div className="previewComponent">
        <form
          enctype="multipart/form-data"
          onSubmit={e => this._handleSubmit(e)}
        >
          <input
            className="fileInput"
            type="file"
            onChange={e => this._handleImageChange(e)}
          />
          <button
            className="submitButton"
            type="submit"
            onClick={e => this._handleSubmit(e)}
          >
            Upload Image
          </button>
        </form>
        <div className="imgPreview">{$imagePreview}</div>
      </div>
    );
  }
}
