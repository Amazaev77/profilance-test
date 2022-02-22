import React from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import styles from './Home.module.scss';
import {IUser} from "../../models/IUser";

const HomePage = () => {
  const isAuth = useTypedSelector(state => state.auth.isAuth)
  const user = useTypedSelector(state => state.auth.user) as IUser
  return (
    <div>
      <h1 className={styles.title}>Привет, {isAuth ? user.username : 'Гость'}</h1>
    </div>
  );
};

export default HomePage;
