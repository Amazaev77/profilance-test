import React, {ChangeEvent, FC, FormEvent, useCallback, useState} from 'react';
import Input from "../Input";
import Textarea from "../Textarea";
import styles from './AddPostForm.module.scss';
import Button from "../Button";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface FormProps {
  handleCloseModal?: () => void
}

const AddPostForm: FC<FormProps> = ({ handleCloseModal }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }, [])

  const handleChangeText = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }, [])

  const errorMessage = useTypedSelector(state => state.posts.hasAddPostError)
  const isAdding = useTypedSelector(state => state.posts.isAdding)

  const { addPost, setAddPostError } = useActions();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() && text.trim()) {
      addPost(name, text);
      handleCloseModal?.();
    } else {
      setAddPostError('Поля обязательны для заполнения')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.form__title}>Добавление поста</h2>
      <div className={styles.form__input}>
        <Input
          placeholder="Заголовок поста"
          onChange={handleChangeName}
          value={name}
        />
      </div>
      <Textarea
        value={text}
        onChange={handleChangeText}
        placeholder="Контент новостей"
      />
      <div className={styles['form__error-message']}>
        {errorMessage && !isAdding && errorMessage}
      </div>
      <div className={styles.form__button}>
        <Button>
          Добавить
        </Button>
      </div>
    </form>
  );
};

export default AddPostForm;
