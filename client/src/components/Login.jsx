import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaChartLine, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useGeneral } from '../context/GeneralContext';
import axiosInstance from './axiosInstance';
import './Auth.css';

const Login = () => {
  const [form, setForm]       = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login }  = useGeneral();
  const navigate   = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosInstance.post('/users/login', form);
      login(data, data.token);
      toast.success(`Welcome back, ${data.username}!`);
      navigate(data.role === 'admin' ? '/admin' : '/home');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-logo">
          <FaChartLine /> SB Stocks
        </div>
        <h2>Welcome back</h2>
        <p className="auth-sub">Sign in to your trading account</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={form.email}
              onChange={handleChange} placeholder="you@email.com" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-input-wrap">
              <input name="password" type={showPassword ? 'text' : 'password'} value={form.password}
                onChange={handleChange} placeholder="••••••••" required />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
