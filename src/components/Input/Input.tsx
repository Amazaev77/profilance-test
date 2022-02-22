import React, {ChangeEvent, FC} from 'react';
import styles from './Input.module.scss';

interface InputProps {
  type?: 'text' | 'password'
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
}

const Input: FC<InputProps> = (props) => {
  return <input className={styles.input} {...props} />
};

export default Input;
