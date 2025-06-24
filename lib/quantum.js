// lib/quantum.js
export async function runQuantumCircuit(qasmCode, provider) {
  const response = await fetch('https://quantum-bridge.onrender.com/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      circuit: qasmCode,
      provider
    })
  });
  return await response.json();
}
