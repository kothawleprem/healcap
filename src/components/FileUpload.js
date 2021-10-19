import React, { Component } from "react";
import axios from 'axios';



class FileUpload extends Component {

    state = {
        referenceno: '',
        selectedFile: null,
        filename: ''
    }

    handleChange = (event) => {
        this.setState({
            referenceno: document.getElementById('referenceno').value,

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
        console.log('referenceno',this.state.referenceno)
        formData.append('referenceno', this.state.referenceno);
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
            alert ("File Uploaded Succesfully");
        })
    }

    render () {
        return (
            <div className="formDiv">
            <br/><br/>
                <div className="preauthtitle">
                    <div class="alert alert-primary" role="alert" align="center">
                        <strong>Add Attachments</strong>
                    </div>
                </div><br/><br/>
                
                <form encType="multipart/form">
                    <center>
                    <input 
                        className="form-control form-control-sm"
                        style={{width: "350px"}}
                        type="text" 
                        name="referenceno" 
                        id="referenceno" 
                        placeholder="Enter Reference no." 
                        onChange={this.handleChange}
                    />
                    </center>
                    <br/>
                    <center>
                    <input 
                        className="form-control form-control-sm"
                        style={{width: "350px"}}
                        type="file" 
                        name="file" 
                        id="file" 
                        placeholder="Upload your file" 
                        onChange={this.fileSelectedHandler}
                    />
                    </center>
                    <br/><br/>
                    <div className="filebutt" style={{marginLeft: "550px"}}>
                        <button type="button" value="submit" onClick={this.fileUploadHandler} class="btn btn-primary" style={{borderRadius: "30px",fontSize: "20px",width: "150px"}}> <strong>Add Files</strong></button>
                    </div>
                    
                </form>
            </div>
        )
    }
}

export default FileUpload