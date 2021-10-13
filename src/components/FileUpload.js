import React, { Component } from "react";
import axios from 'axios';
import "../App.css";


class FileUpload extends Component {

    state = {
        uid: '',
        selectedFile: null,
        filename: ''
    }

    handleChange = (event) => {
        this.setState({
            uid: document.getElementById('uid').value,

        })
    }

    fileSelectedHandler = (event) => {
        let file = event.target.files[0].name;
        this.setState({
            selectedFile: event.target.files[0],
            filename: document.getElementById('file').value
        })
        console.log(file);
    }

    fileUploadHandler = (event) => {

        event.preventDefault();

        let formData = new FormData();
        console.log('uid',this.state.uid)
        formData.append('uid', this.state.uid);
        formData.append('filename', this.state.filename);
        formData.append('file', this.state.selectedFile);

        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }

        axios.post("http://localhost:5000/", formData, config)
        .then (res => {
            console.log(res.data);
            console.log(this.state.filename);
            console.log(formData);
        })
    }

    render () {
        return (
            <div className="formDiv">
                <h2>Add Attachments</h2>
                <form encType="multipart/form">
                    <input 
                        type="text" 
                        name="uid" 
                        id="uid" 
                        placeholder="Enter UID/reference no." 
                        onChange={this.handleChange}
                    />
                    <br/>
                    <center>
                    <input 
                        type="file" 
                        name="file" 
                        id="file" 
                        placeholder="Upload your file" 
                        onChange={this.fileSelectedHandler}
                    />
                    </center>
                    <br/>
                    <button className="submitBtn" type="submit" onClick={this.fileUploadHandler}>Add Files</button>
                </form>
            </div>
        )
    }
}

export default FileUpload