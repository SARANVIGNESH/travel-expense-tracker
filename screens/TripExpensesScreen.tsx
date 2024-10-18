

// import { StatusBar } from "react-native";
// import { useEffect, useState } from "react";
// import { Button, SafeAreaView, Text, View } from "react-native";
// import { PieChart } from "react-native-chart-kit";
// import styles from "../theme/styles";
// import Addform from "./AddExpenseScreen";
// import ExpenseComponent from "./ExpenseComponent";
// import BackButton from "../components/BackButton";

// export default function TripExpensesScreen() {
//     // Define state variables using the useState hook
//     const [name, setName] = useState("");
//     const [amount, setAmount] = useState("");
//     const [category, setCategory] = useState("Food");
//     const [expenses, setExpenses] = useState([]);
//     const categories = ["Food", "Clothes", "Bills", "Others"];
//     const [addForm, setAddForm] = useState(false);

//     // Function to open the add expense form
//     const addExpense = () => {
//         setAddForm(true);
//     };

//     // Initialize the chart data with default values
//     const [chartData, setChartData] = useState([
//         {
//             name: "Food",
//             amount: 0,
//             color: "#e62d20",
//             legendFontColor: "#7F7F7F",
//             legendFontSize: 15,
//         },
//         {
//             name: "Clothes",
//             amount: 0,
//             color: "#27e620",
//             legendFontColor: "#7F7F7F",
//             legendFontSize: 15,
//         },
//         {
//             name: "Bills",
//             amount: 0,
//             color: "#1c6bd9",
//             legendFontColor: "#7F7F7F",
//             legendFontSize: 15,
//         },
//         {
//             name: "Others",
//             amount: 0,
//             color: "#5adbac",
//             legendFontColor: "#7F7F7F",
//             legendFontSize: 15,
//         },
//     ]);

//     // Render the components and UI
//     return (
//         <SafeAreaView style={styles.container}>
//             <StatusBar style="auto" />
            
//             <View className='px-4'>
//          <View className='relative mt-5'>
//            <View className='absolute left-0 z-10'>
//              <BackButton />
//           </View>
//                      <View>
           
//            <Text style={styles.heading2}>
//                 Expense Tracker
//             </Text>
//            </View>
          
//           </View>
//            </View>

//             {/* Render the PieChart component with data */}
//             <PieChart
//                 data={chartData}
//                 width={300}
//                 height={200}
//                 chartConfig={{
//                     backgroundGradientFrom: "#1E2923",
//                     backgroundGradientTo: "#08130D",
//                     color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//                 }}
//                 accessor="amount"
//                 backgroundColor="transparent"
//                 paddingLeft="15"
//                 absolute
//             />

//             {/* Conditional rendering: If addForm is true, 
//                 render the Addform component */}
//             {addForm == true ? (
//                 <Addform
//                     name={name}
//                     setName={setName}
//                     amount={amount}
//                     setAmount={setAmount}
//                     category={category}
//                     setCategory={setCategory}
//                     categories={categories}
//                     setExpenses={setExpenses}
//                     expenses={expenses}
//                     chartData={chartData}
//                     setChartData={setChartData}
//                     setAddForm={setAddForm}
//                 />
//             ) : (
//                 /* If addForm is false, render the "Add Expense" button */
//                 <View style={styles.row}>
//                     <Button
//                         onPress={addExpense}
//                         color="green"
//                         style={styles.addButton}
//                         title="Add Expense"
//                     />
//                 </View>
//             )}

//             {/* Render the ExpenseComponent */}
//             <ExpenseComponent
//                 expenses={expenses}
//                 setExpenses={setExpenses}
//                 chartData={chartData}
//                 setChartData={setChartData}
//             />
//         </SafeAreaView>
//     );
// }

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackButton from '../components/BackButton'
import { color, colors } from 'react-native-tailwindcss';
import ScreenWrapper from '../components/ScreenWrapper';
import ExpenseList from './ExpenseList';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { expensesRef } from '../config/firebase';
import { useSelector } from 'react-redux';
import { getDocs, query, where } from 'firebase/firestore'
import { PlusCircleIcon } from "react-native-heroicons/solid";

 




