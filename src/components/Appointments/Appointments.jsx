import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './appointments.css';

function Appointments() {
  const [formData, setFormData] = useState({
    nome: '',
    celular: '',
    servico: '',
    horario: '',
    data: ''
  });

  const [appointments, setAppointments] = useState([]);


  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:3000/agendamentos'); 
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/agendamento/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment._id !== id)
        );
        alert('Agendamento deletado com sucesso!');
      } else {
        alert('Erro ao deletar agendamento.');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  
  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/agendamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const { appointment } = await response.json();
        setAppointments([...appointments, appointment]); 
        setFormData({
          nome: appointment.nome,
          celular: appointment.celular,
          servico: appointment.servico,
          horario: appointment.horario,
          data: appointment.data
        }); 
        toast.success('Agendamento realizado com sucesso!'); 
      } else {
        const { message } = await response.json();
        console.error(message);
        toast.error(message);
      }
    } catch (error) {
      console.error('Erro ao enviar agendamento:', error);
    }
  };

  return (
    
    <section className='app-container-agendamento'>
    <ToastContainer />
    <div className="form-container">
      <h2 className='title-agendamento'>Agendar Cliente</h2>
      <form onSubmit={handleSubmit}>
        
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        
        <input
          type="text"
          name="celular"
          placeholder="Celular"
          value={formData.celular}
          onChange={handleChange}
          required
        />
        <select name="servico" value={formData.servico} onChange={handleChange} required>
          <option value="">Selecione um Serviço</option>
          <option value="Corte de Cabelo">Manicure Simples - Corte, lixamento e esmaltação tradicional</option>
          <option value="Massagem">Manicure Completa - Cuticulagem, hidratação e esmaltação</option>
          <option value="Manicure">Pedicure Simples - Corte e lixamento dos pés com esmaltação</option>
          <option value="Massagem">Pedicure Completa -  Esfoliação, hidratação e esmaltação dos pés</option>
          <option value="Manicure">Pedicure e Manicure Simples - Corte e lixamento dos pés com esmaltação</option>
          <option value="Massagem">Pedicure e Manicure Completa -  Esfoliação, hidratação e esmaltação dos pés e mãos</option>
          <option value="Unhas de Gel">Unhas de Gel - Aplicação e manutenção de unhas em gel</option>
          <option value="Unhas Acrílicas">Unhas Acrílicas - Alongamento com aplicação de acrílico</option>
          <option value="Alongamento Fibra de Vidro">Alongamento Fibra de Vidro - Alongamento duradouro e natural</option>
          <option value="Esmaltação em Gel">Esmaltação em Gel - Esmaltação com secagem em cabine UV</option>
          <option value="Spa das Mãos">Spa das Mãos - Esfoliação, hidratação e massagem nas mãos</option>
          <option value="Spa dos Pés">Spa dos Pés - Esfoliação, hidratação e massagem relaxante nos pés</option>
          <option value="Nail Art">Nail Art - Decoração personalizada de unhas</option>
          <option value="Massagem Relaxante">Massagem Relaxante - Alívio de tensões com técnicas suaves</option>
          <option value="Massagem Terapêutica">Massagem Terapêutica - Tratamento de dores e tensões musculares</option>
          <option value="Massagem com Pedras Quentes">Massagem com Pedras Quentes - Massagem com aplicação de pedras aquecidas</option>
          <option value="Reflexologia Podal">Reflexologia Podal - Massagem nos pés que estimula pontos reflexos do corpo</option>
          <option value="Drenagem Linfática">Drenagem Linfática - Estímulo do sistema linfático para reduzir inchaços</option>
          <option value="Day Spa Completo">Day Spa Completo - Combinação de manicure, pedicure, massagem relaxante e facial</option>
          <option value="Banho de Ofurô">Banho de Ofurô - Relaxamento completo em banheira com sais e óleos essenciais</option>
          <option value="Esfoliação Corporal">Esfoliação Corporal - Remoção de células mortas e hidratação profunda da pele</option>
          <option value="Tratamento de Argila">Tratamento de Argila - Máscara corporal desintoxicante e hidratante</option>
          <option value="Spa Facial">Spa Facial - Limpeza de pele, esfoliação e hidratação facial</option>
          <option value="Spa para Mãos e Pés">Spa para Mãos e Pés - Tratamento de esfoliação, hidratação e relaxamento</option>
        </select>
        <input
          type="date"
          name="data"
          value={formData.data}
          onChange={handleChange}
          required
        />
        <select name="horario" value={formData.horario} onChange={handleChange} required>
          <option value="">Selecione um Horário</option>
          <option value="09:00">09:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
          <option value="14:00">14:00</option>
          <option value="15:00">15:00</option>
          <option value="16:00">16:00</option>
          <option value="17:00">17:00</option>
          <option value="18:00">18:00</option>
          <option value="19:00">19:00</option>
          <option value="20:00">20:00</option>
        </select>
        
        <button type="submit" className="submit-button">Confirmar</button>
      </form>

      <div className="appointment-list">
        <h3>Agendamentos</h3>
        <ul>
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <li key={index}>
                {"Cliente: " + appointment.nome} - {"Serviço: " + appointment.servico} - {appointment.data} - {appointment.horario + "hrs"}
                <button className='button-delete'  onClick={() => handleDelete(appointment._id)} > <span class="material-symbols-outlined">
                close
                </span></button>
              </li>
            ))
          ) : (
            <li>Nenhum agendamento encontrado.</li>
          )}
        </ul>
      </div>
    </div>
    </section>
  );
}

export default Appointments;
