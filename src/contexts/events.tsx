import React, {
    useState,
    createContext,
    useEffect,
    useContext,
    useCallback,
  } from 'react';
  import { Alert } from 'react-native';
  
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Toast from 'react-native-simple-toast';
  import api from '../services/api';
  import AuthContext from './auth';
  
  interface IEvent {
    id: string;
    title: string;
    describe: string;
    user_id: string;
    building_id: string;
    start_date_time: string;
    end_date_time: string;
  }
  
  interface IEventsContextData {
    eventList: IEvent[] | null;
    myEventList:IEvent[] | null;
    eventOpened:IEvent[] | null;
    getAllEvents(): Promise<void>;
    getMyEvents(): Promise<void>;
    deletar(evento:IEvent):Promise<void>;
   /*  getMyEvents(): Promise<void>; */
    /* addProduct(product: IProducts): void;
    editProduct(product: IProducts): Promise<void>; */
    /* removeProduct(id: string): Promise<void>; */
    loading: boolean;
    isUpdate: boolean;
  }
  
  const EventContext = createContext<IEventsContextData>(
    {} as IEventsContextData,
  );
  export const EventProvider: React.FC = ({ children }) => {
    const [eventList, setEventList] = useState<IEvent[] | null>([]);
    const [myEventList, setMyEventList] = useState<IEvent[] | null>([]);
    const [eventOpened, setEventOpened] = useState<IEvent[] | null>([]);
    const [loading, setLoading] = useState(true);
    const [isUpdate, setIsUpdate] = useState(false);
    const { user, signed } = useContext(AuthContext);
    useEffect(() => {
      if (signed) {
        getAllEvents();
        /* getMyEvents(); */
      }
    }, []);
  
    async function getMyEvents(): Promise<void> {
        
        const user = await AsyncStorage.getItem(
            '@LocalizaUnifap:user',
          );
        setLoading(true);
      let meusEventos = []
      let eventosAbertos:IEvent[] = []
      let eventosFechados:IEvent[] = []
      let todosEventos = []
      let k = 0,i=0;
      let hoje = new Date()
        try {
            const response =await api.get('/showevents')
            console.log(response.data,'g')
            todosEventos = response.data;
            todosEventos.forEach((evento:IEvent,index:number) => {
              const teste = new Date(response.data[index].end_date_time)
              
              if(response.data[index].user_id === JSON.parse(user).id){
               
                if( teste >= hoje){
                  console.log("entrou")
                  eventosAbertos[i] = evento
                  i++
                }else{
                  eventosFechados[k] = evento
                  k++
                }
                
              }
              
        });
        for(let i = 0 ; i<eventosAbertos.length;i++){
          meusEventos[i] = eventosAbertos[i]
        }
        let l = 0
        for(let i = eventosAbertos.length ; i<eventosFechados.length+eventosAbertos.length;i++){
          meusEventos[i] = eventosFechados[l]
          l++
        }
        
        console.log(meusEventos,'g')
        setEventOpened(eventosAbertos)
        setMyEventList(meusEventos)
        /* this.setState({eventosAbertos:eventosAbertos,todosEventos:meusEventos}) */
        
        setLoading(false)
        } catch (error) {
          setLoading(false);
          if (error.message === 'Network Error') {
            Alert.alert('Verifique sua conexão de internet e tente novamente!!');
          } else {
            console.log(JSON.stringify(error, null, 2));
            console.log(error, 'jonathan');
            console.log(Object(error.response), 'salve');
            /* Alert.alert(error.response.data.error); */
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          }
        }
      }
  
    async function getAllEvents(): Promise<void> {
      setLoading(true);
    let todosEventos = []
    let eventosAbertos = []
    let k = 0;
    let hoje = new Date()
      try {
        const response = await api.get(
          `/showevents`,
        );
        todosEventos = response.data
        console.log(response.data.length,'entidade')
        for(let i = 0 ;i <response.data.length;i++){
            console.log(todosEventos[i].end_date_time,hoje,'teste')
            if(new Date(todosEventos[i].end_date_time) >= hoje){
                console.log('tesssssssssssssssssssst')
                eventosAbertos[k] = todosEventos[i]
                k++
            }
        }
        console.log(eventosAbertos,'entidade')
       setEventList(eventosAbertos)
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.message === 'Network Error') {
          Alert.alert('Verifique sua conexão de internet e tente novamente!!');
        } else {
          console.log(JSON.stringify(error, null, 2));
          console.log(error, 'jonathan');
          console.log(Object(error.response), 'salve');
          /* Alert.alert(error.response.data.error); */
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        }
      }
    }
    async function deletar (evento:IEvent){
        Alert.alert(
            'Deletar Evento',
            'Você realmente deseja excluir esse evento?',
            [
              { text: 'Sim', onPress: async() =>{ try { 
                  setLoading(true)
                  const response = await api.delete(`/events/delete/${evento.id}`)
                  console.log('excluido')
                  setLoading(false)
                  getAllEvents()
                  getMyEvents()
                  Toast.show('Excluido com sucesso!!', Toast.SHORT, ['UIAlertController']);
              } catch (error) {
                  console.log(error)
                  setLoading(false)
              } }},
              {
                text: 'Cancelar',
                onPress: () => {},
                style: 'cancel',
              },
            ],
            { cancelable: false },
          );
      }
    /* function addProduct(product: IProducts): void {
      setIsUpdate(true);
      console.log(JSON.stringify(product, null, 2));
      const array = productList;
      array?.push(product);
      array?.sort();
      console.log(JSON.stringify(array, null, 2));
      setProductList(array);
      setIsUpdate(false);
    }
 
    async function removeProduct(id: string): Promise<void> {
      setIsUpdate(true);
      let k = 0;
      const array = productList;
      array?.forEach((value, index) => {
        if (value.id === id) {
          k = index;
        }
      });
      if (k === 0) {
        array?.shift();
      } else {
        array?.splice(k);
      }
  
      setProductList(array);
      setIsUpdate(false);
    }
    async function editProduct(product: IProducts): Promise<void> {
      setIsUpdate(true);
      const array = productList;
      console.log(product, 'jjjj');
      array?.forEach((value) => {
        if (value.id === product.id) {
          value.nome = product.nome;
          value.preco = product.preco;
          value.status_produto = product.status_produto;
          value.estoque_produto = product.estoque_produto;
          value.unidade_medida = product.unidade_medida;
        }
      });
      console.log(JSON.stringify(array, null, 2), 'jjjj');
  
      setProductList(array);
      setIsUpdate(false);
    } */
  
  
    return (
      <EventContext.Provider
        value={{
         /*  addProduct, */
          /* editProduct, */
          getAllEvents,
          getMyEvents,
         /*  removeProduct, */
          loading,
          eventList,
          eventOpened,
          myEventList,
          isUpdate,
          deletar
        }}
      >
        {children}
      </EventContext.Provider>
    );
  };
  
  export function useEvents(): IEventsContextData {
    const context = useContext(EventContext);
  
    return context;
  }
  
  export default EventContext;
  