
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");
  const [status, setStatus] = useState("Interested");

  const [leads, setLeads] = useState([]);




  // FETCH LEADS
  const fetchLeads = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/leads"
      );

      setLeads(response.data);

    } catch (error) {

      console.log(error);
    }
  };





  useEffect(() => {
    fetchLeads();
  }, []);







  // ADD LEAD
  const addLead = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/leads",
        {
          customer_name: customerName,
          ph_no: phone,
          email_id: email,
          lead_source: source,
          lead_status: status,
        }
      );



      setCustomerName("");
      setPhone("");
      setEmail("");
      setSource("");
      setStatus("Interested");



      fetchLeads();

    } catch (error) {

      console.log(error);
    }
  };








  // DELETE LEAD
  const deleteLead = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/leads/${id}`
      );

      fetchLeads();

    } catch (error) {

      console.log(error);
    }
  };









  // UPDATE STATUS
  const updateStatus = async (
    id,
    newStatus
  ) => {

    try {

      await axios.put(
        `http://localhost:5000/leads/${id}`,
        {
          lead_status: newStatus,
        }
      );

      fetchLeads();

    } catch (error) {

      console.log(error);
    }
  };











  return (

    <div className="container">

      <h1>Mini CRM</h1>









      <form
        onSubmit={addLead}
        className="form"
      >

        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) =>
            setCustomerName(e.target.value)
          }
        />










        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />












        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />













        <input
          type="text"
          placeholder="Lead Source"
          value={source}
          onChange={(e) =>
            setSource(e.target.value)
          }
        />














        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >

          <option>Interested</option>

          <option>Not Interested</option>

          <option>Converted</option>

        </select>















        <button type="submit">
          Add Lead
        </button>

      </form>
















      <div className="lead-list">

        {leads.map((lead) => (

          <div
            key={lead.lead_id}
            className="lead-card"
          >

            <h3>
              {lead.customer_name}
            </h3>

            <p>
              Phone: {lead.ph_no}
            </p>

            <p>
              Email: {lead.email_id}
            </p>

            <p>
              Source: {lead.lead_source}
            </p>

            <p>
              Status: {lead.lead_status}
            </p>
















            <select
              value={lead.lead_status}
              onChange={(e) =>
                updateStatus(
                  lead.lead_id,
                  e.target.value
                )
              }
            >

              <option>Interested</option>

              <option>Not Interested</option>

              <option>Converted</option>

            </select>

















            <button
              onClick={() =>
                deleteLead(lead.lead_id)
              }
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;

