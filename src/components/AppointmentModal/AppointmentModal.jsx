

export default function AppointmentModal({ onClose, psychologist }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment made with ${psychologist}`);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button onClick={onClose}>✖</button>
        <h2>Make an Appointment with {psychologist}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Your Name:
            <input type="text" required />
          </label>
          <label>
            Email:
            <input type="email" required />
          </label>
          <label>
            Preferred Time:
            <input type="datetime-local" required />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
