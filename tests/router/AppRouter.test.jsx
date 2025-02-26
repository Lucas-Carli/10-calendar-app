import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/calendar";

jest.mock('../../src/hooks/useAuthStore');

jest.mock('../../src/calendar', () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}));


describe('Tests en <AppRouter />', () => {

    const mockCheckAuthToken = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('must display the loading screen and call the checkAuthToken', () => {

        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        });

        render(<AppRouter />);
        expect(screen.getByText('Loading...')).toBeTruthy()
        expect(mockCheckAuthToken).toHaveBeenCalled();

    });

    test('must display login in case of not being authenticated', () => {

        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        const { container } = render(
            <MemoryRouter initialEntries={['/auth2/something/otherthing']} future={{ v7_startTransition: true }}>
                <AppRouter />
            </MemoryRouter>
        );

        // screen.debug();
        expect(screen.getByText('Entry')).toBeTruthy();
        expect(container).toMatchSnapshot();

    });

    test('must show the calendar if we are authenticated', () => {
        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        render(
            <MemoryRouter initialEntries={['/auth2/something/otherthing']} future={{ v7_startTransition: true }}>
                <AppRouter />
            </MemoryRouter>
        );

        expect(screen.getByText('CalendarPage')).toBeTruthy();

    })

});