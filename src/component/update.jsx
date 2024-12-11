import  { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Update = () => {
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [contact, setContact] = useState("");
    const [birthday, setBirthday] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve data from localStorage and parse types
        const localId = localStorage.getItem("id");
        const localFullName = localStorage.getItem("fullName");
        const localEmail = localStorage.getItem("email");
        const localPassword = localStorage.getItem("password");
        const localGender = localStorage.getItem("gender");
        const localContact = localStorage.getItem("contact");
        const localBirthday = localStorage.getItem("birthday");
        const localIsChecked = localStorage.getItem("isChecked") === "true"; // Convert to boolean

        setId(localId || "");
        setFullName(localFullName || "");
        setEmail(localEmail || "");
        setPassword(localPassword || "");
        setGender(localGender || "");
        setContact(localContact || "");
        setBirthday(localBirthday || "");
        setIsChecked(localIsChecked);
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!id) {
            alert("Invalid ID. Cannot update record.");
            setLoading(false);
            return;
        }

        const updatedData = {
            fullName,
            email,
            password,
            gender,
            contact,
            birthday,
            isChecked,
        };

        try {
            console.log("Updating with ID:", id);
            console.log("Payload:", updatedData);

            await axios.put(
                `https://6754029636bcd1eec84fd8ad.mockapi.io/curd-operation/${id}`,
                updatedData
            );

            alert("Data updated successfully!");
            navigate("/read");
        } catch (error) {
            console.error("Error updating data:", error);
            alert("Failed to update data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" m-3">
            <h2>Update Data!</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputFullName" className="form-label">
                        Full Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputFullName"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email Address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

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
            <label htmlFor="contact" className="form-label">
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
              type="birthday"
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
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        Confirm Update
                    </label>
                </div>
                {loading && <div>Updating...</div>}
                <button
                    type="button"
                    className="btn btn-primary mx-2"
                    onClick={handleUpdate}
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update"}
                </button>
           
                <Link to="/read">
                <button className="btn btn-secondary mx-2">Back</button>
                </Link>



            </form>
        </div>
    );
};

export default Update;
