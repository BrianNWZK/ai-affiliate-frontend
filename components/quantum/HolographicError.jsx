export const HolographicError = ({ title, message, action }) => (
  <div className="holographic-error">
    <div className="hologram-effect">
      <h2>{title}</h2>
      <p>{message}</p>
      {action && (
        <button onClick={action.handler}>
          {action.label}
        </button>
      )}
    </div>
  </div>
)