const TripExpensesScreen = ({route}) => {
    const {user} = useSelector(state => state.user);
    const {place, country, userId, budget} = route.params;
    const [expenses, setExpenses] = useState([]);
    const [totalCost, setTotalCost] = useState();
    const navigation = useNavigation();
    const [expensePercentage, setExpensePercentage] = useState(0);
    const calculateTotalPercent = () => {
        let total = 0
        expenses.forEach(item=>{
            total = total + parseInt(item.expenseAmount, 10)
        })
        setTotalCost(total);
        const expensePer = (total/budget) * 100
        setExpensePercentage(expensePer)
    }


    const isFocused = useIsFocused();

  const fetchTrips = async () => {
    const data = [];
    const q = query(expensesRef, where("userId", "==", user.uid), where("place", "==", place));
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach(doc=> {
    //   console.log('fetched expense data', doc.data());
      data.push({...doc.data(), id: doc.id})
    })
    setExpenses(data);
  }

  useEffect(() =>{
    calculateTotalPercent();
  },[expenses])

  useEffect(() => {
    if (isFocused) 
      fetchTrips();
  }, [isFocused])
  return (
    <View style={{padding: 20, marginTop: 20, flex: 1}}>
        <BackButton />
        <View>
            <Text className={`${colors.black} text-xl font-bold text-center`}>{place}</Text>
            <Text className={`${colors.black} text-xs text-center`}>{country}</Text>
        </View>
        <View style={styles.amountContainer}>
                     <Text>${totalCost}</Text>
                    <Text>Total Budget: {budget}</Text>
                </View>
                <View style={styles.progressBar}>
                <View style={[styles.progressBarSubContainer, {width: expensePercentage+'%'}]}></View>
               </View>
                <View>
                    <ExpenseList expenses={expenses}/>
                 </View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('AddExpense', {place})
                }}
                style={styles.floatingButton}
                >
                         <PlusCircleIcon size={60} color={color.green500} />
                </TouchableOpacity>

    </View>
   
    // <ScreenWrapper> 
    //     <View className='flex justify-between h-full mx-4'>
    //         <View className='relative mt-5'>
    //             <View className='absolute top-0 left-0 z-10'>
    //                 <BackButton />
    //             </View>
    //             <View>
    //                 <Text className={`${colors.black} text-xl font-bold text-center`}>{country}</Text>
    //                 <Text className={`${colors.black} text-xs text-center`}>{place}</Text>
    //             </View>
    //             {/* Prgress bar */}
    //             <View style={styles.amountContainer}>
    //                 <Text>$500</Text>
    //                 <Text>Total Budget: {budget}</Text>
    //             </View>
    //             <View style={styles.progressBar}>
    //                 <View style={styles.progressBarSubContainer}></View>
    //             </View>
    //             <View>
    //                 <ExpenseList expenses={expenses}/>
    //             </View>
    //             <TouchableOpacity style={styles.floatingButton}>
    //                     <PlusCircleIcon size={60} color={color.black} />
    //             </TouchableOpacity>

    //         </View>
    //     </View>

    // </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
    place: {
        fontSize: 25,
        backgroundColor: color.green500,
        padding: 20,
        borderRadius: 15
    },
    container: {
        justifyContent: 'center',
        alignItems: 'baseline'
    },

    amountContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 15
    },
    progressBar: {
        width:'100%',
        height: 15,
        backgroundColor: color.gray300,
        borderRadius: 99,
        marginTop: 7
    },
    progressBarSubContainer: {
        width: '40%',
        backgroundColor: color.green500,
        borderRadius: 99,
        height: 15
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,  
        right: 20, 
    }  
})

export default TripExpensesScreen


