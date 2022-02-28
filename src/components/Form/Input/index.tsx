import React from 'react';
import { TextInputProps } from 'react-native';

import { Container } from './styles';

interface Props extends TextInputProps {
  active?: boolean;
}

const Input = ({
  active = false,
  ...rest
}: Props) => {
  return (
    <Container
      active={active}
      {...rest}
    />
  );
}

export default Input;