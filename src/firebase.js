// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

import { ref, onUnmounted } from 'vue'

import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyArlnqyd8lEMP3ry3Xj3M3sgStJ0zFv7kk",
  authDomain: "expensetracker-29492.firebaseapp.com",
  projectId: "expensetracker-29492",
  storageBucket: "expensetracker-29492.appspot.com",
  messagingSenderId: "919309060876",
  appId: "1:919309060876:web:d6c9347b2712859a965729",
  measurementId: "G-GK8RRNT7MG"
}) ;

const db = firebaseApp.firestore()
const expensesCollection = db.collection('expenses')


export  const createExpense  = item => {
  return expensesCollection.add(item)
}

export const getExpense = async id => {
  const item = await expensesCollection.doc(id).get()
  return item.exists ? item.data() : null
} 

export const updateExpense = (id, item) => {
  return expensesCollection.doc(id).update(item)
} 


export const deleteExpense = id => {
  return expensesCollection.doc(id).delete()
}


export const useLoadExpenses = () => {
  const items = ref([])

  const close = expensesCollection.onSnapshot(snapshot => {
    items.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  });

  onUnmounted(close)
  return items
}


