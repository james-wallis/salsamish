import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Typography, Row, Col, Button, Popconfirm, Icon } from 'antd';
const { Title } = Typography;

const showEvent = props => {
    const { event, deleteEvent } = props;
    const { _id, name, type, facebook, agenda, date: { start, end } } = event;
    const description = (event.description) ? formatDescription(event.description) : 'Description: N/A';
    return <div style={{ marginTop: 50 }}>
        <Row>
            <Col xs={15}>
                <Title level={3}>
                    {name}
                    <span style={{ fontWeight: 300, color: 'grey', textTransform: 'capitalize' }}>
                        {` (${type.toLowerCase()})`}
                    </span>
                </Title>
                <p style={{ fontStyle: 'italic', marginBottom: 0 }}>
          From: {moment(start).format('dddd, MMMM Do YYYY, h:mm A')}
                </p>
                <p style={{ fontStyle: 'italic' }}>
          Until: {moment(end).format('dddd, MMMM Do YYYY, h:mm A')}
                </p>
                {description}
                <p>
          Facebook link:
                    {
                        (facebook)
                            ? <a href={facebook} target='_blank' rel='noopener noreferrer'> {facebook}</a>
                            : <span> N/A</span>
                    }

                </p>
            </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
            <Col xs={24}>
                <Title level={3}>
          Agenda
                </Title>
            </Col>
            {
                splitArrayIntoColumns(agenda).map((e, i) => (
                    <Row style={{ marginBottom: 10 }} key={`event-agenda-row-${i}`}>
                        {printAgenda(event, e[0])}
                        {(e[1]) ? printAgenda(event, e[1]) : null}
                        {(e[2]) ? printAgenda(event, e[2]) : null}
                    </Row>
                ))
            }
        </Row>
        <Row>
            <Col xs={24}>
                <Title level={3}>Actions</Title>
                <Button style={{ marginRight: 10 }} icon="edit" href={`/events/edit?id=${_id}`}>Edit</Button>
                <Popconfirm
                    placement="bottomLeft"
                    title={'Are you sure you want to delete this event?'}
                    onConfirm={deleteEvent}
                    okText="Yes"
                    cancelText="No"
                    icon={<Icon type="warning" style={{ color: 'red' }} />}
                >
                    <Button type="danger" icon="delete">Delete</Button>
                </Popconfirm>
            </Col>
        </Row>
    </div>;
};

const printAgenda = (event, agenda) => {
    return <Col xs={8} >
        <div style={{ backgroundColor: 'white', padding: 10, marginRight: 10 }}>
            <Title level={4}>{agenda.name}</Title>
            <p style={{ fontStyle: 'italic', marginBottom: 0 }}>
        From: {moment(agenda.start).format('h:mm A')}
            </p>
            <p style={{ fontStyle: 'italic' }}>
        Until: {moment(agenda.end).format('h:mm A')}
            </p>
            <p style={{ textDecoration: 'underline', marginBottom: 0 }}>Team Member</p>
            <p style={{ textTransform: 'capitalize' }}>{(agenda.employee) ? agenda.employee.name : 'N/A'}</p>
            <p style={{ textDecoration: 'underline', marginBottom: 0 }}>Type</p>
            <p style={{ textTransform: 'capitalize' }}>{agenda.type.toLowerCase()} <span style={{ textTransform: 'capitalize' }}>{(agenda.lesson_level) ? `(${agenda.lesson_level.toLowerCase()})` : null}</span></p>
            <p style={{ textDecoration: 'underline', marginBottom: 0 }}>Description</p>
            {(event.description) ? formatDescription(event.description) : <p>N/A</p>}
        </div>
    </Col >;
};

const formatDescription = unformatted => {
    const desc = unformatted.split('\n');
    return <div>
        {desc.map((text, i) => {
            return (text !== '') ? <p key={`description-${i}`}>{text}</p> : <br key={`description-${i}`} />;
        })}
    </div>;
};

const splitArrayIntoColumns = array => {
    const newArray = [];
    for (let i = 0; i < array.length; i+=3) {
        newArray.push([array[i], array[i+1], array[i+2]]);
    }
    return newArray;
};

showEvent.propTypes = {
    event: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        date: PropTypes.shape({
            start: PropTypes.string.isRequired,
            end: PropTypes.string.isRequired,
        }),
        description: PropTypes.string,
        facebook: PropTypes.string,
        agenda: PropTypes.array,
    }),
    deleteEvent: PropTypes.func.isRequired,
};

export default showEvent;