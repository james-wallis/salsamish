import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

function TitleBox() {
  return (
    <div style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
      <img style={{ width: '90%' }} src="/SalsaMishLogo.png" alt="Salsa Mish" />
      <Title style={{ color: 'white', fontSize: 20, fontWeight: 400, margin: 0 }}>admin</Title>
    </div>
  );
}

export default TitleBox;
