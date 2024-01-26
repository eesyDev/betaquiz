import React, { useState } from 'react';

import illustration from '../img/login_illustration.svg';
import { LoginForm, RegisterForm } from '../components';

const Login = () => {
    const [ form, setForm ] = useState('login');

  return (
    <div className='login'>
        <div className="login__wrapper wrapper">
            { form === 'register' ? 
                <RegisterForm formType={form} setFormType={setForm}/>
            :
                <LoginForm formType={form} setFormType={setForm}/>
            }
            <div className="login__illustration">
                <div className="login__illustration-txt">
                    <h2 className='h2'>Создавайте экзамены легко!</h2>
                    <p>База данных вопросов и искуственный интеллект в вашем распоряжении.</p>  
                </div>
                <img src={illustration}/>
            </div>
        </div>
    </div>
  )
}

export default Login