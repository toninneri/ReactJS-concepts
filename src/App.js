import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";



function App() {

  const [repositories, setRepositories] = useState([]);
    
    useEffect(() => {
        api.get('repositories').then(res => {
            setRepositories(res.data);
        })
    }, []); 



  async function handleAddRepository() {
    const res = await api.post('repositories', {
      
      title:'Tondev',
      url: 'https://github.com/toninneri',
      techs: ['Node, ReactJS'],
     
  });


  setRepositories([...repositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    // setRepositories(repositories.filter(
    //   repository => repository.id !== id
    // ))
    const newRepositories = repositories.filter(
      repository => repository.id !== id
      )
      setRepositories(newRepositories);

  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => (
             <li key={repository.id}>
              {repository.title}
   
             <button onClick={() => handleRemoveRepository(repository.id)}>
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
