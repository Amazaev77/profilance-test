import React, { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import './transition.scss';

interface ContainerProps {
  state: boolean;
  timeout: number;
  children: React.ReactNode;
}

const TransitionContainer: FC<ContainerProps> = (props: ContainerProps) => {
  const { state, timeout, children } = props;

  return (
    <CSSTransition
      in={state}
      timeout={timeout}
      unmountOnExit
      classNames="slow-transition"
    >
      {children}
    </CSSTransition>
  );
};

export default TransitionContainer;
