import React, { useState } from 'react';
import { Container, Name, Header, Avatar, ContentView, Content, Actions, LikeButton, Like, TimePost } from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import firestore from '@react-native-firebase/firestore';

export default function Post({ data, userId }) {
    const navigation = useNavigation();
    const [likes, setLikes] = useState(data?.likes);

    async function handleLikePost(id, like){
        const docId = `${userId}_${id}`;

        const doc = await firestore().collection('likes').doc(docId).get();

        if(doc.exists){
            await firestore().collection('posts').doc(id).update({
                likes: like - 1
            });

            await firestore().collection('likes').doc(docId)
            .delete()
            .then( () => {
                setLikes(like - 1);
            });

            return;
        }

        await firestore().collection('likes').doc(docId).set({
            postId: id,
            userId: userId
        });

        await firestore().collection('posts').doc(id).update({
            likes: like + 1
        }).then(() => {
            setLikes(like + 1);
        });
    }

    function formatTimePost(){
        const datePost = new Date(data.created.seconds * 1000);

        return formatDistance(
            new Date(),
            datePost,
            {
                locale: ptBR
            }
        );
    }
    
 return (
   <Container>
    <Header onPress={ () => navigation.navigate('PostsUser', { title: data.autor, userId: data.userId }) }>
        { data.avatarUrl ? ( 
            <Avatar source={{ uri: data.avatarUrl }} />
        ) : (
            <Avatar 
                source={require('../../assets/avatar.png')}
            />
        )}
        <Name numberOfLines={ 1 }> { data?.autor } </Name>
    </Header>

    <ContentView>
        <Content> { data.content } </Content>
    </ContentView>

    <Actions>
        <LikeButton onPress={ () => handleLikePost(data.id, likes) }>
            <Like>
                { likes === 0 ? '' : likes}
            </Like>
            <MaterialCommunityIcons
                name={ likes == 0 ? 'heart-plus-outline' : 'cards-heart' }
                size={ 20 }
                color='#E52246'
            />
        </LikeButton>
        <TimePost>
            { formatTimePost() }
        </TimePost>
    </Actions>
   </Container>
  );
}