import { useState } from "react";
import { useAuth } from "./AuthContext";

/** Button that attempts to use the token in context when clicked */
export default function Tablet() {
  const { authenticate } = useAuth();
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await authenticate();
      setError("");
    } catch (err) {
      setError(err.message || "Authentication failed.");
    }
  }

  return (
    <section className="card">
      <p>
        The sound of your name thuds against the gate as the two badgers furrow
        their brows. The badger on the right beckons you to approach.
      </p>
      <p>"Only those who are pure of heart may pass."</p>
      <p>
        "Place your hand upon this stone tablet, and thus will your true self be
        revealed."
      </p>
      <p>
        It holds out a rectangular stone tablet carved with an intricate design.
      </p>
      <form onSubmit={handleSubmit}>
        <button className="glow-button">
          Place your palm upon the tablet.
        </button>
      </form>
      {error && <p>{error}</p>}
    </section>
  );
}
