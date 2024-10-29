import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native'
  import { SafeAreaView } from 'react-native-safe-area-context'
  import { useState } from 'react'
  
  export function Home() {
    const [inputText, setInputText] = useState('')
    const [participants, setParticipants] = useState<
      {
        name: string
        id: number
      }[]
    >([])
  
    function handleAddNewParticipant() {
      if (!inputText) {
        return Alert.alert('Atenção', 'É preciso digitar o nome do participante')
      }
  
      setParticipants((prevState) => [
        ...prevState,
        {
          name: inputText,
          id: Date.now(),
        },
      ])
    }
  
    function handleRemoveParticipant(participantId: number) {
      const filteredParticipantsArray = participants.filter(
        (participant) => participant.id !== participantId,
      )
  
      setParticipants(filteredParticipantsArray)
    }
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.eventName}>Evento qualquer</Text>
        <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022</Text>
  
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={setInputText}
            style={styles.input}
            placeholderTextColor="#6B6B6B"
            placeholder="Nome do participante"
          />
          <TouchableOpacity
            onPress={handleAddNewParticipant}
            style={styles.addButton}
          >
            <Text style={styles.addButtonIcon}>+</Text>
          </TouchableOpacity>
        </View>
  
        <Text style={styles.listTitle}>Participantes</Text>
        <FlatList
          style={{ marginTop: 16 }}
          ListEmptyComponent={() => (
            <Text style={styles.emptyMessage}>
              Ninguém chegou no evento ainda? {'\n'}
              Adicione participantes a sua lista de presença.
            </Text>
          )}
          data={participants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}
            >
              <View style={styles.participant}>
                <Text style={{ color: '#fff', fontSize: 16 }}>{item.name}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleRemoveParticipant(item.id)}
                style={styles.removeParticipantButton}
              >
                <Text style={styles.addButtonIcon}>-</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#131016',
      flex: 1,
      paddingHorizontal: 24,
    },
    eventName: {
      color: '#FDFCFE',
      fontWeight: 'bold',
      fontSize: 24,
      marginTop: 24,
    },
    eventDate: {
      color: '#6B6B6B',
      fontSize: 16,
    },
    inputContainer: {
      marginTop: 34,
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      flexDirection: 'row',
    },
    input: {
      backgroundColor: '#1F1E25',
      color: '#fdfcfe',
      borderRadius: 4,
      flex: 1,
      height: '100%',
      marginRight: 4,
      padding: 16,
    },
    addButton: {
      backgroundColor: '#31CF67',
      borderRadius: 4,
      width: 56,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addButtonIcon: {
      color: '#fff',
      fontSize: 24,
    },
    listTitle: {
      marginTop: 44,
      fontSize: 20,
      color: '#FDFCFE',
      fontWeight: 'bold',
    },
    emptyMessage: {
      color: '#fdfcfe',
      textAlign: 'center',
      marginTop: 28,
    },
    participant: {
      backgroundColor: '#1F1E25',
      color: '#fdfcfe',
      borderRadius: 4,
      flex: 1,
      height: '100%',
      padding: 16,
    },
    removeParticipantButton: {
      backgroundColor: '#E23C44',
      borderRadius: 4,
      width: 56,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })