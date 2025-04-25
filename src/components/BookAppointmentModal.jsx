import { useState, useEffect, useMemo, useCallback } from 'react';

const BookAppointmentModal = ({ isOpen, onClose, doctorAvailability, doctorId, onSubmit }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [appointmentMode, setAppointmentMode] = useState('in-person');
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [availableDates, setAvailableDates] = useState([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

    const closeModal = useCallback(() => {
        setIsAnimating(false);
        setTimeout(() => {
            onClose();
            setSelectedDate(null);
            setSelectedTime(null);
        }, 200);
    }, [onClose]);

    const getDaysInMonth = useCallback((year, month) => {
        const date = new Date(year, month, 1);
        const days = [];
        
        const firstDayOfWeek = date.getDay();
        const prevMonthDays = new Date(year, month, 0).getDate();
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            days.push({ day: prevMonthDays - i, isCurrentMonth: false });
        }
        
        while (date.getMonth() === month) {
            days.push({ day: date.getDate(), isCurrentMonth: true, date: new Date(date) });
            date.setDate(date.getDate() + 1);
        }
        
        const daysToAdd = 42 - days.length;
        for (let i = 1; i <= daysToAdd; i++) {
            days.push({ day: i, isCurrentMonth: false });
        }
        
        return days;
    }, []);

    const isDateAvailable = useCallback((date) => {
        if (!date) return false;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date < today) return false;
        
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        return doctorAvailability.some(avail => avail.day === dayName);
    }, [doctorAvailability]);

    const generateTimeSlots = useCallback((date) => {
        if (!date) return [];
        
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const availability = doctorAvailability.find(avail => avail.day === dayName);
        
        if (!availability) return [];
        
        const [startHour, startMinute] = availability.start.split(':').map(Number);
        const [endHour, endMinute] = availability.end.split(':').map(Number);
        
        const startTime = new Date(date);
        startTime.setHours(startHour, startMinute, 0, 0);
        
        const endTime = new Date(date);
        endTime.setHours(endHour, endMinute, 0, 0);
        
        const timeSlots = [];
        let currentTime = new Date(startTime);
        
        while (currentTime < endTime) {
            const hours = currentTime.getHours();
            const minutes = currentTime.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;
            const timeString = `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
            
            timeSlots.push(timeString);
            currentTime.setMinutes(currentTime.getMinutes() + 30);
        }
        
        return timeSlots;
    }, [doctorAvailability]);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        }
    }, [isOpen]);

    useEffect(() => {
        const days = getDaysInMonth(currentYear, currentMonth);
        const available = days.filter(day => 
            day.isCurrentMonth && isDateAvailable(day.date)
        );
        setAvailableDates(available);
    }, [currentMonth, currentYear, doctorAvailability, getDaysInMonth, isDateAvailable]);

    useEffect(() => {
        if (selectedDate) {
            const slots = generateTimeSlots(selectedDate);
            setAvailableTimeSlots(slots);
        } else {
            setAvailableTimeSlots([]);
        }
    }, [selectedDate, generateTimeSlots]);

    const handlePrevMonth = useCallback(() => {
        setCurrentMonth(prev => prev === 0 ? 11 : prev - 1);
        setCurrentYear(prev => prev === 0 ? prev - 1 : prev);
    }, []);

    const handleNextMonth = useCallback(() => {
        setCurrentMonth(prev => prev === 11 ? 0 : prev + 1);
        setCurrentYear(prev => prev === 11 ? prev + 1 : prev);
    }, []);

    const monthYearDisplay = useMemo(() => {
        return new Date(currentYear, currentMonth).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
    }, [currentYear, currentMonth]);

    const handleSubmit = useCallback(() => {
        if (selectedDate && selectedTime) {
            onSubmit({
                doctorId,
                date: selectedDate,
                time: selectedTime,
                mode: appointmentMode
            });
        }
    }, [selectedDate, selectedTime, doctorId, appointmentMode, onSubmit]);

    const calendarDays = useMemo(() => {
        return getDaysInMonth(currentYear, currentMonth).map((dayObj, index) => {
            const isAvailable = dayObj.isCurrentMonth && isDateAvailable(dayObj.date);
            const isSelected = selectedDate && dayObj.date && 
                              selectedDate.toDateString() === dayObj.date.toDateString();
            const isToday = dayObj.date && new Date().toDateString() === dayObj.date.toDateString();

            return (
                <button
                    key={index}
                    onClick={() => isAvailable && setSelectedDate(dayObj.date)}
                    disabled={!isAvailable}
                    className={`p-2 rounded-full
                        ${isSelected ? 'bg-blue-500 text-white' : ''}
                        ${isAvailable ? 'hover:bg-gray-100' : 'text-gray-300'}
                        ${!dayObj.isCurrentMonth ? 'text-gray-300' : ''}
                        ${isToday ? 'border border-blue-500' : ''}
                    `}
                >
                    {dayObj.day}
                </button>
            );
        });
    }, [currentYear, currentMonth, getDaysInMonth, isDateAvailable, selectedDate]);

    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 bg-gray-600/50 flex items-center justify-center p-4 z-50 transition-opacity duration-200 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`bg-white rounded-lg shadow-xl w-full max-w-2xl transform transition-all duration-200 ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <div 
            className={`bg-white rounded-lg shadow-xl w-full max-w-2xl transform transition-all duration-200 ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
          >
            {/* Modal Header */}
            <div className="border-b p-4">
              <h2 className="text-xl font-semibold">Book Appointment</h2>
            </div>

            {/* Modal Content */}
            <div className="p-4 md:flex md:space-x-6">
              {/* Left Column - Date Picker */}
              <div className="md:w-1/2 mb-6 md:mb-0">
                <h3 className="font-medium mb-2">Select Date</h3>
                
                {/* Month Navigation */}
                <div className="flex justify-between items-center mb-4">
                  <button onClick={handlePrevMonth} className="text-gray-600 hover:text-gray-800">
                    &lt;
                  </button>
                  <span className="font-medium">{monthYearDisplay}</span>
                  <button onClick={handleNextMonth} className="text-gray-600 hover:text-gray-800">
                    &gt;
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="py-1 text-gray-500 font-medium">{day}</div>
                  ))}

                  {getDaysInMonth(currentYear, currentMonth).map((dayObj, index) => {
                    const isAvailable = dayObj.isCurrentMonth && isDateAvailable(dayObj.date);
                    const isSelected = selectedDate && dayObj.date && 
                                      selectedDate.toDateString() === dayObj.date.toDateString();
                    const isToday = dayObj.date && new Date().toDateString() === dayObj.date.toDateString();

                    return (
                      <button
                        key={index}
                        onClick={() => isAvailable && setSelectedDate(dayObj.date)}
                        disabled={!isAvailable}
                        className={`p-2 rounded-full
                          ${isSelected ? 'bg-blue-500 text-white' : ''}
                          ${isAvailable ? 'hover:bg-gray-100' : 'text-gray-300'}
                          ${!dayObj.isCurrentMonth ? 'text-gray-300' : ''}
                          ${isToday ? 'border border-blue-500' : ''}
                        `}
                      >
                        {dayObj.day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column - Time Slots */}
              <div className="md:w-1/2">
                <h3 className="font-medium mb-2">Select Time Slot</h3>
                {selectedDate ? (
                  <div className="grid grid-cols-3 gap-2">
                    {availableTimeSlots.map((time, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 border rounded-md text-sm text-center
                          ${selectedTime === time ? 'bg-blue-500 text-white border-blue-500' : 'hover:bg-gray-50'}
                        `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm p-4 border rounded-md">
                    Please select a date to see available time slots
                  </div>
                )}
              </div>
            </div>

             {/* Appointment mode selection */}
            <div className="p-4 mb-4">
                <h3 className="font-medium mb-2">Appointment Type</h3>
                <div className="flex space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            className="form-radio"
                            name="appointmentMode"
                            value="in-person"
                            checked={appointmentMode === 'en cabinet'}
                            onChange={() => setAppointmentMode('en cabinet')}
                        />
                        <span className="ml-2">In-Person</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            className="form-radio"
                            name="appointmentMode"
                            value="online"
                            checked={appointmentMode === 'en ligne'}
                            onChange={() => setAppointmentMode('en ligne')}
                        />
                        <span className="ml-2">Online</span>
                    </label>
                </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t p-4 flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              <button
               onClick={handleSubmit}
                disabled={!selectedDate || !selectedTime}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              >
                Submit
              </button>
            </div>
          </div>
            </div>
        </div>
    );
};

export default BookAppointmentModal;