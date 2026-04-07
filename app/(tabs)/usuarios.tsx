import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

// URL base del microservicio UsuariosService
const BASE_URL = 'http://localhost:5291';

export default function UsuariosScreen() {
    //estado para almacenar los datos obtenidos del API, el indicador de carga y los errores
    const [datos, setDatos] = useState<any[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // useEffect se ejecuta una sola vez al montar el componente
    useEffect(() => {
        // Llamada al endpoint GET /user del microservicio
    fetch(`${BASE_URL}/user`)
        .then((res) => res.json())
        .then((data) => {
            // La API devuelve { codigo, descripcion, datos }
        if (data.codigo === 200) {
            setDatos(data.datos); // Guardamos los usuarios en el estado
        } else {
            setError(data.descripcion);
        }
        setCargando(false);
        })
        .catch((err) => {
            // Error de red o conexión rechazada
        setError(err.message);
        setCargando(false);
        });
    }, []); // El array vacío [] asegura que se ejecute solo una vez al montar el componente

    //pantalla de carga, error o lista de usuarios
    if (cargando) {
    return (
        <View style={styles.center}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text>Cargando usuarios...</Text>
        </View>
    );
    }

    //pantalla de error si la llamada al API falla
    if (error) {
    return (
        <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        </View>
    );
    }

    //pantalla principal con la lista de usuarios
    return (
    <SafeAreaView style={styles.container}>
        // Título de la pantalla
        <Text style={styles.titulo}>Lista de Usuarios</Text>
        <FlatList
        //flatlist es el componente recomendado para listas largas en React Native, ya que optimiza el rendimiento renderizando solo los elementos visibles
        
        data={datos}
        keyExtractor={(item) => item.usuarioId.toString()}
        renderItem={({ item }) => (

            //avatar con la inicial del nombre y un color de fondo, junto con la información del usuario
            <View style={styles.card}>
            <View style={[styles.avatar, { backgroundColor: item.colorAvatar || '#4285F4' }]}>
                <Text style={styles.avatarTexto}>
                {item.nombreCompleto?.charAt(0).toUpperCase()}
                </Text>
            </View>
            
            <View style={styles.info}>
                
                <Text style={styles.nombre}>{item.nombreCompleto}</Text>
                <Text style={styles.campo}>📧 {item.email}</Text>
                <Text style={styles.campo}>📱 {item.telefono}</Text>
                <Text style={styles.campo}>🪪 {item.identificacion}</Text>
            </View>
            </View>
        )}
        />
    </SafeAreaView>
    );
}
//estilos para la pantalla de usuarios
const styles = StyleSheet.create({
    //container es el estilo principal que envuelve toda la pantalla
    container: { flex: 1, backgroundColor: '#f0f0f0', padding: 16 },
    //se usa para centrar el contenido en la pantalla, tanto para la carga como para el error
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    //estilo para el título principal de la pantalla
    titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
    //estilo para cada tarjeta de usuario en la lista
    card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14,
    marginBottom: 12, flexDirection: 'row', alignItems: 'center',
    elevation: 3,
    },
    //estilo para el avatar de cada usuario
    avatar: {
    width: 50, height: 50, borderRadius: 25,
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
    },
    //estilo para el texto dentro del avatar, que muestra la inicial del nombre
    avatarTexto: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
    info: { flex: 1 },
    //estilo para el nombre completo del usuario
    nombre: { fontSize: 16, fontWeight: 'bold', color: '#222', marginBottom: 4 },
    //estilo para los campos de información del usuario (email, teléfono, identificación)
    campo: { fontSize: 13, color: '#555', marginBottom: 2 },
    //estilo para mostrar el mensaje de error en caso de que la llamada al API falle
    error: { color: 'red', fontSize: 16 },
});