import { Participant } from "../../components/Participant";
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { useState } from "react";

export function Home() {
  const [participants, setParticipants] = useState(['Lucas'])
  const [participantName, setParticipantName] = useState('')

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert('Participante existe', "Já existe um participante na lista com esse nome")
    }

    setParticipants(prevState => [...prevState, participantName])
    setParticipantName('')
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => {
          setParticipants(prevState => prevState.filter(participant => participant !== name))
          Alert.alert('Deletado!')
        }
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Nome do evento
      </Text>

      <Text style={styles.description}>
        Sexta, 4 de novembro de 2022
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={participantName}
          onChangeText={setParticipantName}
          placeholder="Nome do participante"
          placeholderTextColor="#6b6b6b"
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença;
          </Text>
        )}
      />
    </View>
  );
}