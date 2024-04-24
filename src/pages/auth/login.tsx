import { PureComponent, useState } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { IUIConfig, ILogin } from 'src/interfaces';
import { login } from '@redux/auth/authSlice';
import { LoginTranslations } from 'src/pages-translations/login-translations';
import Head from 'next/head';
import { Col, Form, Row } from 'antd';
import { NextPageContext } from 'next';

Login.getInitialProps = async (ctx: NextPageContext) => {
    return { locale: ctx.locale }
}

export default function Login({locale}:{locale: any}) {
    const authentication = useSelector((state:any) => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        const person:ILogin = { email: "aussonia@gmail.com", password: "1234loly" };
        dispatch(login(person));
      }, [dispatch]);

      console.log('!!!!!! ', authentication);

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
                            
                            >
                                
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


