import React, { useState, FormEvent, ChangeEvent, useRef } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

interface RegisterFormErrors {
  username?: string;
  email?: string;
  password?: string;
}

interface ForgotFormData {
  username: string;
  email: string;
}

interface ForgotFormErrors {
  username?: string;
  email?: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showRegister, setShowRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: ''
  });
  const [registerErrors, setRegisterErrors] = useState<RegisterFormErrors>({});
  const [forgotData, setForgotData] = useState<ForgotFormData>({
    username: '',
    email: ''
  });
  const [forgotErrors, setForgotErrors] = useState<ForgotFormErrors>({});
  const [otpActive, setOtpActive] = useState<number | null>(null);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.email) newErrors.email = 'E-mail é obrigatório';
    if (!formData.password) newErrors.password = 'Senha é obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpa o erro quando o usuário começa a digitar
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Cadastro
  const validateRegisterForm = () => {
    const newErrors: RegisterFormErrors = {};
    if (!registerData.username) newErrors.username = 'Usuário é obrigatório';
    if (!registerData.email) newErrors.email = 'E-mail é obrigatório';
    if (!registerData.password) newErrors.password = 'Senha é obrigatória';
    setRegisterErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateRegisterForm()) {
      // Lógica de cadastro aqui
      console.log('Cadastro válido');
      setShowRegister(false);
    }
  };

  const handleRegisterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
    if (registerErrors[name as keyof RegisterFormErrors]) {
      setRegisterErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Esqueceu a senha
  const validateForgotForm = () => {
    const newErrors: ForgotFormErrors = {};
    if (!forgotData.username) newErrors.username = 'Usuário é obrigatório';
    if (!forgotData.email) newErrors.email = 'E-mail é obrigatório';
    setForgotErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleForgotSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForgotForm()) {
      // Lógica de recuperação aqui
      setShowForgot(false);
      setShowOTP(true);
    }
  };

  const handleForgotChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForgotData(prev => ({
      ...prev,
      [name]: value
    }));
    if (forgotErrors[name as keyof ForgotFormErrors]) {
      setForgotErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // OTP
  const handleOtpFocus = (idx: number) => {
    setOtpActive(idx);
  };

  const handleOtpBlur = () => {
    setOtpActive(null);
  };

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value.replace(/\D/g, '');
    const newOtp = [...otp];
    if (val) {
      newOtp[idx] = val[val.length - 1];
      setOtp(newOtp);
      // Só avança o foco se o campo já estava focado (não ao clicar)
      if (otpActive === idx && idx < 3) {
        otpRefs[idx + 1].current?.focus();
      }
    } else {
      newOtp[idx] = '';
      setOtp(newOtp);
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs[idx - 1].current?.focus();
    }
    if (e.key === 'ArrowLeft' && idx > 0) {
      otpRefs[idx - 1].current?.focus();
    }
    if (e.key === 'ArrowRight' && idx < 3) {
      otpRefs[idx + 1].current?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (paste.length) {
      const newOtp = paste.split('');
      while (newOtp.length < 4) newOtp.push('');
      setOtp(newOtp);
      setTimeout(() => {
        otpRefs[Math.min(paste.length, 3)].current?.focus();
      }, 0);
    }
    e.preventDefault();
  };

  const handleOtpSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica de verificação OTP
    setShowOTP(false);
  };

  return (
    <div className="login-container">
      <div className="login-side-panel">
        <div className="login-logo-wrapper">
          <img src="/logo.png" alt="Logo" className="login-logo" />
        </div>
        <div className="login-side-content">
          <h2 className="login-slogan">
            VOCÊ TEM A IDEIA,
            <br />
            NÓS TEMOS A SOLUÇÃO
          </h2>
        </div>
      </div>
      <div className="login-content-panel">
        {!showRegister && !showForgot && !showOTP && (
          <div className="login-card">
            <h1 className="login-title">Login</h1>
            <p className="login-subtitle">Preencha os campos abaixo com os seus dados de acesso.</p>
            <form onSubmit={handleSubmit}>
              <div className="login-input-group">
                <div className="login-input-icon">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  name="email"
                  className={`login-input ${errors.email ? 'error' : ''}`}
                  placeholder="Digite seu e-mail"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="login-error-message">{errors.email}</div>}
              </div>
              <div className="login-input-group">
                <div className="login-input-icon">
                  <FaLock />
                </div>
                <input
                  type="password"
                  name="password"
                  className={`login-input ${errors.password ? 'error' : ''}`}
                  placeholder="Digite sua senha"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <div className="login-error-message">{errors.password}</div>}
              </div>
              <button type="submit" className="login-button">Acessar</button>
            </form>
            <button className="login-button login-button-secondary" onClick={() => setShowRegister(true)}>Criar minha conta</button>
            <button className="login-link-button" onClick={() => setShowForgot(true)}>Esqueceu sua senha?</button>
          </div>
        )}
        {showRegister && !showForgot && !showOTP && (
          <div className="login-card">
            <h1 className="login-title">Criar conta</h1>
            <p className="login-subtitle">Preencha os campos abaixo com os seus dados de acesso.</p>
            <form onSubmit={handleRegisterSubmit}>
              <div className="login-input-group">
                <div className="login-input-icon">
                  <FaUser />
                </div>
                <input
                  type="text"
                  name="username"
                  className={`login-input ${registerErrors.username ? 'error' : ''}`}
                  placeholder="Digite seu usuário"
                  value={registerData.username}
                  onChange={handleRegisterChange}
                />
                {registerErrors.username && <div className="login-error-message">{registerErrors.username}</div>}
              </div>
              <div className="login-input-group">
                <div className="login-input-icon">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  name="email"
                  className={`login-input ${registerErrors.email ? 'error' : ''}`}
                  placeholder="Digite seu e-mail"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                />
                {registerErrors.email && <div className="login-error-message">{registerErrors.email}</div>}
              </div>
              <div className="login-input-group">
                <div className="login-input-icon">
                  <FaLock />
                </div>
                <input
                  type="password"
                  name="password"
                  className={`login-input ${registerErrors.password ? 'error' : ''}`}
                  placeholder="Digite sua senha"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                />
                {registerErrors.password && <div className="login-error-message">{registerErrors.password}</div>}
              </div>
              <button type="submit" className="login-button">Cadastrar</button>
            </form>
            <button className="login-link-button" onClick={() => setShowRegister(false)}>
              Já tem uma conta? Entrar.
            </button>
          </div>
        )}
        {showForgot && !showOTP && (
          <div className="login-card">
            <h1 className="login-title">Esqueceu a senha</h1>
            <p className="login-subtitle">Preencha os campos abaixo com os seus dados de acesso.</p>
            <form onSubmit={handleForgotSubmit}>
              <div className="login-input-group">
                <div className="login-input-icon">
                  <FaUser />
                </div>
                <input
                  type="text"
                  name="username"
                  className={`login-input ${forgotErrors.username ? 'error' : ''}`}
                  placeholder="Digite seu usuário"
                  value={forgotData.username}
                  onChange={handleForgotChange}
                />
                {forgotErrors.username && <div className="login-error-message">{forgotErrors.username}</div>}
              </div>
              <div className="login-input-group">
                <div className="login-input-icon">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  name="email"
                  className={`login-input ${forgotErrors.email ? 'error' : ''}`}
                  placeholder="Digite seu e-mail"
                  value={forgotData.email}
                  onChange={handleForgotChange}
                />
                {forgotErrors.email && <div className="login-error-message">{forgotErrors.email}</div>}
              </div>
              <button type="submit" className="login-button">Próximo</button>
            </form>
          </div>
        )}
        {showOTP && (
          <div className="login-card">
            <h1 className="login-title">Verificação de Código OTP</h1>
            <p className="login-subtitle">Digite abaixo o código enviado por e-mail.</p>
            <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '16px', margin: '24px 0 32px 0' }}>
                {otp.map((value, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, '');
                      const newOtp = [...otp];
                      newOtp[idx] = val;
                      setOtp(newOtp);
                    }}
                    style={{
                      width: 40,
                      textAlign: 'center',
                      paddingLeft: 0,
                      fontSize: '1.2rem',
                      letterSpacing: '2px'
                    }}
                  />
                ))}
              </div>
              <button type="submit" className="login-button">Próximo</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login; 