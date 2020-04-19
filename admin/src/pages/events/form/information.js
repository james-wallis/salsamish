import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Radio } from 'antd';

const { TextArea } = Input;

class Information extends React.Component {
    render() {
        const { getFieldDecorator, handleChange, values } = this.props;
        const { type, name, description } = values;
        return <div>
            <Form.Item label="Type">
                {getFieldDecorator('type', {
                    initialValue: (type !== '') ? type : '',
                    rules: [{ required: true, message: 'Please select the event type' }],
                })(
                    <Radio.Group onChange={(e) => handleChange(e, 'type')}>
                        <Radio.Button value="FRIDAY">Friday Salsa</Radio.Button>
                        <Radio.Button value="CUSTOM">Custom</Radio.Button>
                    </Radio.Group>
                )}
            </Form.Item>

            <Form.Item style={{ width: 400 }}label="Name">
                {getFieldDecorator('name', {
                    initialValue: (name !== '') ? name : '',
                    rules: [{ required: true, message: 'Please input the event name' }],
                })(<Input onChange={(e) => handleChange(e, 'name')} />)}
            </Form.Item>

            <Form.Item label="Description (Optional)" style={{ width: 400 }}>
                {getFieldDecorator('description', {
                    initialValue: (description !== '') ? description : '',
                })(
                    <TextArea placeholder="Description" rows={9} onChange={(e) => handleChange(e, 'description')} />,
                )}
            </Form.Item>
        </div>;
    }
}

Information.propTypes = {
    getFieldDecorator: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    values: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        type: PropTypes.string,
    }),
};

export default Information;