import { useNavigation, useRouter } from 'expo-router';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

const HomeScreen = () => {

    const router = useRouter();
    const navigation = useNavigation()

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button

                mode="contained-tonal"
                onPress={() => {
                    router.push('/materia-prima');
                }}
                style={{ marginTop: 20 }}
            >
                <Text style={{ color: 'white' }}>Materia Prima</Text>
            </Button>
            <Button

                mode="contained-tonal"
                onPress={() => {
                    router.push('/pedidos');
                }}
                style={{ marginTop: 20 }}
            >
                <Text style={{ color: 'white' }}>Pedidos</Text>
            </Button>
            <Button

                mode="contained-tonal"
                onPress={() => {
                    router.push('/calendario');
                }}
                style={{ marginTop: 20 }}
            >
                <Text style={{ color: 'white' }}>Calendario</Text>
            </Button>
        </View>
    );
};


export default HomeScreen;