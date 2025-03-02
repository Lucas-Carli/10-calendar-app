import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithActiveEvent, calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

describe('Tests in calendarSlice', () => {

    test('should return to the default state', () => {
        const state = calendarSlice.getInitialState();
        expect(state).toEqual(initialState);
    });

    test('onSetActiveEvent must activate the event', () => {

        const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));
        expect(state.activeEvent).toEqual(events[0]);
    });

    test('onAddNewEvent should add the event ', () => {

        const newEvent = {
            id: '3',
            start: new Date('2020-10-21 13:00:00'),
            end: new Date('2020-10-21 15:00:00'),
            title: 'Event of the day',
            notes: 'Notes about event'
        }

        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));
        expect(state.events).toEqual([...events, newEvent]);

    });

    test('onUpdateEvent should update the event ', () => {

        const updatedEvent = {
            id: '1',
            start: new Date('2020-10-21 13:00:00'),
            end: new Date('2022-10-21 15:00:00'),
            title: "Event of the day updated",
            notes: 'Notes about event'
        }

        const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent));
        // expect(state.events).toEqual([...events, updatedEvent]);
        expect(state.events).toContain(updatedEvent);

    });

    test('onDeleteEvent should delete the active event', () => {

        const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent());
        expect(state.activeEvent).toBe(null);
        expect(state.events).not.toContain(events[0]);

    });

    test('onLoadEvents should set the events', () => {

        const state = calendarSlice.reducer(initialState, onLoadEvents(events));
        expect(state.isLoadingEvents).toBeFalsy();
        expect(state.events).toEqual(events);

        const newState = calendarSlice.reducer(state, onLoadEvents(events));
        expect(newState.events.length).toBe(events.length)
    });

    test('onLogoutCalendar should clear the state', () => {

        const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar());
        expect(state).toEqual(initialState);

    });



});