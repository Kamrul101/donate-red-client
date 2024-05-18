import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../Firebase/firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app);


const AuthProviders = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();
    

    const createUser = (email,password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const signInUser = (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password);
    }
    const signInWithGoogle = () =>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider);
    }
    const updateUserProfile = (name, photo) =>{
        
        return updateProfile(auth.currentUser,{
             displayName: name, photoURL:photo
         })
     }
    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,loggedUser=>{
             console.log("logged User",loggedUser);
             setUser(loggedUser);
             setLoading(false);
         })
         return()=>{
             unSubscribe();
         }
     },[])



    const authInfo ={
        user,
        loading,
        createUser,
        signInUser,
        logOut,
        signInWithGoogle,
        updateUserProfile,
        
        
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;