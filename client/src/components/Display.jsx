import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';

const Display = props => {

    const [pets, setPets] = useState([]);

    const fetchPets = () => {
        axios.get("http://localhost:8000/api/pet")
            .then( res => {
                console.log(res);
                setPets(res.data)
            })
            .catch(err => console.log(err));
    }


    useEffect( () => {
        fetchPets();
    }, []);

    const remove = _id => {
        console.log(_id);
        axios.delete(`http://localhost:8000/api/pet/delete/${_id}`)
            .then(res => {
                console.log(res);
                fetchPets();
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <div className="container mt-5">
                <table className="table table-striped table-hover table-dark">
                    <thead className="thead-dark">
                        <tr>
                            <th>Pet Name</th>
                            <th>Pet Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {pets.map( (p, i) => 
                        <tr key={i}>
                            <td>{p.name}</td>
                            <td>{p.type}</td>
                            <td>
                                <Link className="btn btn-sm btn-outline-primary mr-2" to={`/pet/${p._id}`}>View Details</Link>
                                <Link className="btn btn-sm btn-outline-warning mr-2" to={`/pet/update/${p._id}`}>Edit Pet</Link>
                                <button className="btn btn-sm btn-outline-danger mr-2" onClick={e => remove(p._id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Display;