export const QuantumLoader = ({ message }) => (
  <div className="quantum-loader">
    <div className="quantum-sphere">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="quantum-orbital" style={{ '--i': i }} />
      ))}
    </div>
    <p className="quantum-message">{message}</p>
  </div>
)
