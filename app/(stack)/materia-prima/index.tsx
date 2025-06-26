import { RepositorioDeMateriasPrimasEnMemoria } from '@/adaptadores/repositorio_de_materias_primas_en_memoria';
import React from 'react';
import { DataTable, Surface } from 'react-native-paper';

const MateriaPrima = () => {


    const [page, setPage] = React.useState<number>(0);
    const [numberOfItemsPerPageList] = React.useState(6);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList
    );

    const materiasPrimasRepo = new RepositorioDeMateriasPrimasEnMemoria();


    const [materiasPrimas, setMateriasPrimas] = React.useState<any[]>([]);
    React.useEffect(() => {
        const cargarMateriasPrimas = async () => {
            const materiasPrimasData = await materiasPrimasRepo.obtenerTodasLasMateriasPrimas();
            setMateriasPrimas(materiasPrimasData);
        };
        cargarMateriasPrimas();
    }, []);


    const items = materiasPrimas.map((mp) => ({
        key: mp.id.toString(),
        descripcion: mp.descripcion,
        cantidad: mp.cantidadDisponible,
    }));



    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <Surface style={{ flex: 1, padding: 16 }}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Materia Prima</DataTable.Title>
                    <DataTable.Title numeric>Cantidad</DataTable.Title>
                </DataTable.Header>

                {items.slice(from, to).map((item) => (
                    <DataTable.Row key={item.key}>
                        <DataTable.Cell>{item.descripcion}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.cantidad}</DataTable.Cell>
                    </DataTable.Row>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(items.length / itemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    label={`${from + 1}-${to} of ${items.length}`}
                    // numberOfItemsPerPageList={numberOfItemsPerPageList}
                    numberOfItemsPerPage={itemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    showFastPaginationControls
                    selectPageDropdownLabel={'Rows per page'}
                />
            </DataTable>
        </Surface>
    );
};


export default MateriaPrima;
