import { useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [telegramId, setTelegramId] = useState('');
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    setError('');
    try {
      const res = await axios.post('/api/user', { telegramId });
      setProfile(res.data);
    } catch (e) {
      setError('Profile not found.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <input
        className="border px-4 py-2 mb-2 rounded"
        placeholder="Enter your Telegram ID"
        value={telegramId}
        onChange={e => setTelegramId(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
        onClick={fetchProfile}
      >
        Fetch Profile
      </button>
      {profile && (
        <div className="mt-4 p-4 border rounded bg-pink-50">
          <div><b>Telegram ID:</b> {profile.telegram_id}</div>
          <div><b>Challenges Completed:</b> {profile.challenges_completed || 0}</div>
        </div>
      )}
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}
