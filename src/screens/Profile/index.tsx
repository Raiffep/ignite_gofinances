import React from 'react';
import { View, TextInput, Text, Button } from 'react-native';

const Profile: React.FC = () => {
  return (
    <View>
      <Text testID="text-title">Perfil</Text>
      <TextInput 
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
        value='Raiffe'
      />
      <TextInput 
        testID="input-surname"
        placeholder="Sobrenome"
        autoCorrect={false}
        value='Pontes'
      />
      <Button 
        title="Salvar"
        onPress={() => {}}
      />
    </View>
    );
}

export default Profile;