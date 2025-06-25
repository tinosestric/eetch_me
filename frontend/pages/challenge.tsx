import { useState } from 'react';
import axios from 'axios';

export default function Challenge() {
  const [challenge, setChallenge] = useState('');
  const [error, setError] = useState('');

  const fetchChallenge = async () => {
    setError('');
    try {
      const res = await axios.get('/api/challenge');
      setChallenge(res.data.challenge);
    } catch (e) {
      setError('Could not fetch challenge.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h2 className="text-2xl font-bold mb-4">Get a Challenge</h2>
      <button
        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        onClick={fetchChallenge}
      >
        Get Challenge
      </button>
      {challenge && <div className="mt-4 p-4 border rounded bg-purple-50">{challenge}</div>}
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}
