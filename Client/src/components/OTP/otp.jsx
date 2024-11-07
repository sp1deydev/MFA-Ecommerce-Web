import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useSelector } from 'react-redux';
import { Flex, Typography } from 'antd';
import { otpApi } from '../../api/otpApi';
import { toast } from 'react-toastify';
import Loading from '../loading';
const { Title } = Typography;

const OTP = () => {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSetEmail, setIsSetEmail] = useState(false);
  const [otpEmail, setotpEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(30); // 30-second timer
  const [isCounting, setIsCounting] = useState(true);

  // Start countdown on component mount or when 'isCounting' changes
  useEffect(() => {
    if (isCounting) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev > 0) return prev - 1;
          clearInterval(timer);
          return 0;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isCounting, countdown]);

  // Restart countdown (e.g., when a new OTP is sent)
  const resetCountdown = async () => {
    try {
        setIsLoading(true);
        const response = await otpApi.generateOTP({email: otpEmail});
        if(!response.data.success) {
            setIsLoading(false);
            toast.error(response.data.message);
            return;
        }
        else {
            toast.success(response.data.message);
            setIsSetEmail(true);
            const expires = Number(response.data.expires/1000);
            setCountdown(expires);
            setIsCounting(true);
            setIsLoading(false);
        }
    }
    catch (err) {
        toast.error('Get error when try to send email!');
        setIsLoading(false);
    }
  };
  const resetEmail = () => {
    setIsSetEmail(false);
    setotpEmail('')
    setIsCounting(false);
  };

  // Function to handle form submission
  const onSendmail = async (values) => {
    console.log('Received values:', values);
    try {
        setIsLoading(true);
        setotpEmail(values.email)
        const response = await otpApi.generateOTP(values);
        if(!response.data.success) {
            setIsLoading(false);
            toast.error(response.data.message);
            return;
        }
        else {
            toast.success(response.data.message);
            setIsSetEmail(true);
            const expires = Number(response.data.expires/1000);
            setCountdown(expires);
            setIsCounting(true);
            setIsLoading(false);
        }
    }
    catch (err) {
        toast.error('Get error when try to send email!');
        setIsLoading(false);
    }
  };

  // Function to show the modal
  const showModal = () => {
    setVisible(true);
    setIsSetEmail(false);
    setotpEmail('')
    setIsCounting(false);
  };

  // Function to handle modal cancel
  const handleCancel = () => {
    setVisible(false);
    setIsLoading(false);
    setIsSetEmail(false);
    setotpEmail('')
    setIsCounting(false);
  };

  const onChange = (text) => {
    const onlyNumbers = text.target.value.replace(/\D/g, '');
    setOtp(onlyNumbers);
    // setOtp(text); // Store OTP value in state
  };

  const handleOTP = async (e) => {
    // e.preventDefault();
    console.log('Submitted OTP:', otp);
    try {
        setIsLoading(true);
        const response = await otpApi.verifyOTP({email: otpEmail, otp: otp});
        if(!response.data.success) {
            toast.error(response.data.message);
            setIsLoading(false);
            return;
        }
        else {
            toast.success(response.data.message);
            setIsSetEmail('');
            setCountdown(0);
            setIsCounting(false);
            setIsLoading(false);
            setVisible(false);
        }
    }
    catch (err) {
        const errorMessage = err.response.data?.message || 'Get error when try to send email!'
        toast.error(errorMessage);
        setIsLoading(false);
    }
    // Perform OTP verification here
  };

  const emailElement = (
        <Form
          name="username-form"
          onFinish={onSendmail}
          layout="vertical"
          initialValues={{ username: '' }}
        >
            <Typography.Title level={5}>Input Your Email</Typography.Title>
          <Form.Item
            // label="Username"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input placeholder="Enter your username"/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} disabled={isLoading}>
             {isLoading && <Loading color="#fff" bgColor="#1677ff" size="50"/>}
              Send OTP
            </Button>
          </Form.Item>
        </Form>
  )
  const otpElement = (
    <Flex gap="middle" align="flex-start" vertical>
      <Flex gap="middle" align="flex-start">
        <Typography.Title level={5}>OTP Verification</Typography.Title>
        <Typography.Text type={countdown === 0 ? "danger" : "secondary"}>
          {countdown > 0 ? `Expires in ${countdown}s` : "OTP expired"}
        </Typography.Text>
      </Flex>

      <Form onFinish={handleOTP}>
        <Form.Item
          name="otp"
          rules={[
            { required: true, message: "OTP is required" },
            { min: 6, message: "OTP must be at least 6 characters" }, // Minimum length rule
            { pattern: /^\d+$/, message: "OTP must be a number" }, // Only numbers allowed
          ]}
        >
          <Input
            maxLength={6}
            value={otp}
            placeholder="Enter OTP"
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item>
          <Flex gap="middle" align="flex-start">
            <Button type="primary" htmlType="submit" disabled={countdown === 0 || isLoading}>
              Submit OTP
            </Button>
            <Button
              type="link"
              onClick={resetCountdown}
              disabled={countdown > 0 || isLoading}
            >
              Resend OTP
            </Button>
            <Button type="link" onClick={resetEmail} disabled={isLoading}>
              Another email?
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Flex>
  );


  return (
    <div>
      {/* Button to trigger the modal */}
      <Button type="primary" onClick={showModal}>
        Open Modal Form
      </Button>

      {/* Modal containing the form */}
      <Modal
        // title="Input your email"
        visible={visible}
        maskClosable={false}
        onCancel={handleCancel}
        footer={null} // To avoid the default footer and customize the button
        width={400}
        bodyStyle={isLoading ? {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }: ""}
      >
        {isLoading ? 
            <Loading color="#fff" bgColor="#1677ff" size='64'/> : 
            isSetEmail ? otpElement : emailElement
        }
      </Modal>
    </div>
  );
};

export default OTP;
