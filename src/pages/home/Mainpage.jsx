import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Mainpage.css'; // Import the CSS file

function Mainpage() {
  const [posts, setPosts] = useState([]); // State to hold posts
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/create');
  };

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch posts.');
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const formatTimestamp = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString(); // Format as readable local date-time
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure to delete?')) {
      return;
    }
    try {
      await axios.delete(`/api/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error(err);
      setError('Failed to delete posts.');
    }
  };

  const handleEdit = async (postId) => {
    navigate(`/edit/${postId}`);
  };

  if (loading) {
    return <p className="loading-message">Loading posts...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  if (posts.length === 0) {
    return (
      <div className="container">
        <button onClick={() => handleCreate()}>Create Post</button>
        <p className="no-posts">No posts available.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <button className="main-btn" onClick={() => handleCreate() }>Create Post</button>

      <h1>Posts</h1>

      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post._id} className="post-item">

            <Link to={`/profile/${post.owner._id}`}>
              <h2>{post.owner.name}</h2>
            </Link>

            <p>Posted on: {formatTimestamp(post.createdAt)}</p>
            <p className="post-text">{post.text}</p>
            <div className="actions">
              <button className="main-btn" onClick={() => handleEdit(post._id)}>Edit</button>
              <button className="main-btn" onClick={() => handleDelete(post._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Mainpage;
