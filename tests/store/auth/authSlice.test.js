import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe('Test in authSlice', () => {

    test('must return to the initial state', () => {
        expect(authSlice.getInitialState()).toEqual(initialState);
    });

    test('must perform a login ', () => {
        const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
        expect(state).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        });
    });

    test('must perform a logout ', () => {
        const state = authSlice.reducer(initialState, onLogout());
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        });
    });

    test('must perform a logout with errorMessage ', () => {
        const errorMessage = 'Invalid credentials'
        const state = authSlice.reducer(initialState, onLogout(errorMessage));
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage
        });
    });

    test('must clear the error message', () => {
        const errorMessage = "Invalid credentials"
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
        const newState = authSlice.reducer(state, clearErrorMessage());
        expect(newState.errorMessage).toBe(undefined);
    })



});