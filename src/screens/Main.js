import { Alert, Button, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTransaction, updateTransaction } from '../redux/reducers/transactionsSlice';
import TransactionItem from '../components/TransactionItem';

const Main = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('revenue');
  const [amount, setAmount] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Kiểm tra nhập ngày tháng năm
  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regex)) return false;

    const date = new Date(dateString);
    const timestamp = date.getTime();

    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) return false;

    return dateString === date.toISOString().split('T')[0];
  }

  // Kiểm tra form
  const validateForm = () => {
    if (!title) {
        Alert.alert('Title is required');
        return false;
    }
    if (!amount || isNaN(amount)) {
        Alert.alert('Amount is required and must be a number');
        return false;
    }
    if (!isValidDate(date)) {
        Alert.alert('Date must be in YYYY-MM-DD format');
        return false;
    }
    return true;
  };

  const handleAddOrUpdate = () => {
    if (!validateForm()) return;

    if (currentItem) {
        dispatch(updateTransaction({
            id: Math.random.toString(),
            title,
            description,
            date,
            type,
            amount: parseFloat(amount)
        }));
    } else {
        dispatch(addTransaction({
            id: Math.random.toString(),
            title,
            description,
            date,
            type,
            amount: parseFloat(amount)
        }));
    }
    closeModal();
  }

  const openModalForEdit = (transaction) => {
    setCurrentItem(transaction);
    setTitle(transaction.title);
    setDescription(transaction.description);
    setDate(transaction.date);
    setType(transaction.type);
    setAmount(transaction.amount.toString());
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
    setCurrentItem(null);
    setTitle('');
    setDescription('');
    setDate('');
    setType('revenue');
    setAmount('');
  }

  const filteredTransactions = transactions.filter(t => t.title.toLowerCase().includes(searchTerm.toUpperCase()));

  const totalRevenue = transactions.filter(t => t.type === 'revenue').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenditure = transactions.filter(t => t.type === 'expenditure').reduce((sum, t) => sum + t.amount, 0);

  return (
    <View style={styles.container}>
      <TextInput style={styles.searchInput} placeholder='Search by title...'
        value={searchTerm} onChange={setSearchTerm} />
      <Button title='Add transaction' onPress={() => setModalVisible(true)} />
      <FlatList
        contentContainerStyle={styles.list}
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TransactionItem transaction={item} onEdit={() => openModalForEdit(item)} />
        )}
      />
      <View style={styles.stats}>
        <Text style={styles.statsText}>Total revenue: {totalRevenue.toFixed(0)} VND</Text>
        <Text style={styles.statsText}>Total expenditure: {totalExpenditure.toFixed(0)} VND</Text>
      </View>

      <Modal
        visible={modalVisible}
        animationType='slide'
        transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <TextInput style={styles.input} placeholder='Title' value={title} onChangeText={setTitle} />
                    <TextInput style={styles.input} placeholder='Description' value={description} onChangeText={setDescription} />
                    <TextInput style={styles.input} placeholder='Date' value={date} onChangeText={setDate} />
                    <View style={styles.radioContainer}>
                        <TouchableOpacity onPress={() => setType('revenue')}>
                            <Text style={type === 'revenue' ? styles.radioSelected : styles.radio}>Revenue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setType('expenditure')}>
                            <Text style={type === 'expenditure' ? styles.radioSelected : styles.radio}>Expenditure</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput style={styles.input} placeholder='Amount' value={amount} onChangeText={setAmount} keyboardType='numeric' />
                    <Button title={currentItem ? "Update" : "Add"} onPress={handleAddOrUpdate} />
                    <Button title='Cancel' onPress={closeModal} />
                </View>
            </View>
      </Modal>
    </View>
  )
}

export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 8
    },
    list: {
        paddingBottom: 100
    },
    stats: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'center',
        padding: 8
    },
    statsText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        width: 350,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 8
    },
    radioContainer: {
        flexDirection : 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    },
    radio: {
        padding: 10,
        fontWeight: 'bold'
    },
    radioSelected: {
        padding: 10,
        backgroundColor: 'lightblue',
        fontWeight: 'bold'
    }
})