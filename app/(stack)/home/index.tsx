import { useNavigation, useRouter } from 'expo-router';
import { Button, Surface, Text, useTheme } from 'react-native-paper';

const HomeScreen = () => {

    const router = useRouter();
    const navigation = useNavigation()
    const theme = useTheme();

    return (
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <Surface style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button
                // buttonColor={theme.colors.primary}
                // textColor={theme.colors.onPrimary}
                mode="contained-tonal"
                onPress={() => {
                    router.push('/materia-prima');
                }}
                style={{ marginTop: 20 }}
            >
                <Text style={{ color: 'white' }}>Materia Prima</Text>
            </Button>
            <Button
                // buttonColor={theme.colors.primary}
                // textColor={theme.colors.onPrimary}
                mode="contained-tonal"
                onPress={() => {
                    router.push('/pedidos');
                }}
                style={{ marginTop: 20 }}
            >
                <Text style={{ color: 'white' }}>Pedidos</Text>
            </Button>
            <Button
                // buttonColor={theme.colors.primary}
                // textColor={theme.colors.onPrimary}
                mode="contained-tonal"
                onPress={() => {
                    router.push('/calendario');
                }}
                style={{ marginTop: 20 }}
            >
                <Text style={{ color: 'white' }}>Calendario</Text>
            </Button>
        </Surface>
        // </View>
    );
};


export default HomeScreen;