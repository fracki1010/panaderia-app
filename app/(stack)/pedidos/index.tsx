
import { RepositorioDeClientesEnMemoria } from '@/adaptadores/repositorio_de_clientes_en_memoria';
import { RepositorioDeMateriasPrimasEnMemoria } from '@/adaptadores/repositorio_de_materias_primas_en_memoria';
import { RepositorioDePedidosEnMemoria } from '@/adaptadores/repositorio_de_pedidos_en_memoria';
import { RepositorioDeProductosEnMemoria } from '@/adaptadores/repositorio_de_productos_en_memoria';
import { MateriaPrima } from '@/dominio/entidades/materia_prima';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Card, Divider, IconButton, Menu, Surface, Text } from 'react-native-paper';


type Cliente = {
    id: number;
    nombre: string;
    direccion: string;
};

type Producto = {
    id: number,
    nombre: string,
    precio: number,
    materiasPrimasRequeridas: { materiaPrima: MateriaPrima; cantidad: number }[]
};
type ProductoDetalle = { producto: Producto; cantidad: number };

// const navigation = useNavigation();
const router = useRouter();

const clienteRepo = new RepositorioDeClientesEnMemoria();
const materiasPrimasRepo = new RepositorioDeMateriasPrimasEnMemoria();
const productoRepo = new RepositorioDeProductosEnMemoria(materiasPrimasRepo);
// const productoRepo = new RepositorioDeProductosEnMemoria();

const pedidoRepo = new RepositorioDePedidosEnMemoria();

const Pedidos = () => {



    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);



    const [fechaEntrega, setFechaEntrega] = useState(new Date(Date.now() + 86400000)); // +1 día
    const [mostrarFecha, setMostrarFecha] = useState(false);

    const [productosPedidos, setProductosPedidos] = useState<ProductoDetalle[]>([]);
    const [menuAbiertos, setMenuAbiertos] = useState<boolean[]>([]);




    useEffect(() => {
        const cargarDatos = async () => {
            const clientesData = await clienteRepo.obtenerTodosLosClientes();
            const productosData = await productoRepo.obtenerTodosLosProductos();

            // const clientesMapped = clientesData.map((c: any) => ({ ...c, id: String(c.id) }));
            setClientes(clientesData);
            setProductos(productosData);
            if (clientesData.length > 0) setClienteSeleccionado(clientesData[0]);
        };

        cargarDatos();
    }, []);


    const agregarProducto = () => {
        if (productos.length === 0) return;
        setProductosPedidos([...productosPedidos, { producto: productos[0], cantidad: 1 }]);
        setMenuAbiertos([...menuAbiertos, false]);
    };

    const eliminarProducto = (index: number) => {
        const nuevos = [...productosPedidos];
        nuevos.splice(index, 1);
        setProductosPedidos(nuevos);
        setMenuAbiertos((prev) => prev.filter((_, i) => i !== index));
    };

    const cambiarProducto = (index: number, nuevoProducto: Producto) => {
        const nuevos = [...productosPedidos];
        nuevos[index].producto = nuevoProducto;
        setProductosPedidos(nuevos);
    };

    const cambiarCantidad = (index: number, delta: number) => {
        const nuevos = [...productosPedidos];
        nuevos[index].cantidad = Math.max(1, nuevos[index].cantidad + delta);
        setProductosPedidos(nuevos);
    };

    const crearPedido = () => {
        // Guardar el pedido
        console.log('Pedido creado:', {
            cliente: clienteSeleccionado,
            fechaEntrega,
            productos: productosPedidos,
        });
        // Crear el pedido en el repositorio
        if (!clienteSeleccionado) {
            pedidoRepo.agregarPedido({
                id: Date.now(), // o usa un generador de IDs adecuado
                cliente: clienteSeleccionado || { id: 0, nombre: 'Desconocido', direccion: 'Desconocida' },
                fecha: fechaEntrega,
                detalleProductos: productosPedidos,
            });
        }

        router.back();

    };

    return (
        <Surface style={{ flex: 1 }}>
            <ScrollView style={{ padding: 16 }}>
                <Text variant="titleMedium">Cliente</Text>
                <Menu
                    visible={menuAbiertos[0] || false}
                    onDismiss={() => setMenuAbiertos([false])}
                    anchor={
                        <Button mode="outlined" onPress={() => setMenuAbiertos([true])}>
                            {clienteSeleccionado?.nombre || 'Seleccionar cliente'}
                        </Button>
                    }>
                    {clientes.map((c) => (
                        <Menu.Item
                            key={c.id}
                            onPress={() => {
                                setClienteSeleccionado(c);
                                setMenuAbiertos([false]);
                            }}
                            title={c.nombre}
                        />
                    ))}
                </Menu>

                <Divider style={{ marginVertical: 16 }} />

                <Text variant="titleMedium">Fecha de entrega</Text>
                <Button mode="outlined" onPress={() => setMostrarFecha(true)}>
                    {fechaEntrega.toLocaleDateString()}
                </Button>
                {mostrarFecha && (
                    <DateTimePicker
                        value={fechaEntrega}
                        mode="date"
                        minimumDate={new Date()}
                        maximumDate={new Date(Date.now() + 365 * 86400000)}
                        onChange={(_, selected) => {
                            setMostrarFecha(false);
                            if (selected) setFechaEntrega(selected);
                        }}
                    />
                )}

                <Divider style={{ marginVertical: 16 }} />

                <Text variant="titleMedium">Productos</Text>
                {productosPedidos.map((detalle, index) => (
                    <Card key={index} style={{ marginBottom: 12 }}>
                        <Card.Content>
                            <Menu
                                visible={menuAbiertos[index + 1] || false}
                                onDismiss={() => setMenuAbiertos((prev) => {
                                    const copy = [...prev];
                                    copy[index + 1] = false;
                                    return copy;
                                })}
                                anchor={
                                    <Button
                                        onPress={() =>
                                            setMenuAbiertos((prev) => {
                                                const copy = [...prev];
                                                copy[index + 1] = true;
                                                return copy;
                                            })
                                        }>
                                        {detalle.producto.nombre}
                                    </Button>
                                }>
                                {productos.map((producto) => (
                                    <Menu.Item
                                        key={producto.id}
                                        onPress={() => {
                                            cambiarProducto(index, producto);
                                            setMenuAbiertos((prev) => {
                                                const copy = [...prev];
                                                copy[index + 1] = false;
                                                return copy;
                                            });
                                        }}
                                        title={producto.nombre}
                                    />
                                ))}
                            </Menu>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                <IconButton
                                    icon="minus"
                                    onPress={() => cambiarCantidad(index, -1)}
                                    disabled={detalle.cantidad <= 1}
                                />
                                <Text>{detalle.cantidad}</Text>
                                <IconButton icon="plus" onPress={() => cambiarCantidad(index, 1)} />
                                <IconButton
                                    icon="delete"
                                    iconColor="red"
                                    onPress={() => eliminarProducto(index)}
                                />
                            </View>
                        </Card.Content>
                    </Card>
                ))}

                <Button icon="plus" mode="contained" onPress={agregarProducto}>
                    Agregar producto
                </Button>

                <Divider style={{ marginVertical: 24 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 6, marginBottom: 70 }}>
                    <Button mode="outlined" onPress={() => router.back()}>
                        Cancelar
                    </Button>
                    <Button
                        mode="contained"
                        disabled={productosPedidos.length === 0 || !clienteSeleccionado}
                        onPress={crearPedido}>
                        Aceptar
                    </Button>
                </View>
            </ScrollView>
        </Surface>
    );
}


export default Pedidos;