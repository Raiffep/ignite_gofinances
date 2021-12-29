import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard, { ITransactionProps } from '../../components/TransactionCard';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  UserAvatar,
  UserView,
  UserGretting,
  UserName,
  LogoutButton,
  PowerIcon,
  HighLightCardsList,
  TransactionsList,
  Transactions,
  Title,
  LoadContainer,
} from './styles';

export interface IDataListProps extends ITransactionProps {
  id: string;
}

interface IHighlightProps {
  amount: string;
  lastTransaction: string;
}
interface IHighlightData {
  entries: IHighlightProps;
  expensives: IHighlightProps;
  total: IHighlightProps
}

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IDataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<IHighlightData>({} as IHighlightData);

  const theme = useTheme();
  const { signOut, user } = useAuth();

  const getLastTransactionDate = (
    transactions: IDataListProps[],
    type: 'income' | 'outcome'
  ) => {
    let lastTransaction = null;
    let dateString = '';

    const filteredTransactions = transactions
      .filter(transaction => transaction.type === type);

    if (filteredTransactions.length === 0) {
      lastTransaction = 0;
    } else {
      lastTransaction = new Date(Math.max.apply(Math, filteredTransactions
        .map(transaction => new Date(transaction.date).getTime())
      ));

      dateString = `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {
        month: 'long'
      })}`;
    }

    return { lastTransaction, dateString };
  };

  const loadTransactions = async () => {
    const dataKey = `@Gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const formattedTransactions: IDataListProps[] = transactions
      .map((transaction: IDataListProps) => {
        if (transaction.type === 'income') {
          entriesTotal += Number(transaction.amount);
        } else {
          expensiveTotal += Number(transaction.amount);
        }

        const amount = Number(transaction.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(transaction.date));

        return {
          id: transaction.id,
          name: transaction.name,
          amount,
          type: transaction.type,
          category: transaction.category,
          date
        }
      });

    setData(formattedTransactions);

    const lastEntries = getLastTransactionDate(transactions, 'income');
    const lastExpensives = getLastTransactionDate(transactions, 'outcome');
    const totalInterval = lastEntries.lastTransaction === 0
      && lastExpensives.lastTransaction === 0
      ? 'Não há transações'
      : `01 a ${lastEntries.lastTransaction > lastExpensives.lastTransaction
        ? lastEntries.dateString
        : lastExpensives.dateString
      }`;

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastEntries.lastTransaction === 0
          ? 'Não há transações'
          : `Última entrada dia ${lastEntries.dateString}`
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastExpensives.lastTransaction === 0
          ? 'Não há transações'
          : `Última saída dia ${lastExpensives.dateString}`
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []))

  return (
    <Container>
      {isLoading ?
        <LoadContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoadContainer>
        :
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <UserAvatar source={{ uri: user.photo }} />
                <UserView>
                  <UserGretting>Olá, </UserGretting>
                  <UserName>{user.name}</UserName>
                </UserView>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <PowerIcon />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighLightCardsList>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData.expensives.amount}
              lastTransaction={highlightData.expensives.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
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
        </>
      }
    </Container>
  );
}

export default Dashboard;