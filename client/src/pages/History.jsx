import { useState, useEffect } from 'react';
import axiosInstance from '../components/axiosInstance';

const History = () => {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/orders/my')
      .then(r => setOrders(r.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="spinner" style={{ marginTop: '4rem' }} />;

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div className="page-header">
        <h2>Order History</h2>
        <span style={{ color: 'var(--text-muted)', fontSize: '.9rem' }}>{orders.length} order(s)</span>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state card">
          <h3>No orders yet</h3>
          <p>Your buy and sell orders will appear here.</p>
        </div>
      ) : (
        <div className="card records-card">
          <div className="records-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Symbol</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o._id}>
                  <td data-label="Date">{new Date(o.createdAt).toLocaleString()}</td>
                  <td data-label="Symbol"><strong style={{ color: 'var(--primary)' }}>{o.symbol}</strong></td>
                  <td data-label="Type"><span className={`badge badge-${o.type}`}>{o.type.toUpperCase()}</span></td>
                  <td data-label="Qty">{o.quantity}</td>
                  <td data-label="Price">${o.price.toFixed(2)}</td>
                  <td data-label="Total">${o.totalAmount.toFixed(2)}</td>
                  <td data-label="Status"><span className="badge badge-buy">{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
