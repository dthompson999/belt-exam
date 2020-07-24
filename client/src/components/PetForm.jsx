import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router'

const PetForm = props => {

    const[name, setName] = useState("");
    const[type, setType] = useState("");
    const[description, setDescription] = useState("");
    const[skill1, setSkill1] = useState("");
    const[skill2, setSkill2] = useState("");
    const[skill3, setSkill3] = useState("");
    const[errors, setErrors] = useState({});

    const create = e => {
        e.preventDefault();
        const newPet = {name, type, description, skill1, skill2, skill3};

        axios.post("http://localhost:8000/api/pet/new", newPet)
            .then(res => {
                console.log(res);
                if(res.data.errors) {
                    setErrors(res.data.errors);
                } else {
                    navigate("/");
                }
            }).catch(err => console.log(err));
    }

    return (
        <form onSubmit={ create }>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg">
                    <h4>Details (required):</h4>
                        <div className="form-group">
                            <label>Pet Name</label>
                            <input type="text" className="form-control" onChange={ e => setName(e.target.value)} />
                            {errors.name ? <p className="text-danger">{errors.name.properties.message}</p>: ""}
                        </div>
                        <div className="form-group">
                            <label>Pet Type</label>
                            <input type="text" className="form-control" onChange={ e => setType(e.target.value)}/>
                            {errors.type ? <p className="text-danger">{errors.type.properties.message}</p>: ""}
                        </div>
                        <div className="form-group">
                            <label>Pet Description</label>
                            <input type="text" className="form-control" onChange={ e => setDescription(e.target.value)} />
                            {errors.description ? <p className="text-danger">{errors.description.properties.message}</p>: ""}
                        </div>
                    </div>
                    <div className="col-lg">
                        <h4>Skills (optional):</h4>
                        <div className="form-group">
                            <label>Skill 1</label>
                            <input type="text" className="form-control" onChange={ e => setSkill1(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Skill 2</label>
                            <input type="text" className="form-control" onChange={ e => setSkill2(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Skill 3</label>
                            <input type="text" className="form-control" onChange={ e => setSkill3(e.target.value)} />
                        </div>
                    </div>
                    <input type="submit" className="btn btn-primary btn-block" value="Add Pet"/>
                </div>
            </div>
        </form>
    )

}

export default PetForm;