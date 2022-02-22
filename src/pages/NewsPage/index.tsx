import React, {useEffect, useState} from 'react';
import Cards from "../../components/Cards";
import {useActions} from "../../hooks/useActions";
import Search from "../../components/Search";
import styles from './NewsPage.module.scss';
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import AddPostForm from "../../components/AddPostForm";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const NewsPage = () => {
  const { getPosts } = useActions();
  const [modal, setModal] = useState(false);

  const handleCloseModal = () => setModal(false)
  const handleOpenModal = () => setModal(true)

  const isAuth = useTypedSelector(state => state.auth.isAuth)

  useEffect(() => {
    getPosts();
  }, [])

  return (
    <div className={styles.wrap}>
      <Modal
        isVisible={modal}
        backgroundClick={handleCloseModal}
        timeout={200}
      >
        <AddPostForm />
      </Modal>
      {isAuth && (
        <div className={styles.wrap__button}>
          <Button onClick={handleOpenModal}>
            Добавить
          </Button>
        </div>
        )}
      <div className={styles.wrap__search}>
        <Search />
      </div>
      <Cards />
    </div>
  );
};

export default NewsPage;
