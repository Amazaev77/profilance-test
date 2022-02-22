import React, {ChangeEvent, FC} from 'react';
import styles from "./Textarea.module.scss";

interface TextareaProps {
  value: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  required?: boolean
}

const Textarea: FC<TextareaProps> = (props) => {
  return <textarea className={styles.textarea} {...props} />
};

export default Textarea;
