import React from 'react';
import {Button, Col, DatePicker, Form, Input, Modal, Row, Select} from 'antd';
import {FormComponentProps} from 'antd/lib/form';

const {Option} = Select;

const layout = {
  labelCol: {span: 5},
  wrapperCol: {span: 19},
};

const colLayout = {
  labelCol: {span: 10},
  wrapperCol: {span: 14},
};

// const typeLayout = {
//   labelCol: { span: 5 },
//   wrapperCol: { span: 8 },
// };

const tailLayout = {
  wrapperCol: {offset: 5, span: 19},
};

interface Props extends FormComponentProps {
  visible: boolean;
  onCancelEdit: () => void;
  onSaveEdit: () => void;
  wrappedComponentRef: (formRef: any) => void;
}

const leaveDataProps = [
  {keyword: 'Nghỉ phép thường', value: 'Nghỉ phép thường'},
  {keyword: 'Nghỉ ốm', value: 'Nghỉ ốm'},
  {keyword: 'Nghỉ bù', value: 'Nghỉ bù'},
  {keyword: 'Nghỉ kết hôn', value: 'Nghỉ kết hôn'},
  {keyword: 'Nghỉ chế độ sinh con (của bố)', value: 'Nghỉ chế độ sinh con (của bố)'},
];

interface OptionProps {
  keyword: string;
  value: string;
}

const CollectionCreateForm = Form.create<Props>({name: 'form_in_modal'})(
  // eslint-disable-next-line
  class extends React.Component<any, any> {
    render() {
      const {visible, onCancelEdit, onSaveEdit, form} = this.props;
      const {getFieldDecorator} = form;
      return (
        <Modal
          visible={visible}
          title="Sửa yêu cầu nghỉ phép"
          okText="Tạo yêu cầu"
          cancelText="Huỷ"
          onCancel={onCancelEdit}
          onOk={onSaveEdit}
          width={680}
          footer={
            <Row className="row" style={{textAlign: 'left', border: '0'}}>
              <Col md={5}></Col>
              <Col md={19}>
                <Button type="danger" style={{width: '100px '}} onClick={onSaveEdit}>
                  Tạo yêu cầu
                </Button>
                <Button style={{width: '100px '}} onClick={onCancelEdit}>
                  Huỷ
                </Button>
              </Col>
            </Row>
          }
        >
          <Form>
            <Form.Item {...layout} label="Nhân sự" hasFeedback>
              {getFieldDecorator('personnel', {})(<Input placeholder="Do Hoai Nam" value="Do Hoai Nam" disabled/>)}
            </Form.Item>
            <Row className="row">
              <Col md={12}>
                <Form.Item {...colLayout} label="Ngày bắt đầu nghỉ" hasFeedback>
                  {getFieldDecorator(
                    'startdate',
                    {},
                  )(<DatePicker placeholder="30/01/2020" style={{width: '100%'}}/>)}
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item {...colLayout} label="Giờ bắt đầu" hasFeedback>
                  {getFieldDecorator('starttime', {})(<Input placeholder="08:00"/>)}
                </Form.Item>
              </Col>
            </Row>
            <Row className="row">
              <Col md={12}>
                <Form.Item {...colLayout} label="Ngày kết thúc nghỉ" hasFeedback>
                  {getFieldDecorator('enddate', {})(<DatePicker placeholder="01/02/2020" style={{width: '100%'}}/>)}
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item {...colLayout} label="Giờ kết thúc" hasFeedback>
                  {getFieldDecorator('endtime', {})(<Input placeholder="17:30"/>)}
                </Form.Item>
              </Col>
            </Row>
            <Row className="row">
              <Col md={12}>
                <Form.Item {...colLayout} label="Trạng thái" hasFeedback>
                  {getFieldDecorator('request', {})(<Input placeholder="Đã duyệt" disabled/>)}
                </Form.Item>
              </Col>
              <Col md={12}>
                <Form.Item {...colLayout} label="Loại nghỉ phép" hasFeedback>
                  {getFieldDecorator('typeleave', {
                    rules: [
                      {
                        message: 'Chọn giờ kết thúc',
                        required: true,
                      },
                    ],
                  })(
                    <Select placeholder="Chọn loại nghỉ phép">
                      {leaveDataProps.map((item: OptionProps, index: number) => {
                        return (
                          <Option key={index} value={item.value}>
                            {item.keyword}
                          </Option>
                        );
                      })}
                    </Select>,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item {...tailLayout} style={{margin: '0'}}>
              <Input.TextArea rows={4} placeholder="Nhập lý do"/>
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);
export default CollectionCreateForm;
