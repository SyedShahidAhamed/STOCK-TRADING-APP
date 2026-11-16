import { useState, useEffect } from 'react';
import axiosInstance from '../components/axiosInstance';

const Users = () => {
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/users/all')
      .then(r => setUsers(r.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="spinner" style={{ marginTop: '4rem' }} />;

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div className="page-header">
        <h2>All Users</h2>
        <span style={{ color: 'var(--text-muted)', fontSize: '.9rem' }}>{users.length} registered</span>
      </div>
      <div className="card transactions-card">
        <div className="records-table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Balance</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id}>
                <td data-label="#">{i + 1}</td>
                <td data-label="Username"><strong>{u.username}</strong></td>
                <td data-label="Email">{u.email}</td>
                <td data-label="Balance" style={{ color: 'var(--success)', fontWeight: 700 }}>
                  ${u.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td data-label="Role">
                  <span className={`badge ${u.role === 'admin' ? 'badge-sell' : 'badge-buy'}`}>
                    {u.role}
                  </span>
                </td>
                <td data-label="Joined">{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
