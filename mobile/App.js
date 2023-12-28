import {StatusBar} from 'expo-status-bar';
import {
    Button, SafeAreaView, StyleSheet, Text, View, TextInput,
    FlatList
} from 'react-native';
import {useState, useEffect} from 'react'
import uuid from 'react-native-uuid'
import axios from "axios";


const Habit = ({title, id, completed, toggleComplete, deleteHabit}) => <View>
    <Text style={completed ? styles.completedHabit : null}>{title}</Text>
    <Button title={'Complete'} onPress={() => toggleComplete(id)}/>
    <Button title={'Delete'} onPress={() => deleteHabit(id)}/>
</View>

export default function App() {

    const [text, setText] = useState('')

    const [habits, setHabits] = useState([])

    const onPressHandler = () => {
        setHabits([...habits,
            {
                id: uuid.v4(),
                title: text,
                completed: falser
            }])
        setText('')
    }

    const toggleComplete = (id) => {
        setHabits(habits.map(habit => id === habit.id ? {
            ...habit, completed: !habit.completed
        } : habit))
    }

    const deleteHabit = (id) => {
        setHabits(habits.filter(habit => habit.id !== id))
    }

    const onChangeText = (e) => {
        setText(e)
    }

    useEffect(() => {

        (async () => {
            const {data} = await axios.get('http://localhost:8080/habits')
            setHabits(data)
        })()

    }, [])

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                />
                <StatusBar style="auto"/>
                <View style={styles.buttonContainer}>
                    <Button title={'Add Habit'} color={
                        '#fff'}
                            onPress={onPressHandler}
                    />
                </View>
                {/*<View style={styles.habitsContainer}>*/}
                {/*    {habits.map(habit => (<View style={styles.habitContainer}>*/}
                {/*        <Text style={habit.completed ? styles.completedHabit : null}>{habit.title}</Text>*/}
                {/*        <Button title={'Complete'} onPress={() => toggleComplete(habit.id)}/>*/}
                {/*    </View>))}*/}
                {/*</View>*/}
                <FlatList
                    data={habits}
                    renderItem={({item}) => <Habit title={item.title} id={item.id} completed={item.completed}
                                                   toggleComplete={toggleComplete} deleteHabit={deleteHabit}/>}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: 'blue',
        borderRadius: 8
    },
    habitsContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    habitContainer: {
        justifyContent: 'space-between'
    },
    completedHabit: {
        textDecorationLine: 'line-through'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
