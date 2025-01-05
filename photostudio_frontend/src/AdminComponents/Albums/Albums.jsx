import React, { useState } from 'react'

export const Albums = () => {
    const [albumName, setAlbumName] = useState("");
  const [images, setImages] = useState([]);
  const [publish, setPublish] = useState(false);

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("albumName", albumName);
    formData.append("publish", publish);
    images.forEach((image) => formData.append("images", image));

    try {
      
      console.log("album data : ",formData);
      alert("Album created successfully!");
      
    } catch (error) {
      console.error("Error uploading album", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Album</h2>
      <div>
        <label>Album Name</label>
        <input
          type="text"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Images</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={publish}
            onChange={(e) => setPublish(e.target.checked)}
          />
          Publish
        </label>
      </div>
      <button type="submit">Create Album</button>
    </form>
  )
}
