import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Container, AreaInput, Input, List } from './styles';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import SearchList from '../../components/SearchList';

export default function Search() {

  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {

   if(input === '' || input === undefined){
    setUsers([]);
    return;
   }

   const subscriber = firestore().collection('users').where('name', '>=', input).where('name', '<=', input + "\uf8ff")
   .onSnapshot( (snapshot) => {
    const listUsers = [];


    snapshot.forEach( doc => {
      listUsers.push({
        ...doc.data(),
        id: doc.id,
      })
    });

    setUsers(listUsers);
   });

   return () => subscriber();


  }, [input]);

 return (
   <Container>
    <AreaInput>
      <Feather name='search' size={ 20 } color={ '#E52246' } />
      <Input 
        placeholder='Procurando alguem?'
        value={ input }
        onChangeText={ (value) => setInput(value) }
      />
    </AreaInput>
    <List
      data={ users }
      renderItem={ ({ item }) =>  <SearchList data={ item } />  }
    />
   </Container>
  );
}
