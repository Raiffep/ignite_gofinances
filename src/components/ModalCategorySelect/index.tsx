import React from 'react';
import { FlatList, StatusBar } from 'react-native';
import { categories } from '../../utils/categories';
import Button from '../Form/Button';
import theme from '../../global/styles/themes';

import { 
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from './styles';

interface ICategory {
  key: string;
  name: string;
}

interface Props {
  category: ICategory;
  setCategory: (category: ICategory) => void;
  closeSelectCategory: () => void;
}

const ModalCategorySelect = ({
  category,
  setCategory,
  closeSelectCategory
}: Props) => {

  const handleCategorySelect = (item: ICategory) => {
    setCategory(item);
  }

  return (
    <Container>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content"/>
      <Header>
        <Title>Categoria</Title>
      </Header>
      <FlatList 
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
      />

      <Footer>
        <Button 
          title="Selecionar"
          onPress={closeSelectCategory}
        />
      </Footer>
    </Container>
  );
}

export default ModalCategorySelect;