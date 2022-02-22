import React, {Children, FC, PropsWithChildren, ReactElement, useEffect, useState} from 'react';
import { ButtonProps } from "../Button";


interface ButtonsGroupProps {
  onChange: (id: any) => void,
  value: any
}

const ButtonsGroup: FC<ButtonsGroupProps> = (props) => {
  const { children, onChange, value } = props;

  const [activeId, setActiveId] = useState(value);

  useEffect(() => {
    onChange(activeId)
  }, [activeId])

  return (
    <div>
      {Children.map(children, (child) => {
        const buttonFC = child as ReactElement<PropsWithChildren<ButtonProps>>

        const onClick = () => {
          setActiveId(buttonFC.props.id)
        }

        return React.cloneElement(buttonFC, { onClick });
      })}
    </div>
  );
};

export default ButtonsGroup;
