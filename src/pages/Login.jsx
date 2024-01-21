import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import illustration from '../img/login_illustration.svg';

const Login = () => {
    const [ form, setForm ] = useState('register');
    const navigate = useNavigate();
    const {register, handleSubmit, setError, formState: {errors}} = useForm({
        defaultValues: {
          name: '',
          email: 'test@mail.ru',
          password: '1234567'
        },
        mode: 'onChange'
      });

      const { register: register2, handleSubmit: handleSubmit2, setError: setError2, formState: { errors: errors2 } } = useForm({
        defaultValues: {
            login: 'test@mail.ru',
            password: '1234567'
        },
        mode: 'onChange'
      });

    const onSubmit = (values) => {
        let name = values.name;
        let email = values.email;
        let password = values.password;

        const userCredentials = {
            name, email, password
        }

        console.log(userCredentials);
        navigate('/')

    }

    const onSubmit2 = (values) => {
        let login = values.login;
        let password = values.password;

        const userCredentials = {
             login, password
        }

        console.log(userCredentials);
        navigate('/')

    }

  return (
    <div className='login'>
        <div className="login__wrapper wrapper">
            { form === 'register' ? 
            <div className="login__form">
                <h1 className="login__form-title title h1">Register</h1>
                <div className="form-wrapper">
                    <span className='text-sm'>Let’s get started with your 30 days trial</span>
                    <form className="form register-form" onSubmit={handleSubmit(onSubmit)}>
                        <TextField 
                            label='Name' 
                            helperText='error'
                            fullWidth
                            className='input'
                            {...register('name')}
                            />
                        <TextField 
                            label='Email' 
                            error={Boolean(errors.email?.message)} 
                            helperText={errors.email?.message}
                            fullWidth
                            className='input'
                            {...register('email', {required: 'Put valid email'})}
                            />
                        <TextField 
                            label='Password' 
                            error={Boolean(errors.password?.message)}  
                            helperText={errors.password?.message}
                            fullWidth
                            className='input'
                            {...register('password', {required: 'Put correct password'})}
                            />
                        <button className='btn btn--primary' type='submit'>Create account</button>
                    </form>
                    <span className='text-sm gray'>Already have an account? <a href='' onClick={(e) => {e.preventDefault(); setForm('login')}}>Log in</a></span>
                </div>
            </div>
            :
            <div className="login__form">
                <h1 className="login__form-title title h1">Login</h1>
                <div className="form-wrapper">
                    <form className="form login-form" onSubmit={handleSubmit2(onSubmit2)}>
                        <TextField 
                            label='Email' 
                            error={Boolean(errors2.login?.message)} 
                            helperText={errors2.login?.message}
                            fullWidth
                            className='input'
                            {...register2('login', {required: 'Put valid login'})}
                            />
                        <TextField 
                            label='Password' 
                            error={Boolean(errors2.password?.message)}  
                            helperText={errors2.password?.message}
                            fullWidth
                            className='input'
                            {...register2('password', {required: 'Put correct password'})}
                            />
                        <button className='btn btn--primary' type='submit'>Log in</button>
                    </form>
                    <span className='text-sm gray'>Don't have an account yet? <a href='' onClick={(e) => {e.preventDefault(); setForm('register')}}>Sign up</a></span>
                </div>          
            </div>
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