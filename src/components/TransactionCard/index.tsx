import React from 'react';
import { categories } from '../../utils/categories';

import {
  Container,
  Title,
  Amount,
  Footer,
  Categorie,
  CategorieIcon,
  CategorieName,
  TransactionDate
} from './styles';

export interface ITransactionProps {
  type: 'income' | 'outcome';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface IData {
  data: ITransactionProps
}

const TransactionCard = ({ data }: IData) => {
  const [category] = categories.filter(
    item => item.key === data.category
  );

  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type === 'outcome' ? `- ${data.amount}` : data.amount}
      </Amount>
      <Footer>
        <Categorie>
          <CategorieIcon name={category.icon} />
          <CategorieName>{category.name}</CategorieName>
        </Categorie>
        <TransactionDate>{data.date}</TransactionDate>
      </Footer>
    </Container>
  );
}

export default TransactionCard;