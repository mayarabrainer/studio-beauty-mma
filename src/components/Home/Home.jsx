import './home.css';
import { useState } from 'react';
import Appointments from '../Appointments/Appointments.jsx'; 

function Home() {
  const [showForm, setShowForm] = useState(false);

  const handleAppointmentClick = () => {
    setShowForm(true);
  };

  return (
    <div className="app-container">
      <header className="header-home">
        <h1 className="header-title-home">SALON & SPA</h1>
      </header>

      {!showForm ? (
        <section className="main-section-home">
          <div className="image-overlay-home">
            <div className="text-overlay-home">
              <h2 className="studio-title-home">STUDIO BEAUTY</h2>
              <h3 className="studio-subtitle-home">MMA</h3>
            </div>
            <button className="appointment-button-home" onClick={handleAppointmentClick}>Agendamentos</button>
          </div>
        </section>
      ) : (
        <Appointments /> 
      )}

      <footer>&copy; 2024 Feito por Mayara Brainer</footer>
    </div>
  );
}

export default Home;
