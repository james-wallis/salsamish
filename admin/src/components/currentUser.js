import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CurrentUser(props) {
    const { user } = props;
    const name = (user && user.name) ? user.name : '';
    const containerStyles = {
        backgroundColor: 'rgb(0, 12, 23)',
        width: '100%', 
        textAlign: 'center', 
        position: 'absolute', 
        bottom: 6,
        padding: '20px 0',
    };
    return (
        <div style={containerStyles}>
            <p style={{ color: 'white', fontSize: 20, fontWeight: 400, margin: 0 }}>Signed in as {name}</p>
            <Link to='/account' style={{ color: 'white', textDecoration: 'underline', fontSize: 10 }}>Manage account</Link>
        </div>
    );
}

CurrentUser.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
    }),
};

export default CurrentUser;
