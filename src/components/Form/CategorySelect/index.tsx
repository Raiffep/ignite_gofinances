import React from 'react';

import { 
  Container,
  Category,
  Icon
} from './styles';

interface ICategoryProps {
  title: string;
  onPress: () => void;
}

const CategorySelect = ({ title, onPress }: ICategoryProps) => {
  return (
    <Container onPress={() => onPress()}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
}

export default CategorySelect;