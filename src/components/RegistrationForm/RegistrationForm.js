import './RegistrationForm.css'
import { observer } from 'mobx-react-lite';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useNavigate } from "react-router-dom";
import user from '../../store/user';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { useForm} from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import {useState } from 'react'

const RegistrationForm = observer(() => {
  const { register, handleSubmit, formState: { errors }, } = useForm();

  const initialState = {
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    firstName: '',
    lastName: '',
    gender: '',
    about: '',
    showPassword: false
  }

  const [values, setValues] = useState(initialState)
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false)
  let navigate = useNavigate()


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  function handleClickShowPassword() {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  async function handleRegister() {

    if(phone.length > 10){
      await user.addUser(values.nickname, phone, values.email, values.password, values.firstName, values.lastName, values.gender, values.about)
      await user.getUser()
      navigate(`/account`)
    } else{
      setPhoneError(true)
    }
    

  }


  return (
    <div className="regForm">
      <div className="header">
        <h2 style={{ color: "white" }}>Регистрация</h2>
      </div>

      <FormControl style={{ width: "60%", marginTop: '5px' }}>
        <InputLabel>Имя пользователя</InputLabel>
        <Input
          name="nickname"
          value={values.nickname}

          {...register('nickname', {
            required: 'Обязательное поле',
            pattern: {
              value: /[A-Za-z]$/i,
              message: 'Недопустимое имя пользователя'
            },
          })}
          onChange={handleChange('nickname')}

        />

        <ErrorMessage
          errors={errors}
          name="nickname"
          render={({ message }) => <span style={{ color: 'red', fontSize: '10px' }}>{message}</span>}
        />
      </FormControl>

      <FormControl style={{ width: "60%" }}>
        <InputLabel>Email</InputLabel>
        <Input
          name="email"
          value={values.email}
          {...register('email', {
            required: 'Обязательное поле',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Недопустимая электронная почта"
            },

          })}
          onChange={handleChange('email')}
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <span style={{ color: 'red', fontSize: '10px' }}>{message}</span>}
        />
      </FormControl>

      <FormControl style={{ width: "60%" }}>
        <InputLabel>Пароль</InputLabel>
        <Input
          type={values.showPassword ? 'text' : 'password'}
          name="password"
          value={values.password}
          {...register('password', {
            required: 'Обязательное поле',
            minLength: {
              value: 8,
              message: "Длина пароля не может быть короче 8 символов"
            },
            pattern: {
              value: /(?=.*[A-Z])/,
              message: 'Пароль должен содержать как минимум 1 заглавную букву',
            },
          })}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }

        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <span style={{ color: 'red', fontSize: '10px' }}>{message}</span>}
        />
      </FormControl>

      <FormControl style={{ width: "60%" }}>
        <InputLabel>Подтвердите пароль</InputLabel>
        <Input
          type={values.showPassword ? 'text' : 'password'}
          name="password"
          value={values.confirmPassword}
          {...register('confirmPassword', {
            required: 'Обязательное поле',
            minLength: {
              value: 8,
              message: "Длина пароля не может быть короче 8 символов"
            },
            pattern: {
              value: /(?=.*[A-Z])/,
              message: 'Пароль должен содержать как минимум 1 заглавную букву',
            },
            validate: value => value === values.password || 'Пароль не совпадает c введенным выше'
          })}
          onChange={handleChange('confirmPassword')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <ErrorMessage
          errors={errors}
          name="confirmPassword"
          render={({ message }) => <span style={{ color: 'red', fontSize: '10px' }}>{message}</span>}
        />
      </FormControl>

      <FormControl style={{ width: "60%", marginTop: '20px' }}>

        <PhoneInput
          name="phone"
          specialLabel='Номер телефона'
          country={'ru'}
          value={phone}
          countryCodeEditable={false}
          onChange={phone => {
            setPhone(String(phone))
          }}
        />
        {phoneError? <span style={{ color: 'red', fontSize: '10px' }}>Неправильный номер</span>: null}
      </FormControl>

      <FormControl style={{ width: "60%" }}>
        <InputLabel>Имя</InputLabel>
        <Input
          name="firstName"
          value={values.firstName}
          {...register('firstName', {
            pattern: {
              value: /[A-ZА-Я]+[a-zA-Z]*$/i,
              message: 'Недопустимое имя'
            },
          })}
          onChange={handleChange('firstName')}
        />
        <ErrorMessage
          errors={errors}
          name="firstName"
          render={({ message }) => <span style={{ color: 'red', fontSize: '10px' }}>{message}</span>}
        />
      </FormControl>


      <FormControl style={{ width: "60%" }}>
        <InputLabel>Фамилия</InputLabel>
        <Input
          name="lastName"
          value={values.lastName}
          {...register('lastName', {
            pattern: {
              value: /[A-ZА-Я]+[a-zA-Z]*$/i,
              message: 'Недопустимая фамилия'
            },
          })}
          onChange={handleChange('lastName')}
        />
        <ErrorMessage
          errors={errors}
          name="lastName"
          render={({ message }) => <span style={{ color: 'red', fontSize: '10px' }}>{message}</span>}
        />
      </FormControl>


      <FormControl style={{ width: "60%", marginTop: '10px' }}>
        <FormLabel>Пол</FormLabel>
        <RadioGroup
          name="gender"
          value={values.gender}
          onChange={handleChange('gender')}
          style={{ display: 'flex' }}
        >
          <div style={{ display: "flex" }}>
            <FormControlLabel value="female" control={<Radio />} label="Муж" />
            <FormControlLabel value="male" control={<Radio />} label="Жен" />
          </div>
        </RadioGroup>
      </FormControl>

      <FormControl style={{ width: "60%" }}>
        <TextField
          variant="outlined"
          label="Расскажите о себе"
          name="about"
          value={values.about}
          size="medium"
          multiline={true}
          rows={3}
          {...register('about', {
            minLength: {
              value: 10,
              message: "Слишком маленькое описание (минимум 10 символов)"
            },
          })}
          onChange={handleChange('about')}
        />
        <ErrorMessage
          errors={errors}
          name="about"
          render={({ message }) => <span style={{ color: 'red', fontSize: '10px' }}>{message}</span>}
        />
      </FormControl>


      <FormControl style={{ width: "60%" }}>
        <Button
          variant="contained"
          onClick={handleSubmit(handleRegister)}
          style={{
            height: "60px",
            marginTop: "20px",
            marginBottom: "20px",
            color: "white",
            fontSize: "17px",
            textTransform: "none",
            fontWeight: "bold",
            background: "rgb(1, 150, 135)"
          }}
        >
          Зарегистрироваться
        </Button>
      </FormControl>


    </div>


  )
})

export default RegistrationForm