import React, { useEffect, useState } from 'react';
import ToolBarFindy from '../components/ToolBarFindy';
import FooterFindy from '../components/FooterFindy';
import SearchBar from '../components/SearchBar';
import ItemCard from '../components/ItemCard';
import { getItems } from '../services/itemService';
import '../styles/HomePage.css';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetch() {
      try {
        const dataRaw = await getItems();
        const dataArr = Array.isArray(dataRaw) ? dataRaw : (dataRaw.itens || []);
        setItems(dataArr);
        setFiltered(dataArr);
      } catch {
        setError('Erro ao carregar itens.');
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFiltered(items);
      return;
    }
    const term = searchTerm.toLowerCase();
    setFiltered(
      items.filter((i) =>
        [i.nome, i.descricao, i.categoria.name, i.localizacao] 
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(term))
      )
    );
  }, [searchTerm, items]);

  return (
    <div className="homepage-container">
      <ToolBarFindy />
      <div className="homepage-content">
        <h1>Procurar item e itens recentes</h1>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Categoria, usuário, local, data..."
        />

        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : filtered.length === 0 ? (
          <p>Nenhum item encontrado.</p>
        ) : (
          <div className="homepage-grid">
            {filtered.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
      <FooterFindy />
    </div>
  );
};

export default HomePage;