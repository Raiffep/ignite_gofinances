import React from 'react';

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

interface ICategory {
  name: string;
  icon: string;
}

export interface ITransactionProps {
  type: 'income' | 'outcome';
  title: string;
  amount: string;
  category: ICategory;
  date: string;
}

interface IData {
  data: ITransactionProps
}

const TransactionCard = ({ data }: IData) => {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount type={data.type}>
        {data.type === 'outcome' ? `- ${data.amount}` : data.amount}
      </Amount>
      <Footer>
        <Categorie>
          <CategorieIcon name={data.category.icon} />
          <CategorieName>{data.category.name}</CategorieName>
        </Categorie>
        <TransactionDate>{data.date}</TransactionDate>
      </Footer>
    </Container>
  );
}

export default TransactionCard;