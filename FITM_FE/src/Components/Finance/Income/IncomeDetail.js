import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function IncomeDetail() {
    const [income, setIncome] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const id = new URLSearchParams(location.search).get('id');
  


    function getData(){
        axios.defaults.headers["Authorization"] = `Kestrel ${localStorage.getItem("token" )}`;
        axios.get('https://localhost:7226/apis/Finance/GetIncome?id='+id)
          .then(response => {
            setIncome(response.data);
          })
          .catch(error => {
          });
      }
      useEffect(() => {
        getData();
      }, [id]);

return (
        <div>{income.title}</div>
      );
}

export default IncomeDetail;

