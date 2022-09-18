import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Modal, Platform } from 'react-native';

import { AuthContext } from '../../contexts/auth';

import { Container, 
  ProfileImage, 
  Name, 
  Email, 
  Button,
  ButtonText,
  UploadButton, 
  UploadText,
  Input,
  ModalContainer,
  ButtonBack
} from './styles';

import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import Feather from 'react-native-vector-icons/Feather';

import Header from '../../components/Header';

export default function Profile() {

  const { user, signOut, setUser, storageUser } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [nome, setNome] = useState(user?.name);
  const [url, setUrl] = useState(null);

  useEffect( () => {

    let isActive = true;

    async function loadAvatar(){
      try {
        if(isActive){
          let response = await storage().ref('users').child(user?.uid).getDownloadURL();
          setUrl(response);
        }
      } catch (error) {
        
      }
    }

    loadAvatar();

    return () => isActive = false;

  }, []);

  async function updateProfile(){
    if(nome === '' || nome === null){
      return;
    }

    await firestore().collection('users').doc(user?.uid).update({
      name: nome,
    });

    const postDocs = await firestore().collection('posts').where('userId', '==', user?.uid).get();

    postDocs.forEach( async doc => {
      await firestore().collection('posts').doc(doc.id).update({
        autor: nome,
      });
    });

    let data = {
      uid: user.uid,
      name: nome,
      email: user.email,
    }

    setUser(data);
    storageUser(data);

    setModal(false);
  }

  const uploadFile = () => {
    const options = {
      noData: true,
      mediaType: 'photo'
    }

    launchImageLibrary(options, response => {
      if(response.didCancel){
        return;
      }else if(response.error){
        alert(response.error);
      }else{
        uploadFileFirebase(response)
        .then( () => {
          uploadAvatarPosts();
        });

        setUrl(response.assets[0].uri);
      }
    });

  }

  const getFileLocalPath = (response) => {
    return response.assets[0].uri;
  }

  const uploadFileFirebase = async (response) => {
    const fileSource = getFileLocalPath(response);

    const storageRef = storage().ref('users').child(user?.uid);

    return await storageRef.putFile(fileSource);
  }

  const uploadAvatarPosts = async () => {
    const storageRef = storage().ref('users').child(user?.uid);
    const url = await storageRef.getDownloadURL()
    .then( async (image) => {
      const postDocs = await firestore().collection('posts').where('userId', '==', user.uid).get();

      postDocs.forEach( async doc => {
        await firestore().collection('posts').doc(doc.id).update({
            avatarUrl: image
        });
      });

    }).catch( (error) => {
      alert(error.code);
    })
  }

 return (
   <Container>
    <Header/>
    {
      url ? (
        <UploadButton onPress={ () => uploadFile() }>
          <UploadText> + </UploadText>
          <ProfileImage source={{ uri: url }} />
        </UploadButton>
      ) : (
        <UploadButton onPress={ () => uploadFile() }>
          <UploadText> + </UploadText>
        </UploadButton>
      )
      }
    
      <Name>
        { user?.name }        
      </Name>
      <Email>
        { user?.email }
      </Email>
      <Button bg='#418CFD' onPress={ () => setModal(true) }>
        <ButtonText color='#f1f1f1'> Atualizar Perfil </ButtonText>
      </Button>
      <Button bg='#f1f1f1' onPress={ () => signOut() }>
        <ButtonText color='#353840'> Sair </ButtonText>
      </Button>

      <Modal visible={modal} animationType="slide" transparent={true}>
        <ModalContainer behavior={ Platform.OS === 'android' ? '' : 'padding' }>
          <ButtonBack onPress={ () => setModal(false) }>
            <Feather
              name="arrow-left"
              size={22}
              color="#121212"
              style={{ marginRight: 5 }}
            />
             <ButtonText color="#121212">Voltar</ButtonText>
          </ButtonBack>

          <Input 
            placeholder={user?.nome}
            value={nome}
            onChangeText={ (value) => setNome(value) }
          />

          <Button bg="#428cfd" onPress={ () => updateProfile() }>
            <ButtonText color="#FFF">Salvar</ButtonText>
          </Button>
        </ModalContainer>

      </Modal>
   </Container>
  );
}