import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

function CreatePage() {
  const [text, setText] = useState('');
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post('/api/posts', { text });
      console.log('Post created successfully:', response.data);
      navigate('/main'); 
    }catch(err){
      console.log(err);
      setError('Failed to create the post. Please try again.');
    }
    
  };

  return (
    <div>
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your post here..."
          required
        />
        <button type="submit">Create Post</button>
        <h1>{text}</h1>
      </form>
      <button onClick={() => navigate('/main')}>Cancel</button>
    </div>
  );
}

export default CreatePage;
