import  { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Link } from 'react-router-dom';

const Create = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // Initialize useNavigate
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Simple validation
    if (!fullName || !email || !password || !gender || !contact || !birthday) {
      setError("All fields are required.");
      return;
    }

    const formData = {
      fullName,
      email,
      password,
      gender,
      contact,
      birthday,
      isChecked,
    };

    try {
      const response = await axios.post(
        "https://6754029636bcd1eec84fd8ad.mockapi.io/curd-operation",
        formData
      );
      console.log("Response:", response.data);
      alert("Form submitted successfully!");
      navigate("/read"); // Navigate to /read
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <section className="create ">
      <div className="createmain">
        <div className='d-flex justify-content-between m-3'>
          <h2>Create Employee Data!</h2>
          <Link to="/read">
              <button className='btn btn-primary'>Show Employee Data</button>
          </Link>
        </div>


        <form onSubmit={handleSubmit} className='mx-4'> {/* Added onSubmit handler */}
          <div className="mb-3">
            <label htmlFor="exampleInputFullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputFullName"
              placeholder="Enter your full name"
              value={fullName} // Controlled input
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your email"
              value={email} // Controlled input
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your password"
              value={password} // Controlled input
              onChange={(e) => setPassword(e.target.value)}
            />
          </div >

         

          <div className="mb-3 ">
          <label className="form-label my-2">Gender</label>
            <select
              className="form-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            
          </div>
          <div className="mb-3">
            <label  className="form-label">
              Contact Number 
            </label>
            <input
              type="tel"
              className="form-control"
              id="contact"
              placeholder="000-000-0000"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          <div className="mb-3">
          <label htmlFor="birthday" className="form-label">
              DOB
            </label>
            <input
              type="date"
              className="form-control"
              id="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />

          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              checked={isChecked} // Controlled checkbox
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        {error && <p className="text-danger">{error}</p>} {/* Display error message if any */}
      </div>
    </section>
  );
};

export default Create;
