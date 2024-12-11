import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Read = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getData = () => {
        setLoading(true);
        setError(null);
        axios
            .get("https://6754029636bcd1eec84fd8ad.mockapi.io/curd-operation")
            .then((res) => setData(res.data))

            .catch(() => setError("Failed to fetch data."))
            .finally(() => setLoading(false));
    };

    const handleDelete = (id) => {
        axios
            .delete(`https://6754029636bcd1eec84fd8ad.mockapi.io/curd-operation/${id}`)
            .then(() => {
                console.log(`Deleted item with id ${id}`);
                getData();
            })
            .catch((err) => {      
                console.log(err); 
               setError("Failed to delete item.")
            }
            );
    };

    const setToLocalStorage = (id, fullName, email, password, gender, contact, birthday) => {
        localStorage.setItem('id', id);
        localStorage.setItem('fullName', fullName);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('gender', gender);
        localStorage.setItem('contact', contact);
        localStorage.setItem('birthday', birthday);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <section className="read mx-4">
         <div className='d-flex justify-content-between m-3'>
          <h2>Read Data!</h2>
          <Link to="/">
          <button className="btn btn-secondary">Create</button>
          </Link>
        </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Password</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Contact</th>
                            <th scope="col">DOB</th>
                            <th scope="col">Update Data</th>
                            <th scope="col">Delete Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((eachData) => (
                            <tr key={eachData.id}>
                                <th scope="row">{eachData.id}</th>
                                <td>{eachData.fullName}</td>
                                <td>{eachData.email}</td>
                                <td>{eachData.password}</td>
                                <td>{eachData.gender}</td>
                                <td>{eachData.contact}</td>
                                <td>{eachData.birthday}</td>
                                <td>
                                    <Link to="/update">
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={() => setToLocalStorage(eachData.id, eachData.fullName, eachData.email, eachData.password, eachData.gender, eachData.contact)}
                                        >
                                            Update
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(eachData.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
};

export default Read;
