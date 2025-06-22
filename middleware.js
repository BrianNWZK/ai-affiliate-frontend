import { QuantumAICore } from './quantum-ai-core';

const quantumAI = new QuantumAICore();

export function middleware(request) {
  // Initialize Quantum on server start
  if (!global.quantumInitialized) {
    quantumAI.initSystems();
    global.quantumInitialized = true;
  }
  
  // Add Quantum context to all requests
  request.quantum = quantumAI;
}
