import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, VirtualizedList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
 const [showItems, setShowItems] = useState(false);
 const [Senha, SetSenha] = useState([]);
 const [inputWhere, setInputWhere] = useState('');
 const [inputElement, setInputElement] = useState('');
 const [selectedItem, setSelectedItem] = useState(null);

 const data = Senha;

 const handlePress = (item) => {
   setShowItems(!showItems);
   setSelectedItem(showItems ? null : item);
 };

 const handleAddTask = () => {
   if (inputWhere.trim() === '' || inputElement.trim() === '') {
     alert('Digite a senha');
     return;
   }

   SetSenha([...Senha, { where: inputWhere, password: inputElement }]);
   setInputElement('');
   setInputWhere('');
 };

 const deletar = (posicao) => {
   SetSenha(Senha.filter((_, index) => index !== posicao))
 };

 useEffect(() => {
   AsyncStorage.setItem('senhas', JSON.stringify(Senha));
 }, [Senha]);

 useEffect(() => {
   AsyncStorage.getItem('senhas')
     .then(senhas => {
       if (senhas) {
         SetSenha(JSON.parse(senhas));
       }
     });
 }, []);

 return (
   <View style={styles.container}>
     <View style={{marginTop: '10%',marginBottom: 15 , width: '100%', backgroundColor: '#fff', alignItems: 'center'}}>
       <Text style={styles.titulo}>Assitente Pessoal de senhas</Text>
     </View>
     <View style={{flexDirection:'row', flexWrap:'wrap', alignItems: 'center'}}>
         <TextInput
           placeholder="De onde é "
           style={styles.input}
           value={inputWhere}
           onChangeText={setInputWhere}
         />
         <TextInput
           placeholder="Digite a senha"
           style={styles.input}
           value={inputElement}
           onChangeText={setInputElement}
         />
         
       </View>
       <TouchableOpacity onPress={() => handleAddTask()}>
           <Text style={styles.btnAdd}>Adicionar a senha</Text>
         </TouchableOpacity>
       <View id='lista'>
        <View style={{ width: '100%', backgroundColor: '#fff', alignItems: 'center', marginTop: 10, marginBottom: 10}}>
          <Text style={{fontSize: 19}} >Senhas cadastradas</Text>
        </View>
       <FlatList  
           data={data}
           keyExtractor={(item, index) => index.toString()}
           renderItem={({ item, index }) => (
             <View style={[styles.listItem, { flexDirection: 'column', padding: 10, backgroundColor: '#fff' }]}>
               
               {/*<Button title="Deletar" color="red" onPress={() => deletar(index)} /> */}

               <TouchableOpacity onPress={() => handlePress(item)}>
                 <Text style={styles.where}>{item.where}</Text> 
               </TouchableOpacity>
               {showItems && selectedItem === item && <Text>{item.password}</Text>}
             </View>
           )}
        />
       </View>
   </View>
 );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a2a2a',
  },
  titulo:{
    fontSize: 25,
    color: '#000',
    fontStyle: 'italic'
  },
  input:{
   borderWidth: 1,
   margin: 10,
   width: '44%',
   textAlign: 'center',
   borderRadius: 20,
   backgroundColor: '#fff',
   fontStyle: 'italic'
  },
  btnAdd:{
    backgroundColor: '#fff',
    width: '80%',
    height: 30,
    margin: 10,
    textAlign: 'center',
    borderRadius: 20, 
    fontSize: 16,
    color: '#000',
    alignSelf: 'center',
    paddingTop: 5,
    fontStyle: 'italic',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#ffff',
  },
  where:{
    fontSize: 19,
  },
});