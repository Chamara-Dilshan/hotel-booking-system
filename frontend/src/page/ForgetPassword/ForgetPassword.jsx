import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../../UserComponent/UserAuth.css';

export default function ForgetPasswordPage() {
  const navigate = useNavigate();
  
  // Multi-step state: 1 = email, 2 = OTP, 3 = new password, 4 = success
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = useRef([]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (step === 2) {
      setCanResend(true);
    }
  }, [countdown, step]);

  // Password strength calculator
  const getPasswordStrength = (password) => {
    if (!password) return { level: '', text: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z\d]/.test(password)) score++;
    
    if (score <= 1) return { level: 'weak', text: 'Weak password' };
    if (score <= 2) return { level: 'medium', text: 'Medium strength' };
    return { level: 'strong', text: 'Strong password' };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  // Step 1: Send OTP to email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address', { position: 'top-center' });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address', { position: 'top-center' });
      return;
    }

    setIsLoading(true);

    try {
      await axios.put(`http://localhost:8080/api/user/forget-password?email=${email}`);
      
      toast.success('OTP sent to your email!', { position: 'top-center' });
      setStep(2);
      setCountdown(60);
      setCanResend(false);
      
      // Focus first OTP input
      setTimeout(() => {
        if (inputRefs.current[0]) inputRefs.current[0].focus();
      }, 100);
    } catch (err) {
      toast.error('Email not found. Please check and try again.', { position: 'top-center' });
    } finally {
      setIsLoading(false);
    }
  };

  // OTP input handlers
  const handleOtpChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });
    setOtp(newOtp);
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      toast.error('Please enter all 6 digits', { position: 'top-center' });
      return;
    }

    setIsLoading(true);

    try {
      await axios.post('http://localhost:8080/api/user/verify-reset-otp', {
        email: email,
        otp: otpCode
      });
      
      toast.success('OTP verified!', { position: 'top-center' });
      setStep(3);
    } catch (err) {
      toast.error('Invalid OTP. Please try again.', { position: 'top-center' });
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0].focus();
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (!canResend) return;

    setCanResend(false);
    setCountdown(60);

    try {
      await axios.put(`http://localhost:8080/api/user/forget-password?email=${email}`);
      toast.success('New OTP sent!', { position: 'top-center' });
    } catch (err) {
      toast.error('Failed to resend OTP', { position: 'top-center' });
      setCanResend(true);
    }
  };

  // Step 3: Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in all fields', { position: 'top-center' });
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters', { position: 'top-center' });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match', { position: 'top-center' });
      return;
    }

    setIsLoading(true);

    try {
      await axios.put('http://localhost:8080/api/user/reset-password', {
        email: email,
        otp: otp.join(''),
        newPassword: newPassword
      });
      
      toast.success('Password reset successful!', { position: 'top-center' });
      setStep(4);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/user/login');
      }, 3000);
    } catch (err) {
      toast.error('Failed to reset password. Please try again.', { position: 'top-center' });
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (step > 1 && step < 4) {
      setStep(step - 1);
    }
  };

  return (
    <div className="auth-page">
      <ToastContainer />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            {/* Step Indicator */}
            <div className="step-indicator">
              <span className={`step-dot ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}></span>
              <span className="step-line"></span>
              <span className={`step-dot ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}></span>
              <span className="step-line"></span>
              <span className={`step-dot ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}></span>
            </div>
            
            <h2 className="auth-title">
              {step === 1 && 'Reset Password'}
              {step === 2 && 'Verify OTP'}
              {step === 3 && 'New Password'}
              {step === 4 && 'Success!'}
            </h2>
            <p className="auth-subtitle">
              {step === 1 && 'Enter your email to receive a verification code'}
              {step === 2 && 'Enter the 6-digit code sent to your email'}
              {step === 3 && 'Create a strong new password'}
              {step === 4 && 'Your password has been reset'}
            </p>
          </div>

          <div className="auth-form">
            {/* Step 1: Email */}
            {step === 1 && (
              <form onSubmit={handleSendOtp}>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>

                <div className="auth-actions">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="btn-loading">
                        <span className="spinner"></span>
                        Sending...
                      </span>
                    ) : (
                      'Send Verification Code'
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: OTP */}
            {step === 2 && (
              <form onSubmit={handleVerifyOtp}>
                <div className="otp-input-container">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={index === 0 ? handleOtpPaste : undefined}
                      className={`otp-input ${digit ? 'filled' : ''}`}
                      disabled={isLoading}
                      aria-label={`Digit ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="otp-timer">
                  {countdown > 0 ? (
                    <p className="timer-text">
                      Resend code in <span className="timer-countdown">{countdown}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="btn btn-link resend-btn"
                      disabled={!canResend}
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <div className="auth-actions">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isLoading || otp.some(d => d === '')}
                  >
                    {isLoading ? (
                      <span className="btn-loading">
                        <span className="spinner"></span>
                        Verifying...
                      </span>
                    ) : (
                      'Verify OTP'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={goBack}
                    className="btn btn-link btn-block"
                  >
                    ← Back
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <form onSubmit={handleResetPassword}>
                <div className="form-group">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    className="form-control"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  {newPassword && (
                    <div className="password-strength">
                      <div className="strength-bar">
                        <div className={`strength-fill ${passwordStrength.level}`}></div>
                      </div>
                      <p className="strength-text">{passwordStrength.text}</p>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className={`form-control ${confirmPassword && confirmPassword !== newPassword ? 'is-invalid' : ''}`}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  {confirmPassword && confirmPassword !== newPassword && (
                    <p className="text-danger" style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
                      Passwords do not match
                    </p>
                  )}
                </div>

                <div className="auth-actions">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isLoading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                  >
                    {isLoading ? (
                      <span className="btn-loading">
                        <span className="spinner"></span>
                        Resetting...
                      </span>
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={goBack}
                    className="btn btn-link btn-block"
                  >
                    ← Back
                  </button>
                </div>
              </form>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <div className="success-animation">
                <div className="success-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 style={{ color: 'var(--secondary-color)', marginBottom: '0.5rem' }}>Password Reset Complete</h3>
                <p className="redirect-text">Redirecting to login page...</p>
              </div>
            )}
          </div>

          <div className="auth-footer">
            <p>Remember your password? <Link to="/user/login">Sign in</Link></p>
            <p><Link to="/">← Back to Homepage</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
