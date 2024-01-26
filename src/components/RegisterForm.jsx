import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';

import { useVerifyPhoneMutation, useVerifyCodeMutation, useCreateTeacherMutation } from '../services/registerApi';


const RegisterForm = ({ formType, setFormType }) => {
    const [currentStep, setCurrentStep] = useState('input');
    const [userPhone, setUserPhone] = useState('');

    const navigate = useNavigate();

    const [ verifyPhoneResp ] = useVerifyPhoneMutation();
    const [ verifyCodeResp ] = useVerifyCodeMutation();
	const [ createTeacher ] = useCreateTeacherMutation();

    const { register, handleSubmit, setError: setFormError, formState: { errors } } = useForm();

      const onSubmit = async (data) => {
        try {
          if (currentStep === 'input') {
            const response = await verifyPhoneResp({ phone_number: data.phone_number });
            setCurrentStep('confirmation');
            setUserPhone(data.phone_number);
            console.log(response);

          } else if (currentStep === 'confirmation') {
            const response = await verifyCodeResp({ phone_number: userPhone, phone_verification_code: data.confirmation_code });

            if (window.confirm(response.data.status)) {
				setCurrentStep('create');
            }
          } else if (currentStep === 'create') {
			const domain = 'metastudy';
			const phone_number = userPhone;
			const password = data.password;
			const createTeacherResponse = await createTeacher({
				domain, phone_number, password
	        });
			if (createTeacherResponse.data) {
				console.log('Учитель успешно создан:', createTeacherResponse.data);
				setCurrentStep('input');
			  } else {
				console.error('Не удалось создать учителя:', createTeacherResponse.error);
			  }
		  }
        } catch (error) {
			setFormError(error.message || 'An error occurred');
        }
      };
  return (
    <div className="login__form">
        <h1 className="login__form-title title h1">Register</h1>
        <form className="form register-form" onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 'input' && (
            <TextField
            label="Номер телефона"
            error={Boolean(errors.phone_number?.message)}
            helperText={errors.phone_number?.message}
            fullWidth
            className="input"
            {...register('phone_number', { required: 'Put valid phone' })}
            />
        )}
        {currentStep === 'confirmation' && (
            <TextField
            label="Код подтверждения"
            error={Boolean(errors.confirmation_code?.message)}
            helperText={errors.confirmation_code?.message}
            fullWidth
            className="input"
            {...register('confirmation_code', { required: 'Введите код потверждения' })}
            />
        )}
        {currentStep === 'create' && (
          <>
            <TextField
              label="Номер телефона"
              error={Boolean(errors.phone_number?.message)}
              helperText={errors.phone_number?.message}
              fullWidth
              className="input"
			  value={userPhone}
              {...register('phone_number', { required: 'Put valid phone' })}
              />
              <TextField
              label="Код подтверждения"
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              fullWidth
              className="input"
              {...register('password', { required: 'Введите пароль' })}
              />
          </>
            
        )}
        <button className="btn btn--primary" type="submit">
            {formType === 'input' ? 'Create account' : 'Confirm'}
        </button>
        </form>
    </div>
  )
}

export default RegisterForm