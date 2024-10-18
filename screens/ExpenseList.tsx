import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import randomImage from '../assets/randomImage'
import { color } from 'react-native-tailwindcss'
import EmptyList from '../components/EmptyList'
import { PencilIcon, TrashIcon } from 'react-native-heroicons/outline'
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native'
import { expensesRef } from '../config/firebase'
import { query, where, getDocs, doc, deleteDoc } from 'firebase/firestore'

const ExpenseList = ({ expenses }) => {
    const [expenseList, setExpenseList] = useState(expenses)
    const navigation = useNavigation();
    const deleteExpense = async ({expense}) => {
        const {place, expenseName, expenseCategory, expenseAmount} = expense
        const q = query(expensesRef, where("place", "==", place), where("expenseName", "==", expenseName));
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach(async doc=> {
            if (doc && doc.id) {
                await deleteDoc(doc.ref);
            }
        })
        expenses = expenses.filter(data => data.id != expense.id) 
        setExpenseList(expenses);
    }

    useEffect(() => {
        setExpenseList(expenses)
    }, [expenses])

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Expenses</Text>
      <View style={{ marginTop: 15 }}>
        {
            expenseList?.length>0 ?
            expenseList.map((expense, index) => (
            <React.Fragment key={expense.id}>
              <View style={styles.expenseContainer}>
                <Image source={randomImage()} style={styles.image} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.expenseCategory}>{expense.expenseCategory}</Text>
                  <Text style={{ color: color.gray500 }}>{expense.expenseName}</Text>
                </View>
                <Text style={styles.heading}>${expense.expenseAmount}</Text>
                <TouchableOpacity style={{marginLeft: 5}} onPress={() => 
                console.log('editt')
                }>
                    <PencilIcon size={24} color={color.green500} />
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 5}} onPress={() => 
                    deleteExpense({expense})
                }>
                    <TrashIcon size={24}  color={color.green500}/>
                </TouchableOpacity>
              </View>
              {
                expenseList.length-1!=index&&<View style={{ borderWidth: 0.5, marginTop: 10, borderColor: color.gray500 }}></View>
            }
            </React.Fragment>
          )):
        <EmptyList  message={"You haven't not recorded any trip yet"}/>
        }
      </View>
    </View>
  )
}





const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    expenseContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 15
    },
    expenseCategory: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
    }

})

export default ExpenseList