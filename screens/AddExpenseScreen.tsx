// import { Picker } from "@react-native-picker/picker";
// import { Button, Text, TextInput, View } from "react-native";
// import styles from "../theme/styles";

// // Define the Addform component which is used to add new expenses
// export default function Addform({
//     name,
//     setName,
//     amount,
//     setAmount,
//     category,
//     setCategory,
//     categories,
//     setExpenses,
//     expenses,
//     chartData,
//     setChartData,
//     setAddForm,
// }) {
//     return (
//         <View>
//             <Text style={styles.heading3}>Add Form</Text>

//             {/* Input field for expense name */}
//             <Text style={styles.label}>Expense Name</Text>
//             <TextInput
//                 onChangeText={(value) => setName(value)}
//                 value={name}
//                 style={styles.textInput}
//                 placeholder="Enter the expense name"
//             />

//             {/* Input field for expense amount */}
//             <Text style={styles.label}>Amount</Text>
//             <TextInput
//                 keyboardType="numeric"
//                 onChangeText={(value) => {
//                     // Ensure only numeric values are entered for the amount
//                     value = value.replace(/[^0-9]/g, "");
//                     setAmount(value);
//                 }}
//                 value={amount}
//                 style={styles.textInput}
//                 placeholder="Amount"
//             />

//             {/* Dropdown to select expense category */}
//             <Text style={styles.label}>Category</Text>
//             <Picker
//                 style={styles.textInput}
//                 selectedValue={category}
//                 onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
//             >
//                 {categories.map((category, index) => {
//                     return (
//                         <Picker.Item
//                             key={index}
//                             label={category}
//                             value={category}
//                         />
//                     );
//                 })}
//             </Picker>

//             {/* Buttons to add or cancel expense */}
//             <View style={styles.row}>
//                 {/* Add Expense button */}
//                 <Button
//                     onPress={() => {
//                         let amountNumber = parseInt(amount);
//                         if (amountNumber <= 0 || name == "") {
//                             // Validation: Ensure valid amount 
//                             // and name are entered
//                             alert("Please enter a valid amount and name");
//                             return;
//                         }

//                         // Add the new expense to the list of expenses
//                         setExpenses([
//                             ...expenses,
//                             {
//                                 id: new Date().getTime(),
//                                 category,
//                                 name,
//                                 amount: amountNumber,
//                             },
//                         ]);

//                         // Update the chart data to reflect the new expense
//                         let newChartData = [...chartData];
//                         let index = newChartData.findIndex(
//                             (item) => item.name == category
//                         );
//                         newChartData[index].amount += amountNumber;
//                         setChartData(newChartData);

//                         // Reset form fields and close the form
//                         setAddForm(false);
//                         setName("");
//                         setAmount("");
//                         setCategory("Food");
//                     }}
//                     title="Add Expense"
//                 />

//                 {/* Cancel button to close the form
//                     without adding an expense */}
//                 <Button
//                     onPress={() => {
//                         setAddForm(false);
//                     }}
//                     title="Cancel"
//                 />
//             </View>
//         </View>
//     );
// }



import React, { useState } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../theme'
import BackButton from '../components/BackButton'
import { color } from 'react-native-tailwindcss'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
import Snackbar from 'react-native-snackbar'
import { useSelector } from 'react-redux'
import { addDoc, doc, documentId } from 'firebase/firestore'
import { expensesRef, tripsRef } from '../config/firebase'
import { Picker } from '@react-native-picker/picker';

const category = ["Food", "Shopping", "Bills", "Others"];



function AddExpenseScreen({route}) {
    const {place} = route.params;
  const [expense, setExpense] = useState('');
  const [selectedCategory, setSelectedCategory] = useState();
  const [amount, setAmount] = useState('');
  

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {user} = useSelector(state=> state.user);

  const handleAddTrip = async () => {
    if (expense && selectedCategory && amount) {
      // navigation.navigate('Home');
      setLoading(true);
      let doc = await addDoc(expensesRef, {
        expenseName: expense,
        expenseAmount: amount,
        userId: user.uid,
        expenseCategory: selectedCategory,
        place: place
      });
      setLoading(false);
      if (doc && doc.id) {
        navigation.goBack();
      }
    } else {
      Snackbar.show({
        text: 'Category, Expense and Amount are required',
        backgroundColor: 'red'
      });
    }
  }

  return (
    <ScreenWrapper>
      <View className='flex justify-between h-full mx-4'>
        <View>
        <View className='relative mt-5'>
          <View className='absolute top-0 left-0 z-10'>
            <BackButton />
          </View>
          <Text className={`${colors.heading} text-xl font-bold text-center`}>Add Expense</Text>
          </View>
          <View className='flex-row justify-center my-3 mt-5'>
          {/* <Image className='h-72 w-72' source={require('../assets/4.png')} /> */}
        </View>
        <View className='space-y-2 mx-2'>
          <Text className={`${colors.heading} text-xl font-bold`}>
            Choose a category
          </Text>
          {/* <TextInput value={selectedCategory} onChangeText={value => setSelectedCategory(value)} className='p-4 bg-white rounded-full mb-3'></TextInput> */}
          <Picker
        selectedValue={selectedCategory}
        className='h-50 w-200'
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
      >
        {category.map((item, index) => (
          <Picker.Item label={item} value={item} key={index} />
        ))}
      </Picker>
          <Text className={`${colors.heading} text-xl font-bold`}>For what?</Text>
          <TextInput value={expense} onChangeText={value => setExpense(value)} className='p-4 bg-white rounded-full mb-3'></TextInput>
          <Text className={`${colors.heading} text-xl font-bold`}>How much?</Text>
          <TextInput value={amount} onChangeText={value => setAmount(value)} className='p-4 bg-white rounded-full mb-3'></TextInput>


        </View>
      </View>
      <View>
        {
          loading ?
          (<Loading /> ):
          (
            <TouchableOpacity onPress={handleAddTrip} style={{backgroundColor: color.green500}} className='my-6 rounded-full p-3 shadow-sm mx-2'>
          <Text className='text-center text-white text-lg font-bold '>Add Expense</Text>
        </TouchableOpacity>

          )
        }
        
      </View>

      </View>
    </ScreenWrapper>
    
  )
}

export default AddExpenseScreen




