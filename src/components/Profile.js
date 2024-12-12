import React, {  useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import '../styles/Profile.css';
import Header from './Header';
import Footer from './Footer';

const Profile = () => {
    const { user,setUser } = useContext(UserContext);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/${user.user_id}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
    }, [user.user_id,setUser]);

    return (
        <div>
            <Header />
        <div className="profile-container">
            {user ? (
                <div className="profile-card">
                    <h2 className="profile-title">Thông Tin</h2>
                    <div className="profile-details">
                        <div className="profile-field">
                            <strong>Username:</strong>
                            <span>{user.username}</span>
                        </div>
                        <div className="profile-field">
                            <strong>Email:</strong>
                            <span>{user.email}</span>
                        </div>
                        <div className="profile-field">
                            <strong>Số Điện Thoại:</strong>
                            <span>{user.sdt}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
        <Footer />
        </div>
    );
};

export default Profile;
