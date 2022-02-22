import React, {FC} from 'react';
import styles from './Button.module.scss';
import spinner from '../../assets/spinner.svg';

export interface ButtonProps {
  type?: 'button' | 'reset' | 'submit',
  children: React.ReactNode,
  disabled?: boolean,
  loading?: boolean,
  onClick?: () => void,
  id?: string | number
  cursor?: string
}

const Button: FC<ButtonProps> = (props) => {
  return (
    <button
      disabled={props.disabled}
      className={styles.button}
      type={props.type}
      onClick={props.onClick}
      style={{ cursor: props.cursor }}
    >
      <span>{props.children}</span>
      {props.loading && (
        <span className={styles.button__spinner}>
          <img
            src={spinner}
            alt="spinner"
          />
        </span>
      )}
    </button>
  );
};

export default Button;
