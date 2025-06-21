import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';

describe('Pruebas en <AppRouter />', () => {

    test('debe de mostrar el login si no está autenticado', () => {
        const contextValue = {
            logged: false,
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getAllByText('Login').length).toBe(2); //si no esta autenticado siempre se redirige al login
        //hay dos login, un boton y un h1, lo importante es evaluar lo que sea que tenga el login y sea unico 
    });

    test('debe de mostrar el componente de Marvel si está autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Juan Carlos'
            }
        }

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);
    });

});