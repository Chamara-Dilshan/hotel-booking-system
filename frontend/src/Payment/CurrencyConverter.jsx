import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CurrencyConverter.css';

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', flag: '\uD83C\uDDFA\uD83C\uDDF8', symbol: '$' },
  { code: 'EUR', name: 'Euro', flag: '\uD83C\uDDEA\uD83C\uDDFA', symbol: '\u20AC' },
  { code: 'GBP', name: 'British Pound', flag: '\uD83C\uDDEC\uD83C\uDDE7', symbol: '\u00A3' },
  { code: 'INR', name: 'Indian Rupee', flag: '\uD83C\uDDEE\uD83C\uDDF3', symbol: '\u20B9' },
  { code: 'AUD', name: 'Australian Dollar', flag: '\uD83C\uDDE6\uD83C\uDDFA', symbol: 'A$' },
  { code: 'JPY', name: 'Japanese Yen', flag: '\uD83C\uDDEF\uD83C\uDDF5', symbol: '\u00A5' },
];

const CurrencyConverter = () => {
  const navigate = useNavigate();
  const [exchangeRates, setExchangeRates] = useState({});
  const [amount, setAmount] = useState(1000);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchExchangeRates = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://api.exchangerate-api.com/v4/latest/LKR'
      );
      setExchangeRates(response.data.rates);
      setLastUpdated(new Date());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExchangeRates();

    // Refresh rates every 5 minutes
    const interval = setInterval(fetchExchangeRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchExchangeRates]);

  useEffect(() => {
    if (exchangeRates[selectedCurrency]) {
      const converted = amount * exchangeRates[selectedCurrency];
      setConvertedAmount(converted);
    }
  }, [amount, selectedCurrency, exchangeRates]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || value === '0') {
      setAmount(0);
    } else {
      setAmount(parseFloat(value) || 0);
    }
  };

  const handleCurrencySelect = (currencyCode) => {
    setSelectedCurrency(currencyCode);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const selectedCurrencyData = CURRENCIES.find(c => c.code === selectedCurrency);
  const rate = exchangeRates[selectedCurrency] || 0;

  const formatCurrency = (value, currency) => {
    const currencyData = CURRENCIES.find(c => c.code === currency);
    return `${currencyData?.symbol || ''}${value.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="currency-converter-container">
        <div className="currency-converter-wrapper">
          <div className="converter-card">
            <div className="converter-loading">
              <div className="spinner"></div>
              <p>Loading exchange rates...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="currency-converter-container">
      <div className="currency-converter-wrapper">
        {/* Header */}
        <div className="converter-header">
          <h1>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            Currency Converter
          </h1>
          <p>Real-time exchange rates for your travel planning</p>
        </div>

        {/* Main Card */}
        <div className="converter-card">
          {/* Amount Input Section */}
          <div className="amount-section">
            <label className="amount-label">Amount in Sri Lankan Rupees (LKR)</label>
            <div className="amount-input-wrapper">
              <span className="currency-prefix">LKR</span>
              <input
                type="number"
                className="amount-input"
                value={amount || ''}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                min="0"
              />
            </div>
            <div className="source-currency">
              <span className="source-flag">{'\uD83C\uDDF1\uD83C\uDDF0'}</span>
              <span>Sri Lankan Rupee</span>
              <span className="live-badge">
                <span className="live-dot"></span>
                Live
              </span>
            </div>
          </div>

          {/* Conversion Arrow */}
          <div className="conversion-arrow">
            <div className="arrow-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </div>
          </div>

          {/* Currency Selection Section */}
          <div className="currency-selection">
            <label className="selection-label">Convert to</label>

            {/* Currency Buttons */}
            <div className="currency-buttons">
              {CURRENCIES.map((currency) => (
                <button
                  key={currency.code}
                  className={`currency-btn ${selectedCurrency === currency.code ? 'active' : ''}`}
                  onClick={() => handleCurrencySelect(currency.code)}
                >
                  <span className="flag">{currency.flag}</span>
                  <span className="code">{currency.code}</span>
                  <span className="name">{currency.name}</span>
                </button>
              ))}
            </div>

            {/* Result */}
            <div className="result-section">
              <div className="result-label">Converted Amount</div>
              <div className="result-value" key={`${selectedCurrency}-${convertedAmount}`}>
                {formatCurrency(convertedAmount, selectedCurrency)} {selectedCurrency}
              </div>
              <div className="result-rate">
                1 LKR = {rate.toFixed(6)} {selectedCurrency}
              </div>

              {/* Rate Info */}
              <div className="rate-info">
                <div className="rate-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>
                    Updated: {lastUpdated?.toLocaleTimeString()}
                  </span>
                </div>
                <div className="rate-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 4v6h-6" />
                    <path d="M1 20v-6h6" />
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                  </svg>
                  <span>Auto-refresh every 5 min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="converter-footer">
            <button className="back-btn" onClick={handleGoBack}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Previous Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
