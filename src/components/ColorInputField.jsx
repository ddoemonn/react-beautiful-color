import React, { useState, useEffect } from 'react';
import { validateColor } from '../utils/colorValidator';

const ColorInputField = ({ value, onChange, label = "Enter Color" }) => {
  const [inputValue, setInputValue] = useState(value);
  const [validation, setValidation] = useState({ isValid: true, format: null });

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    const result = validateColor(newValue);
    setValidation(result);

    if (result.isValid) {
      onChange(newValue);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontFamily: 'sans-serif' }}>
      <label style={{ fontSize: '14px', fontWeight: 'bold' }}>{label}</label>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange}
          style={{
            padding: '8px',
            border: `2px solid ${validation.isValid ? '#ccc' : '#ff4d4f'}`,
            borderRadius: '4px',
            outline: 'none',
            transition: 'border 0.2s'
          }}
          placeholder="e.g. #FFFFFF, red, rgb(0,0,0)"
        />
        <div 
          style={{ 
            width: '30px', 
            height: '30px', 
            borderRadius: '4px', 
            backgroundColor: validation.isValid ? inputValue : 'transparent', 
            border: '1px solid #ddd' 
          }} 
        />
      </div>
      {!validation.isValid && (
        <span style={{ color: '#ff4d4f', fontSize: '12px' }}>Invalid color format</span>
      )}
      {validation.isValid && validation.format && (
        <span style={{ color: '#52c41a', fontSize: '12px' }}>Detected: {validation.format}</span>
      )}
    </div>
  );
};

export default ColorInputField;
