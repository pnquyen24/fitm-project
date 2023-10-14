import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './FinanceList.css';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";


const FinanceList = () => {
const [data, setData] = useState([]);
const navigate = useNavigate();

useEffect(() => {
const fetchData = async () => {
try {
const responseIncome = await fetch('https://localhost:7226/apis/Finance/ViewIncome');
const responseOutcome = await fetch('https://localhost:7226/apis/Finance/ViewOutcome');
const incomeData = await responseIncome.json();
const outcomeData = await responseOutcome.json();
const combinedData = [
...incomeData.map((item) => ({ ...item, type: 'Income' })),
...outcomeData.map((item) => ({ ...item, type: 'Outcome' }))
];
setData(combinedData);
} catch (error) {
  console.error('Error fetching data:', error);
}
};

fetchData();
}, []);

const getStatusLabel = status => {
if (status === 0) {
return 'Waiting';
} else if (status === 1) {
return 'Pending';
} else if (status === 2) {
return 'Accepted';
} else if (status === 3) {
return 'Denied';
}
return '';
};

const getStatusStyle = status => {
if (status === 0) {
return {
color: 'gray',
fontWeight: 'bold'
};
} else if (status === 1) {
return {
color: 'orange',
fontWeight: 'bold'
};
} else if (status === 2) {
return {
color: 'green',
fontWeight: 'bold'
};
} else if (status === 3) {
return {
color: 'red',
fontWeight: 'bold'
};
}
return {};
};

const getTypeStyle = type => {
if (type === 'Income') {
return {
color: 'green'
};
} else if (type === 'Outcome') {
return {
color: 'red'
};
}
return {};
};

function ViewOutcomeDetail(id) {
  navigate("/home/financial-manager/outcome-detail?id=" + id);
}

function ViewIncomeDetail(id) {
  navigate("/home/financial-manager/income-detail?id=" + id);
}

function formatDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(currentDate.getDate()).padStart(2, '0');
  if (day === 1 && month === 1 && year === 1) {
    return 'Not yet';
  }
  return `${day}-${month}-${year}`;
}

return (
<div>
<h1 className='finance_title'>Finance Report List</h1>

<div className='create_finance_top'>
<Link to="/home/">
      <button className='finance_home'><span>BACK TO HOME</span></button>
    </Link>

<Link to="/home/financial-manager/create-finance" className='finance_create_button'>
      <button><span>CREATE FINANCE</span></button>
    </Link>
</div>

    
<table className='finance_table'>
<thead className='finance_table_thead'>
<tr>
<th>Bill Code</th>
<th>Title</th>
<th>Description</th>
<th>Amount</th>
<th>Type</th>
<th>Created Time</th>
<th>Modified Time</th>
<th>Status</th>
<th>Detail</th>

</tr>
</thead>
<tbody>
      {data.map(item => (
        <tr key={item.id}>
          <td>{item.billCode}</td>
          <td>{item.title}</td>
          <td>{item.description}</td>
          <td>{item.amount}</td>
          <td style={getTypeStyle(item.type)}>{item.type}</td>
          <td>{formatDate(item.createdTime)}</td>
          <td>{formatDate(item.modifiedTime)}</td>
          <td style={getStatusStyle(item.financeStatus)}>{getStatusLabel(item.financeStatus)}</td>
          <td>
          <Button
                  onClick={() => {item.type == 'Outcome' ? ViewOutcomeDetail(item.id) : ViewIncomeDetail(item.id)}}
                  variant="outlined"
                  size="small"
                  className="detail-button"
                >
                  View Detail
                </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
);
};

export default FinanceList;