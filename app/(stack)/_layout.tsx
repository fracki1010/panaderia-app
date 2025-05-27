import { Stack } from 'expo-router';


const StackLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                contentStyle: {
                    backgroundColor: 'white'
                }
            }}
        >

            <Stack.Screen
                name="home/index"
                options={{
                    headerShown: false,
                    // title: 'Inicio',
                }}
            />
            <Stack.Screen
                name="materia-prima/index"
                options={{
                    title: 'Materia Prima',
                }}
            />

            <Stack.Screen
                name="pedidos/index"
                options={{
                    title: 'Pedidos',
                }}
            />
            <Stack.Screen
                name="calendario/index"
                options={{
                    title: 'Calendario',
                }}
            />
        </Stack>

    );
};

export default StackLayout;