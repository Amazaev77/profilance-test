import React, {ChangeEvent, FC, FormEvent, useCallback, useEffect, useState} from 'react';
import Input from "../Input";
import styles from './AuthForm.module.scss';
import Button from "../Button";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";

export interface AuthFormProps {
  handleCloseModal?: () => void
}

const AuthForm: FC<AuthFormProps> = ({ handleCloseModal }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeUsername = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }, [])

  const handleChangePassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }, []);

  const errorMessage = useTypedSelector(state => state.auth.hasError)
  const isLoading = useTypedSelector(state => state.auth.isLoading)
  const isAuth = useTypedSelector(state => state.auth.isAuth)

  const { login, setErrorAuth } = useActions()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.trim() && password.trim()) {
      login(username, password)
    } else {
      setErrorAuth('Поля обязательны для заполнения')
    }
  }

  useEffect(() => {
    if (isAuth) {
      handleCloseModal?.();
    }
  }, [isAuth])
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.form__title}>Авторизация</h2>
      <div className={styles.form__input}>
        <div className={styles.form__label}>Имя пользователя</div>
        <Input
          value={username}
          onChange={handleChangeUsername}
          type="text"
          placeholder="Введите ваш логин"
        />
      </div>
      <div className={styles.form__input}>
        <div className={styles.form__label}>Пароль</div>
        <Input
          value={password}
          onChange={handleChangePassword}
          type="password"
          placeholder="Введите ваш пароль"
        />
      </div>
      <div className={styles['form__error-message']}>
        {errorMessage && !isLoading && errorMessage}

      </div>
      <div className={styles.form__button}>
        <Button disabled={isLoading} loading={isLoading} type="submit">
          Войти
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;
