import { register, sendVerificationCode } from '@/services/ant-design-pro/api';
import { history } from '@umijs/max';
import { Button, Card, Form, Input, message } from 'antd';
import React from 'react';

const Register = () => {
  const [countdown, setCountdown] = React.useState(60); //验证码倒计时
  const [isCounting, setIsCounting] = React.useState(false); //控制验证码按钮状态
  const [form] = Form.useForm();

  const getVerificationCode = async (phone: string) => {
    if (!phone) {
      message.error('手机号不能为空');
      return;
    }
    try {
      // 请求后端接口发送验证码
      const response = await sendVerificationCode(phone);
      if (response.code === 200) {
        message.success('验证码已发送！');
        setIsCounting(true);
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              setIsCounting(false);
              setCountdown(60);
              return 60;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        message.error('验证码发送失败，请稍后再试');
      }
    } catch (error) {
      message.error('验证码发送失败，请稍后再试');
    }
  };

  const handleRegisterSubmit = async (values: API.RegisterParams) => {
    try {
      // 注册请求
      const response = await register(values);
      if (response.code === 200) {
        message.success('注册成功！');
        // 注册成功后，跳转到登录页面
        history.push('/user/login');
      } else {
        message.error(response.msg);
      }
    } catch (error) {
      message.error('注册失败，请稍后重试');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Card
        title="注册账户"
        style={{
          width: 400,
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Form
          name="register"
          form={form}
          onFinish={handleRegisterSubmit}
          initialValues={{ remember: true }}
          style={{ maxWidth: '100%' }}
        >
          {/* 用户名输入框 */}
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          {/* 密码输入框 */}
          <Form.Item
            name="password"
            label="密码"
            rules={[
              { required: true, message: '请输入密码!' },
              { min: 6, message: '密码至少为6位' },
            ]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          {/* 确认密码输入框 */}
          <Form.Item
            name="confirmPassword"
            label="确认密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: '请确认您的密码!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不匹配!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="确认密码" />
          </Form.Item>

          {/* 手机号输入框 */}
          <Form.Item
            name="phoneNumber"
            label="手机号"
            rules={[
              { required: true, message: '请输入手机号!' },
              {
                pattern: /^1([3-9])[0-9]{9}$/,
                message: '请输入有效的手机号',
              },
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>

          {/* 验证码输入框 */}
          <Form.Item
            name="verificationCode"
            label="验证码"
            rules={[{ required: true, message: '请输入验证码!' }]}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Input style={{ flex: 1 }} placeholder="请输入验证码" />
              <Button
                type="primary"
                onClick={() => getVerificationCode(form.getFieldValue('phoneNumber'))}
                disabled={isCounting}
                style={{ marginLeft: '10px' }}
              >
                {isCounting ? `${countdown}s` : '获取验证码'}
              </Button>
            </div>
          </Form.Item>

          {/* 提交按钮 */}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              注册
            </Button>
          </Form.Item>
        </Form>

        {/* 登录跳转 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <a
            style={{
              textAlign: 'center',
            }}
            onClick={() => {
              history.push('/user/login');
            }}
          >
            已有账户？点击登录
          </a>
        </div>
      </Card>
    </div>
  );
};

export default Register;
