import { useState, useEffect } from 'react';
import axiosInstance from '../components/axiosInstance';

const AllOrders = () => {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/orders/all')
      .then(r => setOrders(r.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="spinner" style={{ marginTop: '4rem' }} />;

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div className="page-header">
        <h2>All Orders</h2>
        <span style={{ color: 'var(--text-muted)', fontSize: '.9rem' }}>{orders.length} total</span>
      </div>
      {orders.length === 0 ? (
        <div className="empty-state card"><h3>No orders yet</h3></div>
      ) : (
        <div className="card transactions-card">
          <div className="records-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>User</th>
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
                  <td data-label="User">{o.userId?.username || '—'}</td>
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

export default AllOrders;
