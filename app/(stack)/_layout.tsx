import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';


const StackLayout = () => {

    const theme = useTheme();
    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                // contentStyle: {
                //     backgroundColor: "black"
                // }
            }}
        >

            <Stack.Screen
                name="home/index"
                options={{
                    headerShown: false,
                    // title: 'Inicio',
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                    headerTintColor: theme.colors.onPrimary,
                }}
            />
            <Stack.Screen
                name="materia-prima/index"
                options={{
                    title: 'Materia Prima',
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                    headerTintColor: theme.colors.onPrimary,
                }}
            />

            <Stack.Screen
                name="pedidos/index"
                options={{
                    title: 'Pedidos',
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                    headerTintColor: theme.colors.onPrimary,
                }}
            />
            <Stack.Screen
                name="calendario/index"
                options={{
                    title: 'Calendario',
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                    headerTintColor: theme.colors.onPrimary,
                }}
            />
        </Stack>

    );
};

export default StackLayout;