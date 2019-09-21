import React from 'react';
import axios from 'axios';
import { Typography, Form, Icon, Input, Button, Radio, Checkbox, Upload, message, Row, Col } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;

const music = [
  { value: 'BACHATA', text: 'Bachata/Salsa' }, 
  { value: 'KIZOMBA', text: 'Kizomba' }
];
const dance = [
  { value: 'BACHATA', text: 'Bachata' },
  { value: 'SALSA', text: 'Salsa' },
  { value: 'KIZOMBA', text: 'Kizomba' },
  { value: 'RUEDA', text: 'Rueda' },
  { value: 'CHACHACHA', text: 'Chachacha' }
];
const roles = ['DJ', 'TEACHER']

class Add extends React.Component {
  state = {
    fileList: [],
    uploading: false,
    role: roles[0],
    values: {}
  };

  handleChange = info => {
    getBase64(info.file, imageUrl =>
      this.setState({
        imageUrl
      }),
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      uploading: true,
    });

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('role', values.role);
        formData.append('image', values.upload.file);
        if (values.role === 'DJ') formData.append('music', values.music);
        if (values.role === 'TEACHER') formData.append('dance', values.dance);
        formData.append('description', values.description)
        axios.post('/api/employees', formData, { // receive two parameter endpoint url ,form data 
        }).then(res => { // then print response status
          message.success(`${values.name} has been successfully added (Status code ${res.status}).`)
        }).catch(err => {
          switch (err.response.status) {
            case 400:
              message.error('Error: An invalid employee role was sent to the server (Status code 400)');
              break;
            case 404:
              message.error('Error: The form is missing data (Status code 404)');
              break;
            case 409:
              message.error('Error: An employee with that name already exists in the database (Status code 409)');
              break;
            case 500:
              message.error('Error: An error has occured on the server (Status code 500)');
              break;
            default:
              message.error('Error: An unknown error has occured (Status code ' + err.response.status + ')');
              break;
          }
        })
      }
    });
  };

  beforeUpload = file => {
    const isPng = file.type === 'image/png';
    if (!isPng) {
      message.error('You can only upload PNG file');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB');
    }
    return false;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { imageUrl, role } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const styleOfMusic = (
      <Form.Item label="Style of music">
        {getFieldDecorator('music', {
          rules: [{ required: (role === 'DJ'), message: 'Please select the DJ\'s styles of music' }],
        })(
          <Checkbox.Group style={{ width: '100%' }}>
            <Row>
              {music.map((type, i) => {
                return <Col key={`music-checkbox-${i}`} span={8}>
                  <Checkbox value={type.value}>{type.text}</Checkbox>
                </Col>
              })}
            </Row>
          </Checkbox.Group>,
        )}
      </Form.Item>
    );
    const typeOfDance = (
      <Form.Item label="Type of dance">
        {getFieldDecorator('dance', {
          rules: [{ required: (role === 'TEACHER'), message: 'Please select the Teacher\'s styles of dance' }],
        })(
          <Checkbox.Group style={{ width: '100%' }}>
            <Row>
              {dance.map((type, i) => {
                return <Col key={`music-checkbox-${i}`} span={8}>
                  <Checkbox value={type.value}>{type.text}</Checkbox>
                </Col>
              })}
            </Row>
          </Checkbox.Group>,
        )}
      </Form.Item>
    );
    return (
      <Form onSubmit={this.handleSubmit} layout='horizontal'>
        <Row>
          <Col xs={24}>
            <Title level={2}>Add an employee</Title>
          </Col>
        </Row>
        <Row>
          <Col xs={9} >
            <Form.Item label="Name" style={{ width: '100%' }}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the employee\'s name' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Name"
                />,
              )}
            </Form.Item>
            <Form.Item label="Description" style={{ width: '100%' }}>
              {getFieldDecorator('description', {
                rules: [{ required: true, message: 'Please input the employee\'s description' }],
              })(
                <TextArea placeholder="Description" rows={9} />,
              )}
            </Form.Item>
            
          
            <Form.Item wrapperCol={{ span: 12 }}>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Submit</Button>
            </Form.Item>
          </Col>
          <Col xs={12} offset={3} >
            <Form.Item label="Role">
              {getFieldDecorator('role', {
                initialValue: roles[0],
                rules: [{ required: true, message: 'Please select the employee\'s role' }],
              })(
                <Radio.Group onChange={(e) => this.setState({ role: e.target.value })}>
                  <Radio.Button checked={true} value={roles[0]}>DJ</Radio.Button>
                  <Radio.Button value={roles[1]}>Teacher</Radio.Button>
                </Radio.Group>,
              )}
            </Form.Item>
            {(role && role === 'TEACHER') ? typeOfDance : styleOfMusic}
            <Form.Item label="Upload employee image">
              {getFieldDecorator('upload', {
                rules: [{ required: true, message: 'Please add the employee\'s picture' }],
              })(
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange}
                  accept=".png"
                >
                  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>,
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const WrappedNormalLoginForm = Form.create({ name: 'employee_add' })(Add);

export default WrappedNormalLoginForm;