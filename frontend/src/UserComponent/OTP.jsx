import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './UserAuth.css';

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = new URLSearchParams(location.search).get('data');

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Auto-submit when all 6 digits entered
    if (value && index === 5 && newOtp.every(digit => digit !== '')) {
      verifyOtp(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace - move to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });
    setOtp(newOtp);

    // Focus last filled input or submit if complete
    const lastIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastIndex].focus();

    if (pastedData.length === 6) {
      verifyOtp(pastedData);
    }
  };

  async function verifyOtp(otpCode) {
    const finalOtp = otpCode || otp.join('');
    
    if (finalOtp.length !== 6) {
      toast.error('Please enter all 6 digits', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/user/verify-otp', {
        userName: userName,
        otp: finalOtp
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        
        toast.success('OTP verified successfully!', {
          position: 'top-center',
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate('/home');
        }, 1500);
      } else {
        toast.error('Invalid OTP. Please try again.', {
          position: 'top-center',
          autoClose: 3000,
        });
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0].focus();
      }
    } catch (err) {
      toast.error('Verification failed. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
      });
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0].focus();
    } finally {
      setIsLoading(false);
    }
  }

  const handleResendOtp = async () => {
    if (!canResend) return;

    setCanResend(false);
    setCountdown(60);

    try {
      await axios.post('http://localhost:8080/api/user/resend-otp', {
        userName: userName
      });
      
      toast.success('New OTP sent to your email!', {
        position: 'top-center',
        autoClose: 3000,
      });
    } catch (err) {
      toast.error('Failed to resend OTP. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
      });
      setCanResend(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyOtp();
  };

  return (
    <div className="auth-page">
      <ToastContainer />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="otp-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h2 className="auth-title">Verify OTP</h2>
            <p className="auth-subtitle">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="otp-input-container">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
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
            </div>
          </form>

          <div className="auth-footer">
            <p>
              <Link to="/">← Back to Homepage</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
