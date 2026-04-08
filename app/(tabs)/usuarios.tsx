import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

// URL base del microservicio UsuariosService (Apunta a la IP local de tu PC)
const BASE_URL = 'http://192.168.1.16:5291';

export default function UsuariosScreen() {
    // Estado para almacenar la lista de usuarios obtenida de la base de datos
    const [datos, setDatos] = useState<any[]>([]);
    // Estado para controlar si la aplicación está esperando una respuesta del servidor
    const [cargando, setCargando] = useState(true);
    // Estado para capturar y mostrar mensajes de error en caso de fallos
    const [error, setError] = useState<string | null>(null);

    // useEffect se ejecuta una sola vez al montar el componente para traer los datos
    useEffect(() => {
        // Realizamos la petición GET al endpoint /user de tu microservicio en .NET
        fetch(`${BASE_URL}/user`)
            .then((res) => {
                // Verificamos si la respuesta del servidor es correcta (status 200-299)
                if (!res.ok) throw new Error('Error en la respuesta del servidor');
                return res.json();
            })
            .then((data) => {
                // Tu API devuelve un objeto con { codigo, descripcion, datos }
                if (data.codigo === 200) {
                    setDatos(data.datos); // Guardamos la lista de usuarios en el estado
                } else {
                    setError(data.descripcion || 'Error desconocido');
                }
                setCargando(false); // Detenemos el indicador de carga
            })
            .catch((err) => {
                // Captura errores de red (como IP incorrecta o servidor apagado)
                setError(err.message);
                setCargando(false);
            });
    }, []); // El array vacío asegura que la carga ocurra solo al abrir la pantalla

    // Interfaz que se muestra mientras los datos están viajando desde el servidor
    if (cargando) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#4285F4" />
                <Text style={{ marginTop: 10 }}>Cargando usuarios...</Text>
            </View>
        );
    }

    // Interfaz de emergencia en caso de que ocurra un error de conexión o de datos
    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>❌ {error}</Text>
            </View>
        );
    }

    // Interfaz principal: Renderiza la lista de usuarios una vez obtenidos con éxito
    return (
        <SafeAreaView style={styles.container}>
            {/* Título principal de la pantalla */}
            <Text style={styles.titulo}>Lista de Usuarios</Text>
            
            <FlatList
                /* FlatList es el componente recomendado para listas, ya que solo renderiza 
                   lo que el usuario ve en pantalla, ahorrando memoria en el celular.
                */
                data={datos}
                // Usamos el ID del usuario como clave única para cada fila
                keyExtractor={(item) => item.usuarioId?.toString() || Math.random().toString()}
                renderItem={({ item }) => (
                    // Cada usuario se muestra dentro de una tarjeta (Card)
                    <View style={styles.card}>
                        {/* Avatar circular con la inicial del nombre */}
                        <View style={[styles.avatar, { backgroundColor: item.colorAvatar || '#4285F4' }]}>
                            <Text style={styles.avatarTexto}>
                                {item.nombreCompleto?.charAt(0).toUpperCase() || '?'}
                            </Text>
                        </View>
                        
                        {/* Contenedor para la información textual del usuario */}
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

// Configuración de los estilos visuales (CSS-in-JS)
const styles = StyleSheet.create({
    // Estilo para el contenedor principal que ocupa toda la pantalla
    container: { flex: 1, backgroundColor: '#f0f0f0', padding: 16 },
    // Centra el contenido (usado para ActivityIndicator y Errores)
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    // Estilo para el encabezado de la lista
    titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center', color: '#333' },
    // Diseño de la tarjeta de cada usuario
    card: {
        backgroundColor: '#fff', 
        borderRadius: 12, 
        padding: 14,
        marginBottom: 12, 
        flexDirection: 'row', 
        alignItems: 'center',
        // Sombra para Android
        elevation: 3,
        // Sombra para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    // Estilo para el círculo del avatar
    avatar: {
        width: 50, height: 50, borderRadius: 25,
        justifyContent: 'center', alignItems: 'center', marginRight: 12,
    },
    // Texto blanco y centrado dentro del avatar
    avatarTexto: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
    // Contenedor de la info que crece para ocupar el espacio restante
    info: { flex: 1 },
    // Resalta el nombre del usuario
    nombre: { fontSize: 16, fontWeight: 'bold', color: '#222', marginBottom: 4 },
    // Estilo para los datos secundarios (email, tel, etc.)
    campo: { fontSize: 13, color: '#555', marginBottom: 2 },
    // Estilo visual para los mensajes de error
    error: { color: 'red', fontSize: 16, textAlign: 'center' },
});