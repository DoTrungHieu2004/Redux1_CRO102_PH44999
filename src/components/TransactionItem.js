import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTransaction } from '../redux/reducers/transactionsSlice';

const TransactionItem = ({ transaction, onEdit }) => {
    const dispatch = useDispatch();

    return (
        <View style={styles.item}>
            <View style={styles.info}>
                <Text style={styles.title}>{transaction.title}</Text>
                <Text style={styles.description}>{transaction.description}</Text>
                <Text style={styles.date}>Date: {transaction.date}</Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={[styles.amount, transaction.type === 'revenue' ? styles.revenue : styles.expenditure]}>{transaction.amount.toFixed(0)}</Text>
            </View>
            <Button title='Edit' onPress={onEdit} />
            <Button title='Delete' onPress={() => dispatch(deleteTransaction(transaction.id))} />
        </View>
    )
}

export default TransactionItem

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 3,
        elevation: 3
    },
    info: {
        flex: 1
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    description: {
        color: '#555',
        marginTop: 4
    },
    date: {
        color: '#888',
        marginTop: 2
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8
    },
    revenue: {
        color: 'green',
    },
    expenditure: {
        color: 'red'
    }
});