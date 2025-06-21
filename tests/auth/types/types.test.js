import { types } from "../../../src/auth/types/types";


describe('Pruebas en "Types.js"', () => {
    
    test('debe de regresar estos types', () => {
        //es para asegurarnos de que no cambie el estado de los tipos
        expect(types).toEqual({ 
            login:  '[Auth] Login',
            logout: '[Auth] Logout',
        })
        
    });

});