import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { toast } from 'react-toastify';
import './AdminLogin.css';

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('🎉 Giriş başarılı! Hoş geldiniz.', {
        position: "top-center",
      });
      onLogin();
    } catch (error) {
      toast.error('❌ Giriş başarısız. Email veya şifre hatalı.', {
        position: "top-center",
      });
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-card">
        <h2>Admin Girişi</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
