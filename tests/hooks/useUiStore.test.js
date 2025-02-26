import { act, renderHook } from "@testing-library/react";
import { useUiStore } from "../../src/hooks";
import { Provider } from "react-redux";
import { onOpenDateModal, store, uiSlice } from "../../src/store";
import { configureStore } from "@reduxjs/toolkit";

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}

describe('Tests in useUiStore', () => {

    test('should return the default values', () => {

        const mockStore = getMockStore({ isDateModalOpen: false });
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        expect(result.current).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function),
        });
    });

    test('openDateModal must place true in the isDateModalOpen', () => {

        const mockStore = getMockStore({ isDateModalOpen: false });
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { isDateModalOpen, openDateModal } = result.current;

        act(() => {
            openDateModal();
        });

        expect(result.current.isDateModalOpen).toBeTruthy();

    });

    test('closeDateModal must place false in the isDateModalOpen', () => {

        const mockStore = getMockStore({ isDateModalOpen: false });
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        act(() => {
            result.current.closeDateModal();
        });

    });

    test('toggleDateModal must change state respectively', () => {

        const mockStore = getMockStore({ isDateModalOpen: true });
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        act(() => {
            result.current.toggleDateModal();
        });

        expect(result.current.isDateModalOpen).toBeFalsy();
        
        act(() => {
            result.current.toggleDateModal();
        });
        
        expect(result.current.isDateModalOpen).toBeTruthy();

    });


});    