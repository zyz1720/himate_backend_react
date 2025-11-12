import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  setAlpha,
} from '@ant-design/pro-components';
import { Space, Tabs, message, theme } from 'antd';
import { useState } from 'react';
import { useUserStore } from '@/stores/userStore';
import { useLayoutStore } from '@/stores/layoutStore';
import { useNavigate } from 'react-router';
import { userLogin, loginByCode } from '@/api/auth/login';
import { getVerifyCode } from '@/api/auth/verify';
import { useTranslation } from 'react-i18next';

function Login() {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { setUserToken, setTokenType, setUserInfo } = useUserStore();
  const { headerConfig } = useLayoutStore();

  const { token } = theme.useToken();
  const [loginType, setLoginType] = useState('account');
  const loginTypeMap = {
    account: {
      title: t('login.account_login'),
      func: userLogin,
    },
    code: {
      title: t('login.code_login'),
      func: loginByCode,
    },
  };

  // 登录
  const onFinish = async (values) => {
    try {
      const response = await loginTypeMap[loginType].func(values);
      if (response.code === 0) {
        setUserToken(response.data?.access_token);
        setTokenType(response.data?.token_type);
        setUserInfo();
        navigate('/welcome');
      }
      if (response.code === 0) {
        message.success(t('login.success'));
      }
    } catch (error) {
      console.error('error', error);
      message.error(t('login.fail'));
    }
  };

  const iconStyles = {
    marginInlineStart: '16px',
    color: setAlpha(token.colorTextBase, 0.2),
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };

  return (
    <ProConfigProvider hashed={false}>
      <div
        className="w-full h-screen"
        style={{ backgroundColor: token.colorBgContainer }}
      >
        <LoginForm
          logo={headerConfig.logo}
          title={headerConfig.title}
          subTitle={headerConfig.subTitle}
          onFinish={onFinish}
          actions={
            <Space>
              {t('login.other')}
              <AlipayCircleOutlined style={iconStyles} />
              <TaobaoCircleOutlined style={iconStyles} />
              <WeiboCircleOutlined style={iconStyles} />
            </Space>
          }
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey)}
          >
            {Object.keys(loginTypeMap).map((key) => (
              <Tabs.TabPane key={key} tab={loginTypeMap[key].title} />
            ))}
          </Tabs>
          {loginType === 'account' && (
            <>
              <ProFormText
                name="account"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={t('login.account_placeholder')}
                rules={[
                  {
                    required: true,
                    message: t('login.account_placeholder'),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                  strengthText: t('login.password_tips'),
                  statusRender: (value) => {
                    const getStatus = () => {
                      if (value && value.length > 12) {
                        return 'ok';
                      }
                      if (value && value.length > 6) {
                        return 'pass';
                      }
                      return 'poor';
                    };
                    const status = getStatus();
                    if (status === 'pass') {
                      return (
                        <div style={{ color: token.colorWarning }}>
                          {t('login.password_middle')}
                        </div>
                      );
                    }
                    if (status === 'ok') {
                      return (
                        <div style={{ color: token.colorSuccess }}>
                          {t('login.password_ok')}
                        </div>
                      );
                    }
                    return (
                      <div style={{ color: token.colorError }}>
                        {t('login.password_weak')}
                      </div>
                    );
                  },
                }}
                placeholder={t('login.password_placeholder')}
                rules={[
                  {
                    required: true,
                    message: t('login.password_placeholder'),
                  },
                ]}
              />
            </>
          )}
          {loginType === 'code' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={'prefixIcon'} />,
                }}
                name="account"
                placeholder={t('login.account_placeholder')}
                rules={[
                  {
                    required: true,
                    message: t('login.account_placeholder'),
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={t('login.code_placeholder')}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${t('login.get_code')}`;
                  }
                  return t('login.get_code');
                }}
                name="code"
                phoneName="account"
                rules={[
                  {
                    required: true,
                    message: t('login.code_placeholder'),
                  },
                ]}
                onGetCaptcha={async (account) => {
                  const res = await getVerifyCode(account);
                  message.open({
                    type: res.code === 0 ? 'success' : 'error',
                    content: res.message,
                  });
                }}
              />
            </>
          )}
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              {t('login.auto_login')}
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              {t('login.forgot')}
            </a>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
}

export default Login;
