
import React, { useState } from 'react';
import type { CourtDesign, CourtDesignPartial } from '../types';
import { GenerateIcon, ResetIcon } from './Icons';
import Loader from './Loader';

interface ControlPanelProps {
  design: CourtDesign;
  onDesignChange: (newValues: CourtDesignPartial) => void;
  onAiGenerate: (prompt: string) => void;
  isLoading: boolean;
  error: string | null;
  onReset: () => void;
}

const ColorInput = ({ label, value, onChange }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="flex items-center justify-between">
    <label className="text-sm text-gray-300">{label}</label>
    <div className="relative w-10 h-10 rounded-md border-2 border-gray-600 overflow-hidden">
      <input
        type="color"
        value={value}
        onChange={onChange}
        className="absolute top-[-2px] left-[-2px] w-12 h-12 cursor-pointer"
      />
    </div>
  </div>
);

function ControlPanel({ design, onDesignChange, onAiGenerate, isLoading, error, onReset }: ControlPanelProps) {
  const [prompt, setPrompt] = useState('');
  
  const handleGenerateClick = () => {
    onAiGenerate(prompt);
  };

  return (
    <aside className="w-full lg:w-96 bg-gray-800/80 backdrop-blur-sm p-6 pt-24 lg:pt-6 space-y-6 overflow-y-auto z-10 border-r border-gray-700">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-blue-300">Desainer AI</h2>
        <div className="space-y-3">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="cth., Lapangan futuristik dengan aksen neon biru"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-white placeholder-gray-400"
            rows={3}
          />
          <button
            onClick={handleGenerateClick}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-all duration-300"
          >
            {isLoading ? <Loader /> : <GenerateIcon />}
            {isLoading ? 'Membuat...' : 'Buat Desain'}
          </button>
          {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
        </div>
      </div>

      <div className="border-t border-gray-700 pt-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-300">Kontrol Manual</h2>
            <button onClick={onReset} className="p-2 rounded-full hover:bg-gray-700 transition-colors" title="Setel ulang ke default">
                <ResetIcon className="w-5 h-5" />
            </button>
        </div>
        <div className="space-y-4">
          <ColorInput label="Warna Lapangan" value={design.courtColor} onChange={(e) => onDesignChange({ courtColor: e.target.value })} />
          <ColorInput label="Warna Garis" value={design.linesColor} onChange={(e) => onDesignChange({ linesColor: e.target.value })} />
          <ColorInput label="Warna Area Luar" value={design.outOfPlayColor} onChange={(e) => onDesignChange({ outOfPlayColor: e.target.value })} />
          <ColorInput label="Warna Rangka" value={design.frameColor} onChange={(e) => onDesignChange({ frameColor: e.target.value })} />
          <ColorInput label="Warna Jaring" value={design.netColor} onChange={(e) => onDesignChange({ netColor: e.target.value })} />
          <ColorInput label="Warna Logo Jaring" value={design.logoColor} onChange={(e) => onDesignChange({ logoColor: e.target.value })} />

          <div>
            <label className="text-sm text-gray-300 block mb-2">Opasitas Kaca: {Math.round(design.glassOpacity * 100)}%</label>
            <input
              type="range"
              min="0.05"
              max="0.5"
              step="0.01"
              value={design.glassOpacity}
              onChange={(e) => onDesignChange({ glassOpacity: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default React.memo(ControlPanel);