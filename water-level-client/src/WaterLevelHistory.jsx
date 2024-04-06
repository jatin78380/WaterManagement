import React, { useState, useEffect } from 'react';

function WaterLevelHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('waterLevelHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const getPastMonthData = () => {
    const today = new Date();
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

    const filteredHistory = history.filter(entry => new Date(entry.date) >= oneMonthAgo);
    setHistory(filteredHistory);
  };

  return (
    <div>
      <h1>Water Level History</h1>
      <button onClick={getPastMonthData}>View Past Month</button>
      {history.length > 0 ? (
        <ul>
          {history.map(entry => (
            <li key={entry.date}>
              Date: {entry.date} - Level: {entry.level}
            </li>
          ))}
        </ul>
      ) : (
        <p>No water level history found.</p>
      )}
    </div>
  );
}

export default WaterLevelHistory;
