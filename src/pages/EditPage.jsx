// src/pages/EditPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is installed and imported

function EditPage() {
  const { postId } = useParams(); // Extract postId from URL
  const navigate = useNavigate(); // Hook to navigate programmatically

  const [post, setPost] = useState(null); // State to hold post data
  const [text, setText] = useState(''); // State for editable text
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    async function fetchPost() {
      try {
        // Fetch the specific post from the backend API
        const response = await axios.get(`/api/posts/${postId}`);
        setPost(response.data);
        setText(response.data.text); // Initialize editable text
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Issue loading post.');
        setLoading(false);
      }
    }

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Send a PUT request to update the post
      const response = await axios.put(`/api/posts/${postId}`, { text },{ withCredentials: true });
      console.log('Post updated:', response.data);
      navigate('/main'); // Navigate back to the homepage after successful update
    } catch (err) {
      console.error(err);
      setError('Issue updating post.');
    }
  };

  if (loading) {
    return <p>Loading post...</p>; // Display while fetching data
  }

  if (error) {
    return <p>Error: {error}</p>; // Display any errors
  }

  if (!post) {
    return <p>Post not found.</p>; // Handle case where post doesn't exist
  }

  return (
    <div>
      <h1>Edit Post</h1>
      <p>Post ID: {post._id}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="text">Text:</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit">Save</button>
      </form>
      {/* Optional: Add a cancel button to navigate back without saving */}
      <button onClick={() => navigate('/main')}>Cancel</button>
    </div>
  );
}

export default EditPage;
