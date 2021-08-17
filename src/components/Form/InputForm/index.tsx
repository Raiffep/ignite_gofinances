import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';

import Input from '../Input';

import { Container, Error } from './styles';

interface IInputProps extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

const InputForm = ({
  control,
  name,
  error,
  ...rest
}: IInputProps) => {
  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            {...rest}
            value={value}
            onChangeText={onChange}            
          />
        )} />
        {error && <Error>{error}</Error>}
    </Container>
  );
}

export default InputForm;