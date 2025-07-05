// Fishies.jsx (renamed maybe to GameWrapper.jsx?)
import { useLocation } from 'react-router-dom';
import Layout from './Layout';

const Fishies = () => {
  const query = new URLSearchParams(useLocation().search);
  const game = query.get('game');

  const gameSrc = game === 'fishies' ? '/fishies/index.html' : null;

  return (
    <Layout>
      <div className="w-full h-screen bg-black flex items-center justify-center">
        {gameSrc ? (
          <iframe
            src={gameSrc}
            title="Fishies Game"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <p>Game not found</p>
        )}
      </div>
    </Layout>
  );
};

export default Fishies;
