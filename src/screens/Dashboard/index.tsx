import React from 'react';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard, { ITransactionProps } from '../../components/TransactionCard';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  UserAvatar,
  UserView,
  UserGretting,
  UserName,
  PowerIcon,
  HighLightCardsList,
  TransactionsList,
  Transactions,
  Title
} from './styles';

export interface IDataListProps extends ITransactionProps {
  id: string;
}

const Dashboard: React.FC = () => {
  const data: IDataListProps[] = [{
    id: Math.floor(Math.random() * 10000).toString(),
    type: 'income',
    title: "Desenvolvimento de site",
    amount: "R$ 12.000,00",
    category: {
      name: "Vendas",
      icon: 'dollar-sign'
    },
    date: "13/04/2020"
  },
  {
    id: Math.floor(Math.random() * 10000).toString(),
    type: 'outcome',
    title: "Hamburgueria Pizzy",
    amount: "R$ 59,00",
    category: {
      name: "Alimentação",
      icon: 'coffee'
    },
    date: "10/04/2020"
  },
  {
    id: Math.floor(Math.random() * 10000).toString(),
    type: 'income',
    title: "Aluguel do apartamento",
    amount: "R$ 1.300,00",
    category: {
      name: "Casa",
      icon: 'shopping-bag'
    },
    date: "08/04/2020"
  }
];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <UserAvatar source={{ 
              uri: 'https://avatars.githubusercontent.com/u/30874251?v=4.png' 
            }} />
            <UserView>
              <UserGretting>Olá, </UserGretting>
              <UserName>Raiffe</UserName>
            </UserView>
          </UserInfo>
          <PowerIcon />
        </UserWrapper>
      </Header>
      <HighLightCardsList>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 a 16 de abril"
        />
      </HighLightCardsList>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TransactionCard data={item} />
          )}
        />
      </Transactions>
    </Container>
  );
}

export default Dashboard;