import React, { useState, useLayoutEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, Input, Button, ButtonText } from './styles';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { AuthContext } from '../../contexts/auth';

export default function NewPost() {

  const navigation = useNavigation();

  const [post, setPost] = useState('');

  const { user } = useContext(AuthContext);

  useLayoutEffect( () => {

    const options = navigation.setOptions({
      headerRight: () => (
        <Button onPress={ () => handlePost() }>
          <ButtonText> Compartilhar </ButtonText>
        </Button>
      )
    })

  }, [navigation, post]);

  async function handlePost(){
    if(post === ''){
      return;
    }

    let avatarUrl = null;

    try{

      let response = await storage().ref('users').child(user?.uid).getDownloadURL();
      avatarUrl = response;

    }catch(error){
      avatarUrl = null;
    }

    await firestore().collection('posts').add({
      created: new Date(),
      content: post,
      autor: user.name,
      userId: user?.uid,
      likes: 0,
      avatarUrl
    }).then( () => {
      setPost('');
      navigation.goBack();
      console.log('Post feito!');
    }).catch( (error) => {
      console.log(error);
    });

  }

 return (
   <Container>
    <Input
      placeholder='O que está acontecendo?'
      placeholderTextColor='#DDD'
      value={ post }
      onChangeText={ (value) => setPost(value) }
      autoCorrect={ false }
      multiline= { true }
      maxLength={ 350 }
    />
   </Container>
  );
}