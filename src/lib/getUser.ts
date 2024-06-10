"use client";

import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { auth } from "./firebase/clientApp";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
            setUser(authUser);
          } else {
            setUser(null);
          }
    });

    return () => unsubscribe();
  }, []);

  return user;
}

export function currentUser(){
    return auth.currentUser;
}