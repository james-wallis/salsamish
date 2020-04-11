import React from 'react';

function CurrentUser(props) {
  console.log(props);
  
  const { name } = props;
  const containerStyles = {
    backgroundColor: 'rgb(0, 12, 23)',
    width: '100%', 
    textAlign: 'center', 
    position: 'absolute', 
    bottom: 6,
    padding: '20px 0',
  }
  return (
    <div style={containerStyles}>
      <p style={{ color: 'white', fontSize: 20, fontWeight: 400, margin: 0 }}>Signed in as {name}</p>
      <a href='/account' style={{ color: 'white', textDecoration: 'underline', fontSize: 10 }}>Manage account</a>
    </div>
  );
}

export default CurrentUser;
