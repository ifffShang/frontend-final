import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import './Profile.css';

export default function Profile() {
  const {user} = useContext(UserContext); // get the user info
  const [tweets, setTweets] = useState([]);
  const [loadingTweets, setLoadingTweets] = useState(true); // Track loading state for tweets
  const [error, setError] = useState(null); // Error state for tweets

  const formatTimestamp = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString(); // Format as readable local date-time
  };

  // get users' tweets
  useEffect(() => {
    if (user) {
      setLoadingTweets(true); // Start loading when user is present
      setError(null); // Reset any previous errors
      console.log(user);
      console.log(user._id);
      axios.get(`/api/posts/user/${user._id}`)
        .then(response => {
          console.log(response);
          setTweets(response.data);
          setLoadingTweets(false);
        })
        .catch(error => {
          console.error("Error fetching tweets:", error);
          setError('There was an error loading tweets.');
          setLoadingTweets(false); 
        });
    }
  }, [user]);

  console.log(tweets);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        {/* avator and information */}
        <img src={user.avatarUrl || "/default-avatar.png"} alt="Profile Avatar" className="profile-avatar" />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.bio || "This user has no bio."}</p>
      </div>

      {/* tweets */}
      <div className="tweets-section">
        <h3>Recent Tweets</h3>

        {Array.isArray(tweets) && tweets && tweets.length > 0 ? (
          <ul className="posts-list">
          {tweets.map((tweet) => (
            <li key={tweet._id} className="post-item">
              <h2>{user.name}</h2>
              <p>Posted on: {formatTimestamp(tweet.createdAt)}</p>
              <p className="post-text">{tweet.text}</p>
              <div className="actions">
              
            </div>
          </li>
        ))}
      </ul>
         
        ) : (
          <p>No tweets yet.</p>
        )}
      </div>
      
      {/* settings */}
      {/* <div className="settings-link">
        <a href="/settings">Edit Profile</a>
      </div> */}
    </div>
  );
}