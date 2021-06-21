import React, { Component,useEffect,useState,useContext
} from 'react';
import { StyleSheet, Text, View,  Button, FlatList, ScrollView, TouchableOpacity, SafeAreaView,Alert,Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createAppContainer } from 'react-navigation';
//import { getLightEstimationEnabled } from 'expo/build/AR';
import { createDrawerNavigator} from 'react-navigation-drawer'
import MapView ,{ MAP_TYPES, PROVIDER_DEFAULT,UrlTile } from 'react-native-maps';
import {TextInput} from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Axios from 'axios';
import Loader from '../../Loader'
import DateTimePicker from '@react-native-community/datetimepicker'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import api from '../../services/api'
import EventContext from '../../contexts/events'
var currentDate = new Date()
function EditEvento({route,navigation:{goBack}}) {
 const { eventList, getAllEvents, isUpdate,getMyEvents } = useContext(
   EventContext,
 ); 
 const { evento} = route.params;
  const [titulo,setTitulo] = useState('')
  const [descricao,setDescricao] = useState('')
  const [dataInicio,setDataInicio] = useState('')
  const [horarioInicio,setHorarioInicio] = useState('')
  const [dataFim,setDataFim] = useState('')
  const [horarioFim,setHorarioFim] = useState('')
  const [showDataInicio,setShowDataInicio] = useState(false)
  const [showDataFim,setShowDataFim] = useState(false)
  const [dataInicioDb,setDataInicioDb] = useState('')
  const [dataFimDb,setDataFimDb] = useState('')
  const [buscarLugar,setBuscarLugar] = useState(false)
  const [lugar,setLugar] = useState('')
  const [nome,setNome] = useState('')
  const [lugarDb,setLugarDb] = useState('')
  const [user,setUser] = useState([])
  const [data,setData] = useState([])
  const [todosOsLugares,setTodosOsLugares] = useState([])
  const [loading,setLoading] = useState(false)
useEffect(()=>{
 
 getuser()
 initialize()
},[])


function initialize(){
  setTitulo(evento.title)
  setDescricao(evento.describe)
  setDataInicio(`${new Date(evento.start_date_time).getDate()}/${new Date(evento.start_date_time).getMonth()+1<=9?`0${new Date(evento.start_date_time).getMonth()+1}`:`${new Date(evento.start_date_time).getMonth()+1}`}/${new Date(evento.start_date_time).getYear()-100}`)
  setHorarioInicio(`${new Date(evento.start_date_time).getHours()<10?`0${new Date(evento.start_date_time).getHours()}`:new Date(evento.start_date_time).getHours()}:${new Date(evento.start_date_time).getMinutes()<10?`0${new Date(evento.start_date_time).getMinutes()}`:new Date(evento.start_date_time).getMinutes()}`)
  setDataInicioDb(new Date(evento.start_date_time))
  setDataFim(`${new Date(evento.end_date_time).getDate()}/${new Date(evento.end_date_time).getMonth()+1<=9?`0${new Date(evento.end_date_time).getMonth()+1}`:`${new Date(evento.end_date_time).getMonth()+1}`}/${new Date(evento.end_date_time).getYear()-100}`)
  setHorarioFim(`${new Date(evento.end_date_time).getHours()<10?`0${new Date(evento.end_date_time).getHours()}`:new Date(evento.end_date_time).getHours()}:${new Date(evento.end_date_time).getMinutes()<10?`0${new Date(evento.end_date_time).getMinutes()}`:new Date(evento.end_date_time).getMinutes()}`)
  setDataFimDb(new Date(evento.end_date_time))
  getData()
  
  setLugarDb(evento.building_id)
}
async function getData  ()  {
  setLoading(true)
 try{

   const response = await api.get('/showbuildings')
   if(response.data === null){
Alert.alert('Aviso', 'Nada Encontrado, reinicie o app!!')
   }else{
for(let i = 0 ;i <response.data.length;i++){
 
  if(response.data[i].id === evento.building_id){
    console.log('entrouuuuuuuuuuuuuuuuuu')
    setLugar(response.data[i].name)
  }
} setLoading(false)
     setTodosOsLugares(response.data)
     
     console.log(response.data,'jjjjjjjjjjjjjjjjjjjjjjjjj')
     /* this.setState({todosOsLugares: response.data}) */
   }
 }catch(error){
  setLoading(false)
   console.log(error)
   Alert.alert('Aviso!!', "Não foi possivel conectar a internet, tente novamento mais tarde!!")
 }

}
  /*  static navigationOpotions ={
     
   }
   state = {
     titulo: '',
     descricao:'',
     dataInicio:'',
     horarioInicio:'',
     dataFim:'',
     horarioFim:'',
     loading:false,
     showDataInicio:false,
     showDataFim:false,
     dataInicioDb:'',
     dataFimDb:'',buscarLugar:false,todosOsLugares:[],lugar:'',nome:'',lugarDb:'',user:[]
   }; */
/* componentDidMount(){
getData();
getuser()
} */

async function getuser(){
const user = await AsyncStorage.getItem(
 '@LocalizaUnifap:user',
);
console.log(JSON.parse(user),'ttttttttt')
setUser(JSON.parse(user))
/* setState({user:JSON.parse(user)}) */
}

   
   function hideDatePicker(){
     setShowDataInicio(false)
         }
   function handleConfirm(date){
     console.log(date.toGMTString(),'tr')
     setDataInicio(`${date.getDate()}/${date.getMonth()+1<=9?`0${date.getMonth()+1}`:`${date.getMonth()+1}`}/${date.getYear()-100}`)
     setHorarioInicio(`${date.getHours()<10?`0${date.getHours()}`:date.getHours()}:${date.getMinutes()<10?`0${date.getMinutes()}`:date.getMinutes()}`)
     setDataInicioDb(date)
     setDataFim('')
     setHorarioFim('')
     setDataFimDb('')
     setShowDataInicio(false)
     /* setState({dataInicio:`${date.getDate()}/${date.getMonth()+1<=9?`0${date.getMonth()+1}`:`${date.getMonth()+1}`}/${date.getYear()-100}`}) */
/* setState({horarioInicio:`${date.getHours()<10?`0${date.getHours()}`:date.getHours()}:${date.getMinutes()<10?`0${date.getMinutes()}`:date.getMinutes()}`,dataInicioDb:date}) */
/* setState({dataFim:''})
setState({horarioFim:'',dataFimDb:''})
setState({showDataInicio:false}) */
   }

   function hideDatePickerEnd(){
     setShowDataFim(false)
         }
   function handleConfirmEnd(date){
     console.log(date.toGMTString(),'tr')
     setDataFim(`${date.getDate()}/${date.getMonth()+1<=9?`0${date.getMonth()+1}`:`${date.getMonth()+1}`}/${date.getYear()-100}`)
     setHorarioFim(`${date.getHours()<10?`0${date.getHours()}`:date.getHours()}:${date.getMinutes()<10?`0${date.getMinutes()}`:date.getMinutes()}`)
     setDataFimDb(date)
     setShowDataFim(false)
/* setState({dataFim:`${date.getDate()}/${date.getMonth()+1<=9?`0${date.getMonth()+1}`:`${date.getMonth()+1}`}/${date.getYear()-100}`}) */
/* setState({horarioFim:`${date.getHours()<10?`0${date.getHours()}`:date.getHours()}:${date.getMinutes()<10?`0${date.getMinutes()}`:date.getMinutes()}`,dataFimDb:date})
setState({showDataFim:false}) */
   }

  async function search(nome) {
    setNome(nome)
    /*  let a = [{ nome: "Sem Resultados!!" }]; */
    
     const filter = todosOsLugares?.filter((value) => {
       return String(value.name)
         .toUpperCase()
         .includes(String(nome).toUpperCase());
     });
 
     if (nome.length ===0) {
       setData([])
       console.log(nome.length,'fffffffffffddddddddddddddddddddd')
       
       /* setState({data: [{ name: "Sem Resultados!!" }]}) */
      
     } else if(filter.length === 0){
       setData([{ name: "Sem Resultados!!" }])
     } else{ 
       console.log(filter[0],'teste')
     setData(filter)
     }
     
    /*  if (nome === "") {
       console.log("entroi");
       setState({ data: [] });
     } else if (nome !== "") {
       const nome = nome;
 
       const response = await axios.get("http://172.16.53.97:5000/edificios", {
         headers: {
           nome: nome
         }
       });
 
       if (Object.entries(response.data).length === 0) {
         console.log("response");
         setState({ data: a });
       } else {
         setState({ data: response.data });
         console.log(response.data);
       }
     } */
   };
  function preencheLugar(rowData){
     if(rowData.name!="Sem Resultados!!"){
       setBuscarLugar(false)
       setLugar(rowData.name)
       setLugarDb(rowData.id)
       /* setState({buscarLugar:false,lugar:rowData.name,lugarDb:rowData.id}) */

     }
     
   }


   async function atualizarEvento(){
     console.log(titulo.length,descricao.length,lugarDb.length,dataFimDb,'hhhhhhhhhhh',dataInicioDb,'jjjjjjjjjjjjj')
     if(titulo.length>0 && descricao.length> 0 &&lugarDb.length>0 
       &&dataFimDb!='' && dataInicioDb!=''){
         setLoading(true)
         
try{
const response= await api.put(`/events/${evento.id}`,{
 title:titulo,
 describe:descricao,
 user_id: user.id,
 building_id:lugarDb,
 start_date_time:dataInicioDb,
 end_date_time:dataFimDb

})
console.log(response.data)
getAllEvents() 
getMyEvents()
setLoading(false)
Toast.show('Evento Atualizado!!', Toast.SHORT, ['UIAlertController']);
goBack()
setState({titulo:'',descricao:'',lugarDb:'',dataFimDb:'',dataInicioDb:'',dataFim:'',dataInicio:'',horarioFim:'',horarioInicio:'',lugar:''})
}catch(error){
 setLoading(false)
 console.log(error)
}
     }else{
       Alert.alert('Aviso','Preencha todos os campos!!')
     }
   }

  
     return (
         
       <KeyboardAwareScrollView style={estilo.scroll}
       enableOnAndroid={true} extraHeight={130} extraScrollHeight={130}>
         <Loader loading={loading} /> 
         {buscarLugar===true?(
           <Modal
           transparent={true}
           visible={buscarLugar}
           animationType='none'
           onRequestClose={()=>{console.log('close modal')}}
           >
<View
style={{
  flexDirection: "row",
  justifyContent: "space-between",
  backgroundColor:'#F5F6F8',
  width: "100%",
  height: "100%",
  paddingBottom: 20,
  paddingTop:10
  

}}
>
<Icon
  onPress={() => setBuscarLugar(false)}
  name="arrow-left"
  size={40}
  color="#597291"
/>
<View style={{ width: "90%",paddingLeft:10 }}>
  <TextInput
  theme={{ colors: { primary: "#129794" }}}
    autoFocus={true}
    placeholder="Insira sua Busca!"
    placeholderTextColor="#597291"
    style={{
      borderColor: "#e3e3e3",
      borderWidth: 1,
      width: "88%",
      height: 40,
      backgroundColor: "white",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
    }}
    value={nome}
    onChangeText={nome => search(nome)
    }
  />
 {/*  <KeyboardAwareScrollView enableOnAndroid={true}> */}
    <FlatList
      data={data}
      renderItem={({ item: rowData,index }) => {
        return (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() =>
            /*  getCurrentLocation(rowData.latitude, rowData.longitude) */
            preencheLugar(rowData)
          
              }
              /* onPress={() => trataDetalhes(rowData)} */
              style={{
                paddingLeft: 5,
                height: 70,
                width: "88%",
                padding: 10,
                borderWidth: 1,
                borderColor: "#E0E0E0",
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "white"
              }}
            >
              <View style={{ width: "100%", height: "100%" }}>
                {rowData.name === "Sem Resultados!!" ? (
                  <Text
                    style={{
                      fontSize: 14,
                      textAlign: "center",
                      paddingTop: 13
                    }}
                  >
                    {rowData.name}
                  </Text>
                ) : null}
                {rowData.name !== "Sem Resultados!!" ? (
                  <Text style={{ fontSize: 18 }}>
                    {rowData.name}
                  </Text>
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
        );
      }}
      keyExtractor={(item, index) => String( item.id)}
    />
  {/* </KeyboardAwareScrollView> */}
</View>
</View></Modal>
         ):(
<View style={estilo.principal}>
           
           <Text  style={estilo.esqsenha}>Insira as informações do evento.</Text>
             <TextInput style={estilo.entrada}
               label='Titulo'
               value={titulo}
               onChangeText={titulo => setTitulo(titulo)}
               theme={{ colors: { primary: "#129794" }}}
               underlineColor='#fff'
             />
             <TextInput style={estilo.entrada}
               label='Descrição'
               value={descricao}
               onChangeText={descricao => setDescricao(descricao)}
               theme={{ colors: { primary: "#129794" }}}
               underlineColor='#fff'
             />
             <TouchableOpacity onPress={()=>setShowDataInicio(true)} style={{flexDirection:'row', padding:5,borderWidth:1,borderColor:'#DCDCDC',width:"95%",marginBottom:10,backgroundColor:'#FFF'}}>
             <View style={{width:'50%',alignContent:'center',alignItems:'center'}}>
             <Text style={{paddingBottom:15,color:'#696969'}}>Data de Inicio</Text>
             <View style={{flexDirection:'row'}} >
               <Text style={{color:'#696969'}}>{dataInicio!=''?dataInicio:'___/___/___'}  </Text>
               <Icon name={'calendar'} size={25} color={'#597291'} />
             </View>
             </View>
             <View style={{width:'50%',alignContent:'center',alignItems:'center'}}>
             <Text style={{paddingBottom:15,color:'#696969'}}>Hora de Inicio</Text>
             <View style={{flexDirection:'row'}} >
               <Text style={{color:'#696969'}}>{horarioInicio!=''?horarioInicio:'___:___'} </Text>
               <Icon name={'clock-outline'} size={25} color={'#597291'} />
             </View>
             </View>
             </TouchableOpacity>
             
             
             {/* <TextInput style={estilo.entrada}label='Insira a data de inicio do evento'
               value={email}
               onChangeText={dataInicio}
               theme={{ colors: { primary: "#129794" }}}
               onFocus={
                ()=> setState({showDataInicio:true})}
                editable={false}
                disabled={true}
                focusable={true}
               underlineColor='#fff'/> */}
               
               <DateTimePickerModal
               isVisible={showDataInicio}
               mode="datetime"
               onConfirm={handleConfirm}
               onCancel={hideDatePicker}
               minimumDate={currentDate}
               
               />
               <DateTimePickerModal
               isVisible={showDataFim}
               mode="datetime"
               onConfirm={handleConfirmEnd}
               onCancel={hideDatePickerEnd}
               minimumDate={dataInicioDb!=''?dataInicioDb:currentDate}
               
               />
               {dataInicioDb!=''?(
                 <TouchableOpacity  onPress={()=>setShowDataFim(true)} style={{flexDirection:'row', padding:5,borderWidth:1,borderColor:'#DCDCDC',width:"95%",marginBottom:5,backgroundColor:'#FFF'}}>
                 <View style={{width:'50%',alignContent:'center',alignItems:'center'}}>
                 <Text style={{paddingBottom:15,color:'#696969'}}>Data da Finalização</Text>
                 <View style={{flexDirection:'row'}} >
                   <Text style={{color:'#696969'}}>{dataFim!=''?dataFim:'___/___/___'} </Text>
                   <Icon name={'calendar'} size={25} color={'#597291'} />
                 </View>
                 </View>
                 <View style={{width:'50%',alignContent:'center',alignItems:'center'}}>
                 <Text style={{paddingBottom:15,color:'#696969'}}>Hora de Finalização</Text>
                 <View style={{flexDirection:'row'}} >
                   <Text style={{color:'#696969'}}>{horarioFim!=''?horarioFim:'___:___'} </Text>
                   <Icon name={'clock-outline'} size={25} color={'#597291'} />
                 </View>
                 </View>
                 </TouchableOpacity>
                 
               ):null}
               
 {/* {showDataInicio?( <DateTimePicker
           testID="dateTimePicker"
           value={currentDate}
           mode={'date'}
           is24Hour={true}
           display="default"
           onChange={onChange()}
         />):null} */}
            
             <TouchableOpacity onPress={()=>setBuscarLugar(true)} style={{backgroundColor:'#FFF', height:60,borderWidth:1,borderColor:"#E8E8E8",width:'100%',justifyContent:'center',paddingHorizontal:10}}>
               <Text style={{fontSize:16, color:'#808080'}}>
                 {lugar!=''?lugar:'Onde será o envento?'}
                
               </Text>
             </TouchableOpacity>
             <TouchableOpacity style={estilo.botao} onPress={()=>atualizarEvento()} >
               <Text style={estilo.botaoTexto}>Atualizar Evento</Text>
             </TouchableOpacity>
             
           </View>
         )}
         
       </KeyboardAwareScrollView>
     );
   
   
 }
export default EditEvento
const estilo = StyleSheet.create({
 principal:{
   flex: 1,
   flexDirection: 'column',
   justifyContent:'center',
   alignItems: 'center',
   backgroundColor:'#F5F6F8'
 },
 entrada:{
   
   borderRadius: 2,
   width: '100%',
   backgroundColor:'white',height:60,borderColor:'#ECEDEF',borderWidth:1,marginBottom:4
   
 },
 titulo:{
   color:'#477fad',
   
   fontSize:32,
   paddingBottom:40

 },
 botao:{
   borderBottomWidth: 0,
   borderRadius: 10,
   width: '50%',
   backgroundColor:'#129794',
   height:40,
   justifyContent:'center',margin:10
   
 },
 botaoTexto:{
   textAlign:'center',
   fontSize:20,
   color:'white',
   alignItems:'center'
   
 },
 esqsenha:{
   alignItems:'center',
   color:'#807e7e',
   textAlign:'justify',
   padding:10,
   fontSize:15
 },
 scroll:{
   flex:1,
   paddingTop:50,
   backgroundColor:'#F5F6F8'
 }

});