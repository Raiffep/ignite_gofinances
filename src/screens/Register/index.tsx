import React, { useState } from 'react';
import { Modal } from 'react-native';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import TransactionTypeButton from '../../components/Form/TransactionTypeButton';
import CategorySelect from '../../components/Form/CategorySelect';
import ModalCategorySelect from '../../components/ModalCategorySelect';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes
} from './styles';

const Register: React.FC = () => {
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const handleTransactionTypeSelect = (type: 'up' | 'down') => {
    setTransactionType(type);
  }

  const handleOpenSelectCategoryModal = () => {
    setCategoryModalVisible(true);
  }


  const handleCloseSelectCategoryModal = () => {
    setCategoryModalVisible(false);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input
            placeholder="Nome"
          />
          <Input
            placeholder="Preço"
          />
          <TransactionsTypes>
            <TransactionTypeButton              
              type="up"
              title="Income"
              isActive={transactionType === 'up'}
              onPress={() => handleTransactionTypeSelect('up')}
            />
            <TransactionTypeButton              
              type="down"
              title="Outcome"
              isActive={transactionType === 'down'}
              onPress={() => handleTransactionTypeSelect('down')}
            />
          </TransactionsTypes>

          <CategorySelect 
            title="Categoria"
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>

        <Button title="Enviar" />
      </Form>

      <Modal visible={categoryModalVisible}>
        <ModalCategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}

export default Register;