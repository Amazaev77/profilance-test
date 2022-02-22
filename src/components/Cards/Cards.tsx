import React from 'react';
import Card from "../Card/Card";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import styles from './Cards.module.scss';

const Cards = () => {
  const isAdmin = useTypedSelector(state => state.auth.isAdmin)
  const posts = useTypedSelector(state => state.posts.data.filter(
    post => isAdmin || post.approved
  ))

  const isLoading = useTypedSelector(state => state.posts.isLoading)
  const hasError = useTypedSelector(state => state.posts.hasError)

  if (isLoading) {
    return <div>Загрузка данных...</div>
  }

  if (hasError) {
    return <div>Произошла ошибка при загрузке новостей</div>
  }

  return (
    <div className={styles.cards}>
      {posts.map(post => (
        <div key={post.id} className={styles.cards__card}>
          <Card item={post} />
        </div>
      ))}
    </div>
  )
};

export default Cards;
