import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const en = {
  "appTitle": "AI Padel Court Designer",
  "githubLink": "Go to GitHub repository",
  "aiDesignerTitle": "AI Designer",
  "promptPlaceholder": "e.g., A futuristic court with neon blue accents",
  "generating": "Generating...",
  "generateDesign": "Generate Design",
  "unknownError": "An unknown error occurred.",
  "manualControlsTitle": "Manual Controls",
  "resetToDefault": "Reset to default",
  "courtColor": "Court Color",
  "linesColor": "Lines Color",
  "outOfPlayColor": "Out of Play Color",
  "frameColor": "Frame Color",
  "netColor": "Net Color",
  "netLogoColor": "Net Logo Color",
  "glassOpacity": "Glass Opacity",
  "dimensionLength": "Length: {length}m",
  "dimensionWidth": "Width: {width}m",
  "dimensionWallHeight": "Wall Height: {height}m"
};

const id = {
  "appTitle": "Desainer Lapangan Padel AI",
  "githubLink": "Buka repositori GitHub",
  "aiDesignerTitle": "Desainer AI",
  "promptPlaceholder": "cth., Lapangan futuristik dengan aksen neon biru",
  "generating": "Membuat...",
  "generateDesign": "Buat Desain",
  "unknownError": "Terjadi kesalahan yang tidak diketahui.",
  "manualControlsTitle": "Kontrol Manual",
  "resetToDefault": "Setel ulang ke default",
  "courtColor": "Warna Lapangan",
  "linesColor": "Warna Garis",
  "outOfPlayColor": "Warna Area Luar",
  "frameColor": "Warna Rangka",
  "netColor": "Warna Jaring",
  "netLogoColor": "Warna Logo Jaring",
  "glassOpacity": "Opasitas Kaca",
  "dimensionLength": "Panjang: {length}m",
  "dimensionWidth": "Lebar: {width}m",
  "dimensionWallHeight": "Tinggi Dinding: {height}m"
};


type Language = 'en' | 'id';
type Translations = Record<string, string>;
type I18nContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
};

const translations: Record<Language, Translations> = { en, id };

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language') as Language;
    return savedLang && ['en', 'id'].includes(savedLang) ? savedLang : 'id';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  
  const setLanguage = (lang: Language) => {
      setLanguageState(lang);
  };

  const t = useCallback((key: string, replacements?: Record<string, string | number>) => {
    let translation = translations[language][key] || key;
    if (replacements) {
        Object.entries(replacements).forEach(([placeholder, value]) => {
            translation = translation.replace(`{${placeholder}}`, String(value));
        });
    }
    return translation;
  }, [language]);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};