import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router'

const EditPet = props => {

    const[name, setName] = useState("");
    const[type, setType] = useState("");
    const[description, setDescription] = useState("");
    const[skill1, setSkill1] = useState("");
    const[skill2, setSkill2] = useState("");
    const[skill3, setSkill3] = useState("");
    const[errors, setErrors] = useState({});

    useEffect( () => {
        axios.get(`http://localhost:8000/api/pet/${props._id}`)
            .then(res => {
                console.log(res);
                setName(res.data.name);
                setType(res.data.type);
                setDescription(res.data.description);
                setSkill1(res.data.skill1);
                setSkill2(res.data.skill2);
                setSkill3(res.data.skill3);
            }).catch(errors => console.log(errors));
    }, [props._id]);

    const UpdatePet = e => {
        e.preventDefault();
        const pet = {name, type, description, skill1, skill2, skill3};
        axios.put(`http://localhost:8000/api/pet/update/${props._id}`, pet)
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
        <form onSubmit={UpdatePet}>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg">
                    <h4>Details (required):</h4>
                        <div className="form-group">
                            <label>Pet Name</label>
                            <input type="text" className="form-control" onChange={ e => setName(e.target.value)} value={name}/>
                            {errors.name ? <p className="text-danger">{errors.name.properties.message}</p>: ""}
                        </div>
                        <div className="form-group">
                            <label>Pet Type</label>
                            <input type="text" className="form-control" onChange={ e => setType(e.target.value)} value={type}/>
                            {errors.type ? <p className="text-danger">{errors.type.properties.message}</p>: ""}
                        </div>
                        <div className="form-group">
                            <label>Pet Description</label>
                            <input type="text" className="form-control" onChange={ e => setDescription(e.target.value)} value={description}/>
                            {errors.description ? <p className="text-danger">{errors.description.properties.message}</p>: ""}
                        </div>
                    </div>
                    <div className="col-lg">
                        <h4>Skills (optional):</h4>
                        <div className="form-group">
                            <label>Skill 1</label>
                            <input type="text" className="form-control" onChange={ e => setSkill1(e.target.value)} value={skill1}/>
                        </div>
                        <div className="form-group">
                            <label>Skill 2</label>
                            <input type="text" className="form-control" onChange={ e => setSkill2(e.target.value)} value={skill2}/>
                        </div>
                        <div className="form-group">
                            <label>Skill 3</label>
                            <input type="text" className="form-control" onChange={ e => setSkill3(e.target.value)} value={skill3}/>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-primary btn-block" value="Update Pet"/>
                </div>
            </div>
        </form>
    )

}

export default EditPet;