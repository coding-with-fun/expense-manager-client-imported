import React, { useState } from 'react';
import { connect } from 'react-redux';

const Profile = ({ user }) => {
    const [userDetails, setUserDetails] = useState(user);

    return <div>{userDetails.name}</div>;
};

export default connect((state) => {
    return {
        user: state.user.userDetails,
    };
})(Profile);
