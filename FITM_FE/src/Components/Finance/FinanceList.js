import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './FinanceList.css';

const FinanceList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseIncome = await fetch('https://localhost:7226/apis/Finance/ViewIncome');
        const responseOutcome = await fetch('https://localhost:7226/apis/Finance/ViewOutcome');
        const incomeData = await responseIncome.json();
        const outcomeData = await responseOutcome.json();

        const combinedData = [
          ...incomeData.map(item => ({ ...item, type: 'Income' })),
          ...outcomeData.map(item => ({ ...item, type: 'Outcome' }))
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

  return (
    <div>
      <div>
  <h1>Finance</h1>
  <select onChange={(e) => window.location.href = e.target.value} value="">
    <option value="" disabled hidden>ViewAs</option>
    <option value="/home/income">Income</option>
    <option value="/home/outcome">Outcome</option>
  </select>
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
              <td>{item.createdTime}</td>
              <td>{item.modifiedTime}</td>
              <td style={getStatusStyle(item.financeStatus)}>{getStatusLabel(item.financeStatus)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinanceList;