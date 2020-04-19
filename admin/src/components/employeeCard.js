import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col } from 'antd';
    
function EmployeeCard(props) {
    const { employee: { name, role, image } } = props;
    return (
        <Col xs={24} sm={12} md={12} lg={8} xl={6} style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
            <Card
                style={{ width: 240 }}
                cover={<img style={{ height: 200, objectFit: 'cover' }} alt={`Source: "${image}"`} src={image} />}
            >
                <p style={{ fontSize: 20, margin: 0 }}>{name}</p>
                <p style={{ fontSize: 12, margin: 0 }}>{role}</p>
            </Card>
        </Col>
    );
}

EmployeeCard.propTypes = {
    employee: PropTypes.shape({
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }),
};

export default EmployeeCard;