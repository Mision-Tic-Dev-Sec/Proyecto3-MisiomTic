import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// realizar un formulario que le pida al usuario su edad y muestre un mensaje
// que diga si el usuario es mayor de edad o no

const productosBackend = [
  {
    idProducto: 'Corolla',
    nombreProducto: 'Toyota',
    precio: 2014,
  },
  {
    idProducto: 'Corolla',
    nombreProducto: 'Toyota',
    precio: 2014,
  },
  {
    idProducto: 'Corolla',
    nombreProducto: 'Toyota',
    precio: 2014,
  },
  {
    idProducto: 'Corolla',
    nombreProducto: 'Toyota',
    precio: 2014,
  },
  {
    idProducto: 'Corolla',
    nombreProducto: 'Toyota',
    precio: 2014,
  },
  {
    idProducto: 'Corolla',
    nombreProducto: 'Toyota',
    precio: 2014,
  },
];

const Productos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [productos, setProductos] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Crear Nuevo producto');
  const [colorBoton, setColorBoton] = useState('indigo');

  useEffect(() => {
    //obtener lista de vehículos desde el backend
    setProductos(productosBackend);
  }, []);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Crear Nuevo producto');
      setColorBoton('indigo');
    } else {
      setTextoBoton('Mostrar Todos los productos');
      setColorBoton('blue');
    }
  }, [mostrarTabla]);
  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      <div className='flex flex-col'>
        <h2 className='text-3xl font-extrabold text-gray-900'>
          Página de administración de productos
        </h2>
        <button
          onClick={() => {
            setMostrarTabla(!mostrarTabla);
          }}
          className={`text-white bg-${colorBoton}-500 p-3 rounded-lg m-3 w-48 self-center`}
        >
          {textoBoton}
        </button>
      </div>
      {mostrarTabla ? (
        <TablaProductos listaProductos={productos} />
      ) : (
        <FormularioCreacionProductos
          setMostrarTabla={setMostrarTabla}
          listaProductos={productos}
          setProductos={setProductos}
        />
      )}
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  );
};

const TablaProductos = ({ listaProductos }) => {
  useEffect(() => {
    console.log('este es el listado de productos en el componente de tabla', listaProductos);
  }, [listaProductos]);
  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Todos los productos</h2>
      <table className = 'border border-gray-200'>
        <thead className = 'border border-gray-200'>
          <tr>
            <th align="center" className = 'p-2'>Id del producto</th>
            <th align="center" className = 'p-2'>Descripción del producto</th>
            <th align="center" className = 'p-2'>Precio del producto</th>
          </tr>
        </thead>
        <tbody>
          {listaProductos.map((producto) => {
            return (
              <tr>
                <td align="center" className = 'p-2'>{producto.idProducto}</td>
                <td align="center" className = 'p-2'>{producto.nombreProducto}</td>
                <td align="center" className = 'p-2'>{producto.precio}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const FormularioCreacionProductos = ({ setMostrarTabla, listaProductos, setProductos }) => {
  const form = useRef(null);

  const submitForm = (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);
    
    const nuevoProducto = {};
    fd.forEach((value, key) => {
      nuevoProducto[key] = value;
    });

    setMostrarTabla(true);
    setProductos([...listaProductos, nuevoProducto]);
    // identificar el caso de éxito y mostrar un toast de éxito
    toast.success('Vehículo agregado con éxito');
    // identificar el caso de error y mostrar un toast de error
    // toast.error('Error creando un vehículo');
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Crear nuevo producto</h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
        <label className='flex flex-col' htmlFor='idProducto'>
          Id del producto
          <input
            name='idProducto'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            placeholder='001'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='nombreProducto'>
          Descripción del producto
          <input
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Chocolate'
            name='nombreProducto'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='precio'>
          Precio del producto
          <input
            name='precio'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            min={50}
            placeholder='15000'
            required
          />
        </label>

        <button
          type='submit'
          className='col-span-2 bg-blue-600 p-2 rounded-full shadow-md transform hover:scale-110 text-white'
        >
          Guardar producto
        </button>
      </form>
    </div>
  );
};

export default Productos;
