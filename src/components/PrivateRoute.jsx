import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ReactLoading from 'react-loading';
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchAuth0Token = async () => {
      // si se quieren hacer validaciones con el token:
      // if (localStorage.getItem('token')) {
      //   // validar fecha de expiracion del token
      // } else {
      //   // pedir token
      // }
      const accessToken = await getAccessTokenSilently({
        audience: `api-autenticacion-tienda-mintic`,
      });
      localStorage.setItem('token', accessToken);
    };
    if (isAuthenticated) {
      fetchAuth0Token();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) return <ReactLoading type='cylon' color='#abc123' height={667} width={375} />;

  if (!isAuthenticated) {
    return loginWithRedirect();
  }

  return <>{children}</>;
};

//   return isAuthenticated ? (
//     <>{children}</>
//   ) : (
//     <div>
//       <div className='text-9xl text-red-500 '>No estas autorizado para ver este sitio.</div>
//       <Link to='/'>
//         <span className='text-blue-500 font-bold'>Llévame al home</span>
//       </Link>
//     </div>
//   );
// };

export default PrivateRoute;
















/* import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth0();
    console.log(isAuthenticated);
    if (isLoading) {
      return <div>Loading ...</div>;
    }
  
    return isAuthenticated ? (
      <> {children} </>
    ) : (
      <div>
        <div className='text-9xl text-red-800'>No estas autorizado.</div> 
        
        <Link to='/' className='text-6xl text-blue-800 hover:underline'>Por favor registrate</Link>
      </div>
    );
  };

export default PrivateRoute */
