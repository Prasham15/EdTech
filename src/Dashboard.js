import React, { useState } from 'react';
import './Dashboard.css'; // Import the CSS file with styles
import axios from 'axios';

const VideoUpload = ({ handleUpload, info,qdata, setQdata}) => {
    const [selectedFile, setSelectedFile] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    console.log(selectedFile);
    const uploadToBackend = async () => {
        try {
            const formData = new FormData();
            // formData.append('email', info.email);
            formData.append('video', selectedFile);
            console.log(formData);
            const response = await axios.post('http://localhost:4005/upload', formData , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data.qdata);
            setQdata(response.data.qdata)
            alert('Video uploaded successfully!');
            handleUpload(selectedFile); // Notify the Dashboard component about the uploaded video
        } catch (error) {
            console.log('Error uploading video:', error);
            alert('Error uploading video. Please try again.', error);
        }
        
    };

    return (
        <div className="video-upload">
            <input type="file" onChange={handleFileChange} accept="video/*" />
            <button onClick={uploadToBackend}>Upload Video</button>
        </div>
    );
};

const Dashboard = ({info, qdata, setQdata}) => {
    const [videos, setVideos] = useState([]);

    const handleUpload = (uploadedVideo) => {
        const newVideo = {
            id: Date.now(),
            title: uploadedVideo.name,
            file: uploadedVideo,
        };

        setVideos([newVideo, ...videos]);
    };

    return (
        <div className="dashboard">
            <h1>Welcome to the DashBoard</h1>
            <br></br>
            <VideoUpload handleUpload={handleUpload} qdata={qdata} setQdata={setQdata} />
            <ul className="video-list">
                {videos.map((video) => (
                    <li key={video.id} className="video-item">
                        <p className="video-title">{video.title}</p>
                        <video className="video-player" controls>
                            <source src={URL.createObjectURL(video.file)} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;