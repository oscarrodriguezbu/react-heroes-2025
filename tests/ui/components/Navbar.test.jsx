import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../src/auth/context/AuthContext';
import { Navbar } from '../../../src/ui/components/Navbar';

const mockedUseNavigate = jest.fn(); //para el mock del useNavigate

/* 
    mock del react-router-dom'
*/
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), //se optiente todo lo rel react-router-dom
    useNavigate: () => mockedUseNavigate, // es lo que necesito para la prueba
}));

describe('Pruebas en <Navbar />', () => {
    const contextValue = {
        logged: true,
        user: {
            name: 'Juan Carlos'
        },
        logout: jest.fn()
    }

    beforeEach(() => jest.clearAllMocks());//limpieza de mocks

    test('debe de mostrar el nombre del usuario', () => {

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Juan Carlos')).toBeTruthy();

    });

    test('debe de llamar el logout y navigate cuando se hace click en el botón', () => {

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);

        expect(contextValue.logout).toHaveBeenCalled(); //se llamo en el context Value con jest.fn()
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', { "replace": true })

    });

});


