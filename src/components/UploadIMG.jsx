import axios from 'axios';
import { useState } from 'react';

function UploadIMG({ setImageUrl }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const maxSizeMB = 10;
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!selectedFile) return;

    if (!validTypes.includes(selectedFile.type)) {
      setError("Only JPG, JPEG, PNG or WEBP files are allowed.");
      setFile(null);
      return;
    }

    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`Image must be smaller than ${maxSizeMB}MB.`);
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a valid image first.");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const res = await axios.post(
        "https://blog-backend-t8ey.onrender.com/api/upload",
        formData
      );

      const imageUrl = res.data.imageUrl || res.data.url;
      console.log("Uploaded image URL:", imageUrl);

      setImageUrl(imageUrl);
      alert("Image uploaded successfully");

      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleUpload} disabled={uploading || !file}>
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
}

export default UploadIMG;
