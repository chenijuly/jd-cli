import React, { Component } from 'react';
import { InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import 'assets/css/form.less';
import imgPath from 'assets/js/transImg';
import request from '@/utils/request';
import { toastTime } from '@/config';

const { durationShort } = toastTime;

@createForm()
class Register extends Component {

  // func: 提交
  submit = () => {
    const { validateFields } = this.props.form;
    validateFields(async (err, value) => {
      if (!err) {
        const { mobile, name, password, passwordSure } = value;
        if (password !== passwordSure) {
          Toast.info('两次输入的密码不一致', durationShort);
          return false;
        }
        const newMobile = mobile.replace(/\s/g, '');
        const data = {
          mobile: newMobile,
          name,
          password,
        };
        const res = await request('/eCommerceAnalysis/event/register', {
          method: 'POST',
          body: data,
        });
        if (res.success) {
          this.props.history.replace('/login');
        }
      }
    });
  }

  // render
  render () {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div className="container">
        <div className="form-container">
          <InputItem
            {...getFieldProps('mobile', {
              rules: [{
                required: true,
                message: '手机号不能为空',
              }, {
                pattern: /^1[3-9]\d\s\d{4}\s\d{4}$/,
                message: '请输入正确的手机号',
              }],
            })}
            type="phone"
            placeholder="手机号"
          >
            <div style={{
              backgroundImage: `url(${imgPath.phoneImg})`,
              backgroundSize: 'cover',
              height: '22px',
              width: '22px',
            }}/>
          </InputItem>
          <div className="err-container">
            {(errors = getFieldError('mobile')) ? errors.join(',') : null}
          </div>
          <InputItem
            {...getFieldProps('name', {
              rules: [{
                required: true,
                message: '姓名不能为空',
              }],
            })}
            placeholder="姓名"
          >
            <div style={{
              backgroundImage: `url(${imgPath.userImg})`,
              backgroundSize: 'cover',
              height: '22px',
              width: '22px',
            }}/>
          </InputItem>
          <div className="err-container">
            {(errors = getFieldError('name')) ? errors.join(',') : null}
          </div>
          <InputItem
            {...getFieldProps('password', {
              rules: [{
                pattern: /^[0-9a-zA-Z]{6,8}$/,
                message: '请输入6-8位数字或字母组成的密码',
              }, {
                required: true,
                message: '密码不能为空',
              }],
            })}
            type="password"
            placeholder="密码"
          >
            <div style={{
              backgroundImage: `url(${imgPath.passwordImg})`,
              backgroundSize: 'cover',
              height: '22px',
              width: '22px',
            }}/>
          </InputItem>
          <div className="err-container">
            {(errors = getFieldError('password')) ? errors.join(',') : null}
          </div>
          <InputItem
            {...getFieldProps('passwordSure', {
              rules: [{
                pattern: /^[0-9a-zA-Z]{6,8}$/,
                message: '请输入6-8位数字或字母组成的密码',
              }, {
                required: true,
                message: '确认密码不能为空',
              }],
            })}
            type="password"
            placeholder="确认密码"
          >
            <div style={{
              backgroundImage: `url(${imgPath.passwordImg})`,
              backgroundSize: 'cover',
              height: '22px',
              width: '22px',
            }}/>
          </InputItem>
          <div className="err-container">
            {(errors = getFieldError('passwordSure')) ? errors.join(',') : null}
          </div>
        </div>
        <Button type="primary" onClick={this.submit}>注册</Button>
      </div>
    );
  }
}

export default Register;
