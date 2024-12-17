'use client';

import { useState, useEffect } from 'react';
import { Gift, Snowflake, Star, Bell, Sparkles, TreePine, Music, Heart } from 'lucide-react';
import SpinningWheel from './components/SpinningWheel/SpinningWheel';
interface SnowflakeType {
  id: number;
  left: string;
  animationDelay: string;
  animationDuration: string;
}

export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [cryptoName, setCryptoName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [snowflakes, setSnowflakes] = useState<SnowflakeType[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showSpinWheel, setShowSpinWheel] = useState(false);

  useEffect(() => {
    setMounted(true);
    const newSnowflakes = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 3 + 2}s`,
    }));
    setSnowflakes(newSnowflakes);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (response.ok) {
        setCryptoName(data.cryptoName);
        setIsSubmitted(true);
        setShowSpinWheel(true);
      } else {
        setErrorMessage(data.error || 'An unexpected error occurred.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to connect to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-300 via-red-100 to-green-200 p-8 flex items-center justify-center relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Christmas Trees */}
        <TreePine className="absolute top-10 left-10 w-16 h-16 text-green-600 animate-bounce" style={{ animationDelay: '0.5s' }} />
        <TreePine className="absolute top-20 right-12 w-12 h-12 text-green-700 animate-bounce" style={{ animationDelay: '1s' }} />
        <Music className="absolute bottom-10 right-10 w-10 h-10 text-red-500 animate-pulse" />
        <Heart className="absolute bottom-20 left-12 w-8 h-8 text-red-600 animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Snow effect */}
      {snowflakes.map((snowflake) => (
        <div
          key={snowflake.id}
          className="absolute animate-fall"
          style={{
            left: snowflake.left,
            animationDelay: snowflake.animationDelay,
            animationDuration: snowflake.animationDuration,
          }}
        >
          <Snowflake className="w-3 h-3 text-white opacity-30" />
        </div>
      ))}

      <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl p-8 transform transition-all duration-500 ease-in-out hover:scale-105 relative z-10 border border-white/20">
        {/* Top Decorations */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex gap-4">
          <Bell className="w-12 h-12 text-red-600 animate-ring" />
        </div>

        {/* Side Decorations */}
        <div className="absolute -left-6 top-1/2 transform -translate-y-1/2">
          <Star className="w-8 h-8 text-yellow-400 animate-twinkle" />
        </div>
        <div className="absolute -right-6 top-1/2 transform -translate-y-1/2">
          <Star className="w-8 h-8 text-yellow-400 animate-twinkle" style={{ animationDelay: '1s' }} />
        </div>

        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-red-600 via-green-600 to-red-600 bg-clip-text text-transparent">
          <div className="flex items-center justify-center gap-4">
            <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
            Secret Santa
            <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
        </h1>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded animate-shake">
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}
            <div className="group">
              <label htmlFor="email" className="block mb-2 font-medium text-gray-700 group-hover:text-red-600 transition-colors">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-red-300"
                placeholder="santa@northpole.com"
              />
            </div>

            <div className="group">
              <label htmlFor="name" className="block mb-2 font-medium text-gray-700 group-hover:text-red-600 transition-colors">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:border-red-300"
                placeholder="Kris Kringle"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-md font-medium flex items-center justify-center space-x-2 hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-102 active:scale-98"
            >
              {isLoading ? (
                <>
                  <Snowflake className="animate-spin" />
                  <span>Summoning Santa's Magic...</span>
                </>
              ) : (
                <>
                  <Gift className="animate-bounce" />
                  <span>Generate Secret Santa Name</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold mb-4 text-green-600 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 animate-spin" />
              Your Secret Santa Name
              <Sparkles className="w-6 h-6 animate-spin" />
            </h2>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-green-500 to-red-500 rounded-lg blur group-hover:blur-md transition-all duration-300"></div>
              <p className="relative bg-white text-3xl font-bold p-6 rounded-lg border-4 border-green-500 inline-block text-green-600 transform transition-transform hover:scale-105">
                {cryptoName}
              </p>
            </div>
            <p className="text-sm text-green-600 animate-bounce">
              <span className="inline-block">🎄</span>
              Happy gifting, {name}!
              <span className="inline-block">🎄</span>
            </p>

            {showSpinWheel && (
              <div className="mt-8 animate-fadeIn">
                <h3 className="text-xl font-bold mb-4 text-red-600">Spin the Wheel of Fortune!</h3>
                <SpinningWheel
                  names={[
                    "MysticPhoenix",
                    "CosmicDragon",
                    "QuantumNexus",
                    "StellarMatrix",
                    "CryptoVector",
                    "DigitalPulse",
                    "NeuralNova",
                    "CyberSpark"
                  ]}
                  onSelectName={(selectedName: string) => {
                    console.log('Selected:', selectedName);
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}