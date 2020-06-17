import React from "react";
import api from './services/api';

import "./styles.css";
import { useState, useEffect } from 'react';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repo ${Date.now()}`,
      url: "github.com/fsdude",
      techs: ["Python, Javascript, C, C++"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const lastRepositories = repositories.filter(
      repository => repository.id !== id
    );

    setRepositories(lastRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">{
        repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
              < button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
            </button>
            </li>
          );
        })
      }
      </ul >

      <button onClick={handleAddRepository}>Adicionar</button>
    </div >
  );
}

export default App;
