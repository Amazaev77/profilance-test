import React, {memo, useState} from 'react';
import styles from './Header.module.scss';
import {Link, NavLink} from "react-router-dom";
import logo from '../../assets/logo.svg';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import Modal from "../Modal";
import AuthForm from "../AuthForm";

const Header = () => {
  const [modal, setModal] = useState(false)
  const { logout } = useActions();

  const isAuth = useTypedSelector(state => state.auth.isAuth);

  const handleCloseModal = () => {
    setModal(false)
  }

  const handleLogin = () => {
    setModal(true)
  }
  const handleLogout = () => {
    logout()
  }

  return (
    <header className={styles['header']}>
      <div className={styles['header__logo']}>
        <Link to="/">
          <img src={logo} alt="logo"/>
        </Link>
      </div>
      <div className={styles['header__menu']}>
        <ul className={styles['menu-list']}>
          <li className={styles['menu-list__item']}>
            <NavLink
              activeClassName={styles['menu-list__link_active']}
              className={styles['menu-list__link']}
              exact
              to='/news'
            >
              Новости
            </NavLink>
            <NavLink
              activeClassName={styles['menu-list__link_active']}
              className={styles['menu-list__link']}
              to='/test-link'
            >
              Тест
            </NavLink>
          </li>
        </ul>
      </div>
      {isAuth ? (
        <div className={styles['header__logout']}>
          <span onClick={handleLogout}>
            Выход
          </span>
        </div>
      ) : (
        <div className={styles['header__login']}>
          <span onClick={handleLogin}>
            Вход
          </span>
        </div>
      )}
      <Modal timeout={200} isVisible={modal} backgroundClick={handleCloseModal}>
        <AuthForm />
      </Modal>
    </header>
  );
};

export default memo(Header);
