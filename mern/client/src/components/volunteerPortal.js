import './volunteer.css'
import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios'

export default function SeeEvent() {
    state = {
        posts: []
    };

    componentDidMount = () => {
        this.getMongoData();    
    }
    
    getMongoData = () => {
        axios.get('/api')
        .then((response) => {
            const data = response.data
            this.setStat({posts: data});
            
        })
        .catch(() => {
            alert('Error retrieving data')
        });
    }
}