import { Action, createReducer, on } from "@ngrx/store";
import { TimeSlot } from "../models/time-slot.model";
import * as timeSlotActions from '../actions/time-slot.actions';

export interface TimeSlotState {
  loading: boolean;
  loaded: boolean;
  list: TimeSlot[];
  selected: TimeSlot;
  error: Error;  
}

const initialState: TimeSlotState = {
  loading: false,
  loaded: false,
  list: [],
  selected: {} as TimeSlot,
  error: {} as Error
}

const _timeSlotReducer = createReducer(
  initialState,
  on(timeSlotActions.loadTimeSlots,
    (state) => ({
      ...state,
      loading: true
    })),
  on(timeSlotActions.loadTimeSlotsSuccess,
    (state, { payload }) => ({
      ...state,
      loading: false,
      loaded: true,
      list: payload
    })),
  on(timeSlotActions.loadTimeSlotsFailure,
    (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload
    })),
  on(timeSlotActions.timeSlotSelected,
    (state, { payload }) => ({
      ...state,
      selected: payload
    }))
);

export function timeSlotReducer(state = initialState, action: Action) {
  return _timeSlotReducer(state, action);
}

export const getLoading = (state: TimeSlotState) => state.loading;
export const getLoaded = (state: TimeSlotState) => state.loaded;
export const all = (state: TimeSlotState) => state.list;
export const getError = (state: TimeSlotState) => state.error;
export const getTimeSlotsByDay = (state: TimeSlotState, day: number) => {
  if (state && state.list) {
    return state.list.filter(timeSlot => timeSlot.dayOfWeek === day);
  }

  return [];
};

export const getSelected = (state: TimeSlotState) => state.selected;