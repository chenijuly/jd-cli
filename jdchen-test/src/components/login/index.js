import React, { Component } from 'react';
import { InputItem, WhiteSpace, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import imgPath from 'assets/js/transImg';
import 'assets/css/form.less';
import request from '@/utils/request';
// import { userTypeRouter as conUserTypeRouter } from '@/config'

@createForm()
class Login extends Component {
  // func: 提交
  submit = () => {
    const { validateFields } = this.props.form;
    validateFields(async (err, value) => {
      if (!err) {
        const { username, password } = value;
        const newMobile = username.replace(/\s/g, '');
        const data = {
          username: newMobile,
          password,
        };
        const res = await request('/eCommerceAnalysis/event/login', {
          method: 'POST',
          body: data,
        });
        console.log('res:', res);
        // if (res.success) {
        //   const { userType } = res.data
        //   sessionStorage.setItem('userType', userType)
        //   this.props.history.replace(conUserTypeRouter[userType])
        // }
      }
    });
  }

  // func：跳转到注册
  toRegister = () => {
    this.props.history.push('/register');
  }

  // render
  render () {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div className="container">
        <div className="form-container">
          <InputItem
            {...getFieldProps('username', {
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
            {(errors = getFieldError('username')) ? errors.join(',') : null}
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
        </div>
        <Button type="primary" onClick={this.submit}>登录</Button>
        <WhiteSpace size="lg"/>
        <Button type="ghost" onClick={this.toRegister}>用户注册</Button>
      </div>
    );
  }
}

export default Login;
