import React, { useContext, useState, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Container, ButtonPost } from './styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import Feather from 'react-native-vector-icons/Feather';

import Header from '../../components/Header';
import Post from '../../components/Post';
import { ListPosts } from './styles';

import { AuthContext } from '../../contexts/auth';
import firestore from '@react-native-firebase/firestore';

export default function Home() {

  const navigation = useNavigation();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [lastItem, setLastItem] = useState('');
  const [emptyList, setEmptyList] = useState(false);

  const { user } = useContext(AuthContext);

  useFocusEffect(
    useCallback( () => {
      let isActive = true;

      function fetchPost(){
        firestore().collection('posts').orderBy('created', 'desc').limit(5).get().then((snapshot) => {
          if(isActive){
            setPosts([]);

            const postList = [];

            snapshot.docs.map( u => {
              postList.push({
                ...u.data(),
                id: u.id
              })
            })

            setEmptyList(!!snapshot.empty);
            setPosts(postList);
            setLastItem(snapshot.docs[snapshot.docs.length - 1]);
            setLoading(false);
          }
        })
      }

      fetchPost();

      return () => {
        isActive = false;
      }

    }, [])
  );

    async function handleRefreshPosts(){
      setLoadingRefresh(true);


      firestore().collection('posts').orderBy('created', 'desc')
      .limit(5).get()
      .then( (snapshot) => {

        setPosts([]);
        const postList = [];

        snapshot.docs.map( value => {
          postList.push({
            ...value.data(),
            id: value.id
          })
        })

        setEmptyList(false);
        setPosts(postList);
        setLastItem(snapshot.docs[snapshot.docs.length - 1]);
        setLoading(false);
      })
      setLoadingRefresh(false);
    }

    async function getListPosts(){
      if(emptyList){
        setLoading(false);
        return null;
      }

      if(loading) return;

      await firestore().collection('posts')
      .orderBy('created','desc')
      .limit(5)
      .startAfter(lastItem)
      .get()
      .then( (snapshot) => {
        const postList = [];

        snapshot.docs.map( u => {
          postList.push({
            ...u.data(),
            id: u.id
          })
        })

        setEmptyList(!!snapshot.empty);
        setLastItem(snapshot.docs[snapshot.docs.length - 1]);
        setPosts(oldPosts => [...oldPosts, ...postList]);
        setLoading(false);
      }).catch( (error) => {
        alert(error);
      })
    }



 return (
   <Container>
    <Header/>

    { loading ? 
    (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={ 50 } color='#E52246' />
      </View>
    ) : (
      <ListPosts
        data={ posts }
        renderItem={ ({ item }) => ( 
          <Post
            data={ item }
            userId={ user?.uid }
          /> 
        )}
        showsVerticalScrollIndicator={ false }
        refreshing={ loadingRefresh }
        onRefresh={ handleRefreshPosts }
        onEndReached={ () => getListPosts() }
        onEndReachedThreshold={ .1 }
      />
    )}
    
    
    
    <ButtonPost
      activeOpacity={ 0.7 }
      onPress={ () => navigation.navigate('NewPost') }
    >
      <Feather
        name='edit-2'
        color='#FFF'
        size={ 25 }
      />
      
    </ButtonPost>
    
   </Container>
  );
}