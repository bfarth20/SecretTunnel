import { useState } from "react";
import { useAuth } from "./AuthContext";

/** Users can enter their name to receive a token from the API. */
export default function Entrance() {
  const [name, setName] = useState("");
  const { signup, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(name, "dummy-password");
  };

  return (
    <div className="card">
      <h1>Cave Entrance</h1>
      <p>Your journey has brought you to the base of a rocky mountain.</p>
      <p>
        The quickest path forward is through the mountain's winding tunnels, but
        a sturdy metal gate sits closed before you.
      </p>
      <p>
        Two giant badgers stand guard on either side of the gate, their eyes
        fixed on you. The one on the left opens its mouth, and with a deep,
        rumbling voice, it asks, "Who approaches? Speak your name."
      </p>

      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Respond</button>
      </form>
    </div>
  );
}
