import React, { useCallback, useEffect, useState } from 'react';
import { cn, validateAndParseColor, parseColorString } from '../utils/internal';
import { Color } from '../types';

export interface ColorInputProps {
  value?: Color | string;
  onChange?: (color: Color) => void;
  onValidationChange?: (isValid: boolean, error?: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  autoCorrect?: boolean;
  showValidationIcon?: boolean;
  'aria-label'?: string;
}

export const ColorInput: React.FC<ColorInputProps> = ({
  value,
  onChange,
  onValidationChange,
  placeholder = 'Enter color (hex, rgb, hsl, or name)',
  className,
  disabled = false,
  autoCorrect = true,
  showValidationIcon = true,
  'aria-label': ariaLabel,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [validationState, setValidationState] = useState<{
    isValid: boolean;
    error?: string;
    showError: boolean;
  }>({ isValid: true, showError: false });
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (value) {
      const colorValue = typeof value === 'string' ? value : value.format();
      setInputValue(colorValue);
    }
  }, [value]);

  const validateInput = useCallback(
    (input: string) => {
      if (!input.trim()) {
        const newState = { isValid: true, showError: false };
        setValidationState(newState);
        onValidationChange?.(true);
        return;
      }

      const result = validateAndParseColor(input);
      const newState = {
        isValid: result.isValid,
        error: result.errorMessage,
        showError: !result.isValid && input.trim().length > 0,
      };

      setValidationState(newState);
      onValidationChange?.(result.isValid, result.errorMessage);

      if (result.isValid && result.correctedValue && onChange) {
        try {
          const hexColor = parseColorString(input);
          const color = new Color({ type: 'hex', value: hexColor });
          onChange(color);
        } catch (error) {
          console.warn('Failed to create Color object:', error);
        }
      }
    },
    [onChange, onValidationChange]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      validateInput(newValue);
    },
    [validateInput]
  );

  const handleBlur = useCallback(() => {
    setIsFocused(false);

    if (autoCorrect && inputValue.trim()) {
      const result = validateAndParseColor(inputValue);
      if (result.isValid && result.correctedValue && result.correctedValue !== inputValue) {
        setInputValue(result.correctedValue);
      }
    }
  }, [inputValue, autoCorrect]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && autoCorrect && inputValue.trim()) {
        const result = validateAndParseColor(inputValue);
        if (result.isValid && result.correctedValue && result.correctedValue !== inputValue) {
          setInputValue(result.correctedValue);
        }
      }
    },
    [inputValue, autoCorrect]
  );

  const getValidationIcon = () => {
    if (!showValidationIcon || !inputValue.trim()) return null;

    if (validationState.isValid) {
      return (
        <svg
          className="h-4 w-4 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      );
    } else {
      return (
        <svg
          className="h-4 w-4 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      );
    }
  };

  const getColorPreview = () => {
    if (!inputValue.trim() || !validationState.isValid) return null;

    try {
      const hexColor = parseColorString(inputValue);
      return (
        <div
          className="h-4 w-4 flex-shrink-0 rounded border border-gray-300"
          style={{ backgroundColor: hexColor }}
          aria-hidden="true"
        />
      );
    } catch {
      return null;
    }
  };

  const inputClasses = cn(
    'w-full px-3 py-2 text-sm border rounded-md transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50',
    {
      'border-gray-300': validationState.isValid || !inputValue.trim(),
      'border-red-500': !validationState.isValid && inputValue.trim(),
      'pr-20': showValidationIcon || (validationState.isValid && inputValue.trim()),
      'pr-12': showValidationIcon && !(validationState.isValid && inputValue.trim()),
    },
    className
  );

  return (
    <div className="space-y-1">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          aria-label={ariaLabel || 'Color input'}
          aria-invalid={!validationState.isValid}
          aria-describedby={validationState.showError ? 'color-input-error' : undefined}
        />

        {(showValidationIcon || (validationState.isValid && inputValue.trim())) && (
          <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-3">
            {getColorPreview()}
            {getValidationIcon()}
          </div>
        )}
      </div>

      {validationState.showError && validationState.error && (
        <p
          id="color-input-error"
          className="text-xs text-red-600"
          role="alert"
        >
          {validationState.error}
        </p>
      )}

      {isFocused && !validationState.showError && (
        <p className="text-xs text-gray-500">Supported formats: #RGB, #RRGGBB, rgb(r,g,b), rgba(r,g,b,a), hsl(h,s%,l%), hsla(h,s%,l%,a), or color names</p>
      )}
    </div>
  );
};
