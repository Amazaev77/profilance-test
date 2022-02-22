import React, {useEffect} from 'react';
import {useActions} from "./hooks/useActions";
import Header from "./components/Header";
import AppRouter from "./components/AppRouter";
import {IUser} from "./models/IUser";
import styles from './App.module.scss';

function App() {
  const { setUser, setAuth } = useActions();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setUser({ username: localStorage.getItem('username') } as IUser)
      setAuth(true)
    }
  }, [])

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
