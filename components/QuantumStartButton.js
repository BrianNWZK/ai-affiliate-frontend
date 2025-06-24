// components/QuantumStartButton.js
'use client';
import { useEffect, useState } from 'react';
import { initQuantum } from '@/lib/quantum-init';

export default function QuantumStartButton() {
  const [status, setStatus] = useState('ready');
  const [error, setError] = useState(null);

  const handleStart = async () => {
    try {
      setStatus('starting');
      
      // Initialize Quantum safely
      const quantum = initQuantum();
      if (!quantum.isReady()) {
        throw new Error('Quantum core failed to initialize');
      }

      // Start all systems
      await Promise.all([
        quantum.startRevenueStreams(),
        quantum.activateNeuralNetworks(),
        quantum.enableSelfHealing()
      ]);

      setStatus('active');
    } catch (err) {
      setStatus('error');
      setError(err.message);
      console.error('Startup failed:', err);
    }
  };

  return (
    <div className="quantum-start-container">
      <button
        onClick={handleStart}
        disabled={status === 'starting'}
        className={`quantum-btn ${status}`}
      >
        {status === 'ready' && 'Activate Quantum AI'}
        {status === 'starting' && 'Initializing...'}
        {status === 'active' && 'System Active'}
        {status === 'error' && 'Error Detected'}
      </button>
      
      {error && (
        <div className="quantum-error-alert">
          <p>Error: {error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
          <button onClick={handleStart}>Retry</button>
        </div>
      )}
    </div>
  );
}
