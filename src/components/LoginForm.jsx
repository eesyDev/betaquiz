import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';

import { useLoginMutation } from '../services/authApi';


const LoginForm = ({ formType, setFormType }) => {

    const navigate = useNavigate();

    const [ login ] = useLoginMutation();
    
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        defaultValues: {
            phone_number: '+77077828088',
            password: 'string'
        },
        mode: 'onChange'
      });

    const onSubmit = async (values) => {
        let phone_number = values.phone_number;
        let password = values.password;

        const userCredentials = {
             phone_number, password
        };

        const response = await login(userCredentials);

        if (response.data.token ) {
            window.localStorage.setItem('token', `Token ${response.data.token}`);

          } else {
            return alert('Login failed')
          }
        navigate('/')
    }
  return (
    <div className="login__form">
        <h1 className="login__form-title title h1">Login</h1>
        <div className="form-wrapper">
            <form className="form login-form" onSubmit={handleSubmit(onSubmit)}>
                <TextField 
                    label='Номер телефона' 
                    error={Boolean(errors.phone_number?.message)} 
                    helperText={errors.phone_number?.message}
                    fullWidth
                    className='input'
                    {...register('phone_number', {required: 'Введите номер в правильном формате'})}
                    />
                <TextField 
                    label='Password' 
                    error={Boolean(errors.password?.message)}  
                    helperText={errors.password?.message}
                    fullWidth
                    className='input'
                    {...register('password', {required: 'Неверный пароль'})}
                    />
                <button className='btn btn--primary' type='submit'>Log in</button>
            </form>
            <span className='text-sm gray'>Еще нет аккаунта? <a href='' onClick={(e) => {e.preventDefault(); setFormType('register')}}>Зарегистрируйтесь</a></span>
        </div>          
    </div>
  )
}

export default LoginForm