import React, { useEffect, useState } from 'react';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

  const fetchMessage = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/message`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      setData({ error: e.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <div style={{ fontFamily: 'Arial', padding: 20 }}>
      <h1>Full Stack AWS Deploy Demo</h1>
      <p>This React app fetches data from a backend API via ALB.</p>
      <button onClick={fetchMessage}>Fetch Message</button>
      {loading && <p>Loading...</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
