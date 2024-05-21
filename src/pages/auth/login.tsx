'use client'
 
import { PureComponent, useState } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { IUIConfig, ILogin } from 'src/interfaces';
import { login } from '@redux/auth/authSlice';
import { updateUserSuccess } from '@redux/user/userSlice';
import { LoginTranslations } from 'src/pages-translations/login-translations';
import Head from 'next/head';
import { Col, Form, Row, Input, Checkbox, Button } from 'antd';
import { NextPageContext } from 'next';
import { CiMail, CiLock } from 'react-icons/ci';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { redirect } from 'next/navigation'


interface IProps {
  loginAuth: any;
  //login: Function;
  ui: IUIConfig;
  locale: any;
}

Login.getInitialProps = async (ctx: NextPageContext) => {
    return { 
      locale: ctx.locale,
      
    }
}

export default function Login(props:IProps) {
  const current = useSelector((state:any) => state.user.current)
  const dispatch = useDispatch();

  if (typeof window !== 'undefined') {
    const router = useRouter();
    if (current._id != null){
      console.log('Current ', current);
      if (!current.isPerformer) router.push('/');
      if (current.isPerformer) router.push(`/model/${current.username}`);
    }

    // Puedes usar `router` aquí para realizar acciones como redirecciones, etc.
    console.log('Estamos en el cliente, la ruta actual es:', router.pathname);
  }

  function handleLogin(values: any) {
    //handleLogin(values);
    dispatch(login(values));
  }

  const [inputLogin, setInputLogin] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const { ui, loginAuth, locale } = props;
  const translations = locale === '' ? LoginTranslations['en-US'] : LoginTranslations['es-ES'];  
  return(
      <div className="container">
        <Head>
          <title>
              MyAdultFan
              {' '}
              | Login
          </title>
        </Head>
        <div className="main-container">
          <div className="login-box">
              <Row className="row-login">

                  <Col
                  className="col-login"
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  offset={6}
                  >
                    <div className="login-content right">
                      <div className="login-form">
                        <div className="login-title">{translations.signIn}</div>  
                        <picture>
                        <img src="/img/logo-login.jpg" alt="logo" width="100%" />
                        </picture>
                        <div className="second-title">{translations.by}</div>
                        <Form
                          name="normal_login"
                          className="login-form"
                          initialValues={{ remember: true }}
                          onFinish={handleLogin}
                          >
                          <Form.Item
                              name="email"
                              validateTrigger={['onChange', 'onBlur']}
                          >
                              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <CiMail style={{ height: 23, width: 23, color: 'rgb(126,126,126)' }} />
                              <Input
                                  style={{
                                  borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: 0, marginLeft: 8
                                  }}
                              />
                              </div>
                          </Form.Item>  
                          <Form.Item
                              style={{ margin: 0 }}
                              name="password"
                              validateTrigger={['onChange', 'onBlur']}
                          >
                              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <CiLock style={{ height: 25, width: 25, color: 'rgb(126,126,126)' }} />
                              <Input
                                  type="password"
                                  style={{
                                  borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: 0, marginLeft: 8
                                  }}
                              />
                              </div>
                          </Form.Item>
                          <Form.Item>
                              <Row>
                              <Col span={24}>
                                  <Form.Item name="remember" valuePropName="checked" noStyle>
                                  <Checkbox></Checkbox>
                                  </Form.Item>
                              </Col>
                              </Row>
                          </Form.Item>
                          <Form.Item style={{ textAlign: 'center' }}>
                              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                              <Button type="primary" htmlType="submit" className="login-form-button">
                                  Sign in
                              </Button>
                              </div>
                              <Link
                              legacyBehavior
                              href={{
                                  pathname: '/auth/forgot-password'
                              }}
                              >
                              <a className="login-form-forgot">forgot</a>
                              </Link>

                              <div style={{ marginTop: 12, marginBottom: 12 }}>
                              <Link
                                  legacyBehavior
                                  href="/auth/register"
                              >
                                  <Button style={{
                                  width: '75%', height: 40, border: '2px solid #00ecf0', borderRadius: 25, color: 'rgb(126,126,126)', fontWeight: 'bold'
                                  }}
                                  >
                                  Register
                                  </Button>
                              </Link>
                              </div>

                              <p>
                              
                              <Link
                                  legacyBehavior
                                  href="/auth/register"
                              >
                                  <a>Here</a>
                              </Link>
                              </p>
                              <p>
                              Verificar
                              ,
                              <Link legacyBehavior href="/auth/resend-verification-email">
                                  <a>Reenviar</a>
                              </Link>
                              </p>
                          </Form.Item>    
                          </Form>
                      </div>    
                    </div>  
                  </Col>    
              </Row>
          </div>       
        </div>
      </div>
  )
}


