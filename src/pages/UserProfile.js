import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import { useParams } from 'react-router-dom';

export default function UserProfile() {
  const {userId} = useParams();
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState(null);
  const [loadingTweets, setLoadingTweets] = useState(true); // Track loading state for tweets
  const [error, setError] = useState(null); // Error state for tweets
  const [loadingUser, setLoadingUser] = useState(true);
  const [loading, setLoading] = useState(true); // 加载状态

  const formatTimestamp = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString(); // Format as readable local date-time
  };

  // get users' tweets
  useEffect(() => {
    if (userId) {
      setLoadingTweets(true); // Start loading when user is present
      setError(null); // Reset any previous errors
      setLoadingUser(true);

      axios.get(`/api/posts/user/${userId}`)
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
      
        axios.get(`/${userId}`)
        .then(response => {
          setUser(response.data); 
          setLoading(false); 
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
          setError('There was an error loading user data.'); 
          setLoading(false); 
        });
    }
  }, [userId]);

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