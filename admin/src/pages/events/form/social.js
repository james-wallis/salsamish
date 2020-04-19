import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

class Social extends React.Component {
    render() {
        const { getFieldDecorator, handleChange, values: { facebook } } = this.props;
        return <div>
            <Form.Item style={{ width: 400 }} label="Facebook link">
                {getFieldDecorator('facebook', {
                    initialValue: (facebook !== '') ? facebook : '',
                })(<Input onChange={(e) => handleChange(e, 'facebook')} />)}
            </Form.Item>
        </div>;
    }
}

Social.propTypes = {
    getFieldDecorator: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    values: PropTypes.shape({
        facebook: PropTypes.string,
    }),
};

export default Social;