
import React, { useState, useCallback, Suspense } from 'react';
import type { CourtDesign, CourtDesignPartial } from './types';
import { generateCourtDesign } from './services/geminiService';
import ControlPanel from './components/ControlPanel';
import Canvas3D from './components/Canvas3D';
import Loader from './components/Loader';
import { GithubIcon } from './components/Icons';

const DEFAULT_DESIGN: CourtDesign = {
  courtColor: '#005A9C',
  linesColor: '#FFFFFF',
  outOfPlayColor: '#0E76BC',
  frameColor: '#1a202c',
  glassOpacity: 0.15,
  netColor: '#111827',
  logoColor: '#FFFFFF',
};

function App() {
  const [design, setDesign] = useState<CourtDesign>(DEFAULT_DESIGN);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDesignChange = useCallback((newValues: CourtDesignPartial) => {
    setDesign(prev => ({ ...prev, ...newValues }));
  }, []);

  const handleAiGenerate = useCallback(async (prompt: string) => {
    if (!prompt) return;
    setIsLoading(true);
    setError(null);
    try {
      const aiDesign = await generateCourtDesign(prompt);
      setDesign(prev => ({ ...prev, ...aiDesign }));
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Terjadi kesalahan yang tidak diketahui.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-gray-900 text-white font-sans">
      <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-20">
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-wider">Desainer Lapangan Padel AI</h1>
        <a href="https://github.com/google/genai-api-web-apps" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors">
          <GithubIcon className="w-8 h-8" />
        </a>
      </header>

      <ControlPanel
        design={design}
        onDesignChange={handleDesignChange}
        onAiGenerate={handleAiGenerate}
        isLoading={isLoading}
        error={error}
        onReset={() => setDesign(DEFAULT_DESIGN)}
      />

      <main className="flex-1 h-screen min-h-[500px] lg:h-auto">
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center bg-gray-800"><Loader /></div>}>
          <Canvas3D design={design} />
        </Suspense>
      </main>
    </div>
  );
}

export default App;