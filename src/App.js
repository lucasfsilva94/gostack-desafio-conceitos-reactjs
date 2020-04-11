import React, { useState, useEffect } from "react";
import api from "./services/api.js";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((res) => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: `Repositorio: ${Date.now()}`,
      url: "https://github.com/lucasfsilva94",
      techs: ["Node", "ReactJS", "React Native"],
    };
    
    const res = await api.post("repositories", repository);

    setRepositories([...repositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter((repo) => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid={"repository-list"}>
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
