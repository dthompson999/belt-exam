import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import {navigate} from '@reach/router'

const Detail = (props) => {

    const [details, setDetails] = useState({});

    useEffect( () => {
        axios.get(`http://localhost:8000/api/pet/${props._id}`)
            .then( res => {
                console.log(res);
                setDetails(res.data);
            })
            .catch(err => console.log(err));
    }, [props._id]);

    const remove = () => {
        axios.delete(`http://localhost:8000/api/pet/delete/${props._id}`)
            .then(res => {
                console.log(res);
                navigate("/");
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <div className="container">
                <div className="card mt-5">
                    <div className="card-header bg-primary text-white">{details.name}'s Details</div>
                    <div className="card-body">
                        <p><span style={{fontWeight: 'bold'}}>Pet Type:</span> {details.type}</p>
                        <p><span style={{fontWeight: 'bold'}}>Description:</span> {details.description}</p>
                        <p><span style={{fontWeight: 'bold'}}>Skills:</span>
                            <p>{details.skill1}</p>
                            <p>{details.skill2}</p>
                            <p>{details.skill3}</p>
                        </p>
                        <p><span style={{fontWeight: 'bold'}}>Date added to shelter:</span> {moment(details.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
                        <p><span style={{fontWeight: 'bold'}}>Database ID:</span> {details._id}</p>
                    </div>
                </div>
                <button className="btn btn-success mt-5" onClick={remove}>Adopt {details.name}</button>
            </div>
        </div>
    )
}

export default Detail;