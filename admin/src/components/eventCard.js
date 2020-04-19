import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';

const { Meta } = Card;

function EventCard(props) {
    const { event: { name, type, date, description, _id } } = props;
    const { start } = date;
    const dateString = (start) ? moment(start).format('DD/MM/YYYY') : null;
    return (
        <Col xs={24} sm={12} md={12} lg={8} xl={6} style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
            <Link to={`/events/view?id=${_id}`}>
                <Card
                    style={{ width: 240 }}
                    bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}
                >
                    <Meta
                        title={name}
                        description={dateString}
                        style={{ borderBottom: '1px #eee solid', marginBottom: 10, paddingBottom: 10}}
                    />
                    <div style={{ paddingLeft: 5, paddingRight: 5 }}>
                        <p style={{ margin: 0, textTransform: 'Capitalize' }}>Type: {type.toLowerCase()}</p>
                        <p>{description}</p>
                    </div>
                </Card>
            </Link>
        </Col>
    );
}

EventCard.propTypes = {
    event: PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        date: PropTypes.shape({
            start: PropTypes.string.isRequired,
        }),
        description: PropTypes.string,
        _id: PropTypes.string.isRequired,
    }),
};

export default EventCard;