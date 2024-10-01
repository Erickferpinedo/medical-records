import React, { useEffect, useState } from 'react';
// Importar useNavigate solo si planeas usarlo

const Appointments = ({ userRole }) => {
  const [appointments, setAppointments] = useState([]);
  const [availableSlots] = useState(['9:00 AM', '10:00 AM', '11:00 AM']);
  const [newAppointment, setNewAppointment] = useState('');

  const fetchAppointments = () => {
    setAppointments([
      { id: 1, time: '9:00 AM', status: 'busy' },
      { id: 2, time: '10:00 AM', status: 'available' },
      { id: 3, time: '11:00 AM', status: 'busy' },
      { id: 4, time: '12:00 PM', status: 'available' },
    ]);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleAddAppointment = (slot) => {
    const isAlreadyBooked = appointments.some(appt => appt.time === slot);
    if (isAlreadyBooked) {
      alert('This time slot is already booked. Please choose another one.');
      return;
    }
    setAppointments((prev) => [...prev, { id: Date.now(), time: slot, status: 'busy' }]);
    // Aquí puedes usar navigate si es necesario
  };

  const handleDeleteAppointment = (id) => {
    const appointment = appointments.find((appt) => appt.id === id);
    if (!appointment) return;

    const appointmentTime = appointment.time;

    if (window.confirm(`Are you sure you want to delete the appointment at ${appointmentTime}? You must cancel at least 24 hours in advance.`)) {
      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    }
  };

  const handlePostponeAppointment = (id) => {
    alert(`Postponing appointment with ID: ${id}`);
  };

  return (
    <div className="p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">{userRole === 'medic' ? 'Medic Appointments' : 'Your Appointments'}</h2>

      {userRole === 'patient' && (
        <>
          <h3 className="text-lg mb-2">Available Slots</h3>
          <ul className="mb-4">
            {availableSlots.map((slot, index) => (
              <li key={index} className="border p-2 mb-1 flex justify-between items-center">
                {slot}
                <button onClick={() => handleAddAppointment(slot)} className="ml-2 text-blue-500">Book</button>
              </li>
            ))}
          </ul>
          <h3 className="text-lg mb-2">Your Appointments</h3>
          <ul>
            {appointments.map((appt) => (
              <li key={appt.id} className="border p-2 mb-1 flex justify-between items-center">
                {appt.time}
                <button onClick={() => handleDeleteAppointment(appt.id)} className="text-red-500">Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}

      {userRole === 'medic' && (
        <>
          <h3 className="text-lg mb-2">All Appointments</h3>
          <ul>
            {appointments.map((appt) => (
              <li key={appt.id} className={`border p-2 mb-1 ${appt.status === 'busy' ? 'bg-red-200' : 'bg-green-200'}`}>
                {appt.time} - {appt.status}
                {appt.status === 'busy' && (
                  <div>
                    <button onClick={() => handlePostponeAppointment(appt.id)} className="text-blue-500">Postpone</button>
                    <button onClick={() => handleDeleteAppointment(appt.id)} className="text-red-500">Reject</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      {userRole === 'patient' && (
        <div>
          <h3 className="text-lg mb-2">Schedule New Appointment</h3>
          <input
            type="text"
            value={newAppointment}
            onChange={(e) => setNewAppointment(e.target.value)}
            placeholder="Enter time (e.g., 3:00 PM)"
            className="border p-2 w-full mb-2"
          />
          <button onClick={() => handleAddAppointment(newAppointment)} className="bg-green-500 text-white px-4 py-2 rounded">Add Appointment</button>
        </div>
      )}
    </div>
  );
};

export default Appointments;
