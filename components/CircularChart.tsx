// import { View, Text, StyleSheet } from 'react-native'
// import PieChart from 'react-native-pie-chart'
// import React, { useEffect, useState } from 'react'
// import { color } from 'react-native-tailwindcss';
// import { CheckCircleIcon } from 'react-native-heroicons/outline';
// import { query, where, getDocs } from 'firebase/firestore';
// import { useSelector } from 'react-redux';
// import { expensesRef } from '../config/firebase';
// import { VictoryPie } from 'victory-pie';

// const CircularChart = ({trips}) => {
//     const widthAndHeight = 150;
//     const [values, setValues] = useState([1]);
//     const [sliceColor, setSliceColor] = useState([color.gray300])
//     const {user} = useSelector(state => state.user);
//     const colorList = [color.red500, color.blue500]


//     const updateCircularChart = async () => {
//       trips.map(async (item, index) => {
//         let total = 0;
//         let data =[]
//         const q = query(expensesRef, where("userId", "==", user.uid), where("place", "==", item.place));
//         const querySnapShot = await getDocs(q);
    
//         querySnapShot.forEach(doc => {
//           let expenseAmount = parseInt(doc.data().expenseAmount, 10);
//           total += expenseAmount;
//           data.push(doc.data());
//         });
//         console.log("amount", total);
//         console.log("color", colorList[index] )
//         // setSliceColor(sliceColor=> [...sliceColor, colorList[index]])
//         // setValues(values=>[...values, total])
//       })
//     };

   
    

//     useEffect(() => {
//       trips&&updateCircularChart()
//     }, [trips])

//   return (
//     <View style={styles.container}>
//       <Text style={{
//         fontSize: 20,
//       }}>
//         Total Estimate: <Text style={{fontWeight: 'bold'}}>0$</Text>
//       </Text>
//       <View style={styles.subContainer}>
//       <PieChart
//             widthAndHeight={widthAndHeight}
//             series={values}
//             sliceColor={sliceColor}
//             coverRadius={0.65}
//             coverFill={'#FFF'}
//           />
//       <View style={{
//         display: 'flex',
//         flexDirection: 'row',
//         gap: 5,
//         alignItems: 'center'

//       }}>
//       {/* <MaterialCommunityIcons name="checkbox-blank-circle" size={24} color="black" /> */}
//       <CheckCircleIcon size={24} color={color.gray500}/>
//       <Text>NA</Text>
//       </View>
//       </View>

//     </View>
//   )
// }



// const styles = StyleSheet.create({
//     container: {
//         marginTop: 20,
//         backgroundColor: color.white,
//         padding: 20,
//         borderRadius: 15,
//         elevation: 1
//     },
//     subContainer: {
//       marginTop: 10,
//       display: 'flex',
//       flexDirection: 'row',
//       gap: 40

//     }
// })

// export default CircularChart


// import { View, Text, StyleSheet } from 'react-native'
// import PieChart from 'react-native-pie-chart'
// import React, { useEffect, useState } from 'react'
// import { color } from 'react-native-tailwindcss';
// import { CheckCircleIcon } from 'react-native-heroicons/outline';
// import { query, where, getDocs } from 'firebase/firestore';
// import { useSelector } from 'react-redux';
// import { expensesRef } from '../config/firebase';
// import { VictoryPie } from 'victory-pie';

// export default function CircularChart({trips}) {
//   const widthAndHeight = 150
//     // const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']
//     const {user} = useSelector(state => state.user);
//     const series = [5500, 4000]
//     const sliceColor = ['#F44336','#2196F3']
//     const colorList = [color.red500, color.blue500]



//     const updateCircularChart = async () => {
//       trips.map(async (item, index) => {
//         let total = 0;
//         let data =[]
//         const q = query(expensesRef, where("userId", "==", user.uid), where("place", "==", item.place));
//         const querySnapShot = await getDocs(q);
    
//         querySnapShot.forEach(doc => {
//           let expenseAmount = parseInt(doc.data().expenseAmount, 10);
//           total += expenseAmount;
//           data.push(doc.data());
//         });
//         // console.log("amount", total);
//         // console.log("color", colorList[index] )
//         // setSliceColor(sliceColor=> [...sliceColor, colorList[0]])
//         // setValues(values=>[...values, total])
//       })
//     };

//     useEffect(() => {
//       trips&&updateCircularChart()
//     }, [trips])

//   return (
//     <View style={styles.container}>
//       <PieChart
//         widthAndHeight={widthAndHeight}
//         series={series}
//         sliceColor={sliceColor}
//         doughnut={true}
//         coverRadius={0.45}
//         coverFill={'#FFF'}
//       />
//     </View>
// );

// }


// const styles = StyleSheet.create({
//   container: {
//       marginTop: 20,
//       backgroundColor: color.white,
//       padding: 20,
//       borderRadius: 15,
//       elevation: 1,
//       alignItems: 'center'
//   },
//   subContainer: {
//     marginTop: 10,
//     display: 'flex',
//     flexDirection: 'row',
//     gap: 40

//   },
//   title: {
//     fontSize: 24,
//     margin: 10
//   }
// })



import { PieChart } from "react-native-gifted-charts";
import { Text, View } from "react-native";

const CircularChart = () => {
  const pieData = [
  {
    value: 47,
    color: '#009FFF',
    gradientCenterColor: '#006DFF',
    focused: true,
  },
  {value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE'},
  {value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3'},
  {value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97'},
];

const renderDot = color => {
  return (
    <View
      style={{
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: color,
        marginRight: 10,
      }}
    />
  );
};

const renderLegendComponent = () => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 120,
            marginRight: 20,
          }}>
          {renderDot('#006DFF')}
          <Text style={{color: 'white'}}>Excellent: 47%</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
          {renderDot('#8F80F3')}
          <Text style={{color: 'white'}}>Okay: 16%</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 120,
            marginRight: 20,
          }}>
          {renderDot('#3BE9DE')}
          <Text style={{color: 'white'}}>Good: 40%</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
          {renderDot('#FF7F97')}
          <Text style={{color: 'white'}}>Poor: 3%</Text>
        </View>
      </View>
    </>
  );
};

return (
  <View
    style={{
      paddingVertical: 100,
      backgroundColor: '#34448B',
      flex: 1,
    }}>
    <View
      style={{
        margin: 20,
        padding: 16,
        borderRadius: 20,
        backgroundColor: '#232B5D',
      }}>
      <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
        Performance
      </Text>
      <View style={{padding: 20, alignItems: 'center'}}>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          innerCircleColor={'#232B5D'}
          centerLabelComponent={() => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                  47%
                </Text>
                <Text style={{fontSize: 14, color: 'white'}}>Excellent</Text>
              </View>
            );
          }}
        />
      </View>
      {renderLegendComponent()}
    </View>
  </View>);
}

export default CircularChart


