import React from 'react';
import { 
  Container,
  Header,
  UserWrapper,
  UserInfo,
  UserAvatar,
  UserView,
  UserGretting,
  UserName
} from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <UserAvatar source={{ uri: 'https://avatars.githubusercontent.com/u/30874251?v=4.png' }}/>
            <UserView>
              <UserGretting>Olá, </UserGretting>
              <UserName>Raiffe</UserName>
            </UserView>
          </UserInfo>
        </UserWrapper>
      </Header>
    </Container>
  );
}

export default Dashboard;