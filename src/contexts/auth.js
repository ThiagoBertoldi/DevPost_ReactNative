import React, { createContext, useState, useEffect } from "react";

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

export default function AuthProvider({ children }){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [loadingAuth, setLoadingAuth] = useState(false);

    useEffect( () => {
        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem('@devapp');

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
            
        }

        loadStorage();
    }, []);

    async function signUp(email, name, pass){
        setLoadingAuth(true);
        await auth().createUserWithEmailAndPassword(email, pass)
        .then( async (value) => {
            let uid = value.user.uid;
            await firestore().collection('users').doc(uid).set({
                name: name,
                createdAt: new Date(),

            })
            .then(()=> {
                let data = {
                    uid: uid,
                    name: name,
                    email: email,
                };

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
            }).catch((error) => {
                setLoadingAuth(false);
                alert(error.code);
            })

        }).catch((error) => {
            setLoadingAuth(false);
            alert(error.code);
        });
    }

    async function signIn(email, pass){
        setLoadingAuth(true);
        await auth().signInWithEmailAndPassword(email, pass)
        .then( async (value) => {
            let uid = value.user.uid;
            const userProfile = await firestore().collection('users').doc(uid).get();
            
            let data ={
                uid: uid,
                name: userProfile.data().name,
                email: value.user.email
            }
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
        })
        .catch( (error) => {
            setLoadingAuth(false);
            alert(error);
        });
    }

    async function signOut(){
        await auth().signOut();
        await AsyncStorage.clear()
        .then( () => {
            setUser(null);
        });
    }

    async function storageUser(data){
        await AsyncStorage.setItem('@devapp', JSON.stringify(data));
    }

    return(
        <AuthContext.Provider value={{ user, signed: !!user, signUp, signIn, signOut, loadingAuth, loading, setUser, storageUser }}>
            { children }
        </AuthContext.Provider>
    );
}