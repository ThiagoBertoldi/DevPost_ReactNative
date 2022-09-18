import React, { useState, useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { AuthContext } from '../../contexts/auth';

import { Container, Title, Input, Button, ButtonText, SignUpButton, SignUpButtonText } from './styles'; 

import * as Animatable from 'react-native-animatable';

const TitleAnimated = Animatable.createAnimatableComponent(Title);

export default function SignIn() {

    const [login, setLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');

    const { signUp, signIn, loadingAuth } = useContext(AuthContext);

    async function handleSignIn(){
      if(email === '' || pass === '') {
       return alert('Não pode haver campos em branco!');
      }

      await signIn(email, pass);
    }

    async function handleSignUp(){
      if(email === '' || pass === '' || name === '') {
        return alert('Não pode haver campos em branco!');
       }

       await signUp(email, name, pass);
    }

    function toggleLogin() {
      setLogin( login === true ? false : true );
      setEmail('');
      setName('');
      setPass('');
    }

 return (
    <Container>
      <TitleAnimated
        animation='flipInX'
      >
        Dev
        <Text style={{ color: '#E52246' }}>Post</Text> 
      </TitleAnimated>

      <Input
        placeholder='exemplo@gmail.com'
        value={ email }
        onChangeText={ (value) => setEmail(value) }
      />

      { login !== true && 
        <Input
          placeholder='Thiago Bertoldi'
          value={ name }
          onChangeText={ (value) => setName(value) }
        /> 
      }

      <Input
        placeholder='*********'
        value={ pass }
        onChangeText={ (value) => setPass(value) }
        secureTextEntry={ true }
      />

      <Button onPress={ () => login === true ? handleSignIn() : handleSignUp() }>
        { loadingAuth === true ? 
          ( <ActivityIndicator color='#FFF' /> ) : 
          <ButtonText> { login === true ? 'Acessar' : 'Cadastrar' } 
          </ButtonText> 
        }
      </Button>

      <SignUpButton onPress={ () => toggleLogin() }>
        <SignUpButtonText> { login === true ? 'Não possuo uma conta' : 'Já possuo uma conta'} </SignUpButtonText>
      </SignUpButton>
    </Container>
  );
}