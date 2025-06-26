import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Card, Divider, Surface, Text, useTheme } from 'react-native-paper';

import { RepositorioDePedidosEnMemoria } from '@/adaptadores/repositorio_de_pedidos_en_memoria';
import type { Pedido } from '@/dominio/entidades/pedido';

const CalendarioPedidos: React.FC = () => {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const theme = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            const repo = new RepositorioDePedidosEnMemoria();
            const data = await repo.obtenerTodosLosPedidos();
            setPedidos(data);
            console.log(data);
        };

        fetchData();
    }, []);

    const renderPedido = ({ item }: { item: Pedido }) => (
        <PedidoItem pedido={item} />
    );

    return (
        <Surface style={[styles.surface, { backgroundColor: theme.colors.background }]}>
            <FlatList
                data={pedidos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderPedido}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <Text variant="bodyMedium" style={styles.emptyText}>
                        No hay pedidos para mostrar.
                    </Text>
                }
            />
            <Text variant="titleMedium" style={styles.totalText}>
                Total de pedidos: {pedidos.length}
            </Text>
        </Surface>
    );
};

interface PedidoItemProps {
    pedido: Pedido;
}

const PedidoItem: React.FC<PedidoItemProps> = ({ pedido }) => {
    const theme = useTheme();
    const fechaFormateada = format(new Date(pedido.fecha), 'dd/MM/yyyy HH:mm');

    return (
        <Card style={[styles.card, { backgroundColor: theme.colors.surfaceVariant }]} elevation={2}>
            <Card.Title
                title={pedido.cliente.nombre}
                subtitle={pedido.cliente.direccion}
            />
            <Card.Content>
                <Text variant="labelSmall" style={styles.entrega}>
                    Entrega: {fechaFormateada}
                </Text>

                <Divider style={[styles.divider, { backgroundColor: theme.colors.onSurface }]} />

                <Text variant="labelMedium">Productos:</Text>
                {pedido.detalleProductos.map((p, index) => (
                    <Text key={index} variant="bodySmall">
                        • {p.cantidad} x {p.producto.nombre}
                    </Text>
                ))}
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    surface: {
        flex: 1,
    },
    listContainer: {
        padding: 16,
    },
    card: {
        marginBottom: 16,
    },
    entrega: {
        marginBottom: 8,
    },
    divider: {
        marginBottom: 8,
    },
    totalText: {
        marginTop: 16,
        marginBottom: 32,
        textAlign: 'center',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 32,
    },
});

export default CalendarioPedidos;
