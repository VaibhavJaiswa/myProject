/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';


const App = () => {

  const radioButtons = React.useMemo(() => ([
    {
      id: '1',
      label: 'Manual',
      value: 'Manual'
    },
    {
      id: '2',
      label: 'Online',
      value: 'Online'
    }
  ]), []);

  const [subjectJsonArray, setSubjectJsonArray] = React.useState([
    {
      subject_name: "Math", obtained_mark: 90, toal_mark: 120, time_spent_min: 10,
      test_type: "Manual",id:1
    },
    {
      subject_name: "Physic", obtained_mark: 50, toal_mark: 60,
      time_spent_min: 10, test_type: "Online",id:2
    },
    {
      subject_name: "Chemistry", obtained_mark: 100,
      toal_mark: 100, time_spent_min: 10, test_type: "Online",id:3
    },
    {
      subject_name: "English", obtained_mark: 80,
      toal_mark: 100, time_spent_min: 20, test_type: "Manual",id:4
    },

  ])
  const [testType, setTestType] = React.useState(subjectJsonArray[0].test_type == "Online" ? '2' : '1');
  const [totalMark, setTotalMark] = React.useState(subjectJsonArray[0].toal_mark)
  const [time, setTime] = React.useState(subjectJsonArray[0].time_spent_min)
  const [obtainedMark, setObtainedMark] = React.useState(subjectJsonArray[0].obtained_mark)
  const [subName, setsetSubName] = React.useState(subjectJsonArray[0].subject_name)


  let toal_mark = 0;
  let obtained_mark = 0;
  let time_spent_min = 0;
  for (let i = 0; i < subjectJsonArray.length; i++) {
    toal_mark += subjectJsonArray[i].toal_mark;
    obtained_mark += subjectJsonArray[i].obtained_mark;
    time_spent_min += subjectJsonArray[i].time_spent_min;
  }

  const [calTotalMark, setCalTotalMark] = React.useState(toal_mark)
  const [calTime, setCalTime] = React.useState(time_spent_min)
  const [calObtainedMark, setCalObtainedMark] = React.useState(obtained_mark)

  const updateArr = (subject_name) => {
    let index = subjectJsonArray.map((item, index) => {
      if (item.subject_name == subject_name) {
        return index
      }
    })
    let index1 = index.filter(item=>item!==undefined)

    // alert(index1)
    let obj = {
      subject_name: subName, obtained_mark: obtainedMark, toal_mark: totalMark, time_spent_min: time,
      test_type: testType == '2' ? 'Online' : 'Manual',
    }

    subjectJsonArray[index1] = obj;

    // alert(JSON.stringify(subjectJsonArray))

    setSubjectJsonArray(subjectJsonArray);
    let toal_mark = 0;
    let obtained_mark = 0;
    let time_spent_min = 0;
    for (let i = 0; i < subjectJsonArray.length; i++) {
      toal_mark += parseInt(subjectJsonArray[i].toal_mark);
      obtained_mark += parseInt(subjectJsonArray[i].obtained_mark);
      time_spent_min += parseInt(subjectJsonArray[i].time_spent_min);
    }
    setCalTotalMark(toal_mark)
    setCalTime(time_spent_min)
    setCalObtainedMark(obtained_mark)

  }

  const setData = (item) => {
    setTestType(item.test_type == "Online" ? '2' : '1')
    setTotalMark(item.toal_mark)
    setTime(item.time_spent_min)
    setObtainedMark(item.obtained_mark)
    setsetSubName(item.subject_name)
  }


  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        style={{ width: Dimensions.get("window").width }}
      >

        {subjectJsonArray.map((item, index) => {
          return (
            <TouchableOpacity onPress={() => { setData(item) }}>
              <View style={{ margin: 15, height: 30, borderWidth: 1, padding: 5 }}>
                <Text>
                  {item.subject_name}
                </Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
      <View style={{ borderWidth: 1, height: "90%" }}>
        <ScrollView>

          <View style={{ display: 'flex', justifyContent: 'center', alignSelf: 'center', margin: 25 }}>
            <Text>{subName}</Text>
          </View>
          <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', margin: 10 }}>
            <Text style={{ margin: 20 }}>Obtained Mark </Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setObtainedMark(text)}
              value={obtainedMark.toString()}
              placeholder="Obtained Mark"
            // keyboardType="numeric"
            />
          </View>
          <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', margin: 10 }}>
            <Text style={{ margin: 20 }}>Total Mark</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setTotalMark(text)}
              value={totalMark.toString()}
              placeholder="Total Mark"
            // keyboardType="numeric"
            />
          </View>
          <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', margin: 10 }}>
            <Text style={{ margin: 20 }}>Time Spend in Min</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setTime(text)}
              value={time.toString()}
              placeholder="Time Spend in Min"
            // keyboardType="numeric"
            />
          </View>

          <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', margin: 10 }}>
            <Text style={{ margin: 20 }}>Test Type</Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setTestType}
              selectedId={testType}
              layout='row'
            />
          </View>
          <TouchableOpacity onPress={() => { updateArr(subName) }} style={{ padding: 15, borderWidth: 2, margin: 10, borderRadius: 5 }}>
            <Text style={{ alignSelf: 'center' }}>
              Apply
            </Text>
          </TouchableOpacity>
          <Text style={{ fontWeight: "800" }}>Final Score</Text>
          <Text>Total Mark : {calTotalMark}</Text>
          <Text>Obtained Mark : {calObtainedMark}</Text>
          <Text>Time Spend (HH:MM:SS) : {calTime}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '50%'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
