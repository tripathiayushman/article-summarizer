// App.jsx
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleURL = (e) => {
    setUrl(e.target.value);
  };

  const handleArticleSummary = async (e) => {
    e.preventDefault();
    if (!url || !url.startsWith('http')) {
      alert('Please enter a valid URL!');
      return;
    }

    setLoading(true);

    const options = {
      method: 'GET',
      url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
      params: {
        url: `${url}`,
        lang: 'en',
        engine: '2',
      },
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-key': 'cb56c32aedmsh33b2923d8e8387cp1ff6a5jsn5de498270adc',
        'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com',
      },
    };

    try {
      const res = await axios.request(options);
      setResponse(res.data.summary);
    } catch (error) {
      alert('Failed to fetch the summary. Please try again later!');
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    alert('Summary copied to clipboard!');
  };

  return (
    <div className={`min-h-screen w-screen flex items-center justify-center ${darkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white' : 'bg-gradient-to-br from-blue-50 to-teal-100 text-gray-900'}`}>
      <div className="flex flex-col items-center gap-y-6 p-8 rounded-2xl shadow-2xl transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}">
        <button className="mb-6 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 transition-all" onClick={toggleDarkMode}>
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>

        <h1 className="text-4xl font-extrabold tracking-wide mb-2 text-teal-600">Article Summarizer</h1>
        <p className="text-center text-gray-500 mb-4 ${darkMode ? 'text-gray-400' : ''}">Summarize articles with ease by entering the URL below.</p>

        <div className="flex gap-x-4 w-full max-w-xl">
          <input
            type="url"
            placeholder="Enter article URL"
            className="flex-grow h-12 px-5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-white'}"
            value={url}
            onChange={handleURL}
          />
          <button
            className="h-12 px-6 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 transition-all"
            onClick={handleArticleSummary}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Summarize'}
          </button>
        </div>

        {response && (
          <div className="mt-6 w-full max-w-2xl p-6 bg-teal-50 rounded-2xl shadow-lg overflow-y-auto max-h-64 ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-900'}">
            <h2 className="text-lg font-semibold mb-3 text-purple-600">Summary:</h2>
            <p className="whitespace-pre-wrap leading-relaxed">{response}</p>
            <button
              className="mt-4 px-5 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 focus:ring-4 focus:ring-purple-300 transition-all"
              onClick={copyToClipboard}
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
