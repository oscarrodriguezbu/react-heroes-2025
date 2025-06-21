import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { AuthContext } from '../../src/auth';
import { PublicRoute } from '../../src/router/PublicRoute';


describe('Pruebas en <PublicRoute />', () => {

    test('debe de mostrar el children si no está autenticado', () => {
        const contextValue = {
            logged: false
        }

        //es necesario el contextValue para poder renderizar con exito el PublicRoute

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Ruta pública')).toBeTruthy(); //esto solo se muestra si no esta autenticado
    });


    test('debe de navegar si está autenticado', () => { //el caso contrario
        const contextValue = {
            logged: true,
            user: {
                name: 'Strider',
                id: 'ABC123'
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                {/* MemoryRouter: es para ayudar a probar el BrowserRouter */}
                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Ruta pública</h1>
                            </PublicRoute>
                        } />
                        <Route path='marvel' element={<h1>Página Marvel</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Página Marvel')).toBeTruthy();
    })

});