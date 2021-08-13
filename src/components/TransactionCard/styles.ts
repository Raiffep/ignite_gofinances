import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

interface ITransactionType {
  type: 'income' | 'outcome'
}

export const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  padding: 19px 23px;
  margin-top: ${RFPercentage(3)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
  line-height: 21px;
`;

export const Amount = styled.Text<ITransactionType>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  color: ${({ theme, type }) => 
    type === 'income' ? theme.colors.success :
    theme.colors.attention
  };
  line-height: 30px;
  margin-top: 2px;
`;

export const Footer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-top: ${RFValue(20)}px;
`;

export const Categorie = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CategorieIcon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: ${RFValue(17)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const CategorieName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 21px;
`;

export const TransactionDate = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 21px;
`;

