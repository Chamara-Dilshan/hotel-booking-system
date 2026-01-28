// Booking Store - Hotel Booking System
// Zustand store for booking state management

import { create } from 'zustand';

export const useBookingStore = create((set, get) => ({
  // State
  currentBooking: null,
  selectedHotel: null,
  checkInDate: null,
  checkOutDate: null,
  totalRooms: 1,
  totalDays: 1,
  totalAmount: 0,

  // Actions
  setCurrentBooking: (booking) => set({ currentBooking: booking }),

  setSelectedHotel: (hotel) => set({ selectedHotel: hotel }),

  setDates: (checkIn, checkOut) => {
    const days = checkIn && checkOut
      ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
      : 1;
    set({
      checkInDate: checkIn,
      checkOutDate: checkOut,
      totalDays: days > 0 ? days : 1,
    });
  },

  setTotalRooms: (rooms) => set({ totalRooms: rooms }),

  setTotalAmount: (amount) => set({ totalAmount: amount }),

  calculateTotal: () => {
    const state = get();
    if (state.selectedHotel?.pricePerDay) {
      const total = state.selectedHotel.pricePerDay * state.totalRooms * state.totalDays;
      set({ totalAmount: total });
      return total;
    }
    return 0;
  },

  clearBooking: () => set({
    currentBooking: null,
    selectedHotel: null,
    checkInDate: null,
    checkOutDate: null,
    totalRooms: 1,
    totalDays: 1,
    totalAmount: 0,
  }),

  // Getters
  getBookingDetails: () => ({
    hotel: get().selectedHotel,
    checkIn: get().checkInDate,
    checkOut: get().checkOutDate,
    rooms: get().totalRooms,
    days: get().totalDays,
    amount: get().totalAmount,
  }),
}));

export default useBookingStore;
