import moment from 'moment';
import React, {FC} from 'react';
import styles from './Card.module.scss';
import {IPost} from "../../models/IPost";
import 'moment/locale/ru';
import Button from "../Button";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import checkIcon from "../../assets/check.svg";
import {useActions} from "../../hooks/useActions";

moment.locale('ru');

interface CardProps {
  item: IPost
}

const Card: FC<CardProps> = ({ item }) => {
  const isAdmin = useTypedSelector(state => state.auth.isAdmin)

  const { approvePost, removePost } = useActions();

  const handleApprovePost = () => {
    approvePost(item.id)
  }
  const handleRemovePost = () => {
    removePost(item.id)
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.card__title}>
        {item.name}
      </h2>
      <div className={styles.card__content}>
        {item.text}
      </div>
      {isAdmin && !item.approved && (
        <div className={styles.card__button}>
          <Button onClick={handleApprovePost}>
            Одобрить
          </Button>
        </div>
      )}
      {isAdmin && item.approved && (
        <div className={styles.card__approved}>
          <span>Одобрено</span>
          <img src={checkIcon} alt="check" />
        </div>
      )}
      {isAdmin && (
        <div onClick={handleRemovePost} className={styles.card__delete}>
          Удалить
        </div>
      )}
      <time className={styles.card__date}>
        {moment(item.date).format('LT, LL')}
      </time>
    </div>
  );
};

export default Card;
