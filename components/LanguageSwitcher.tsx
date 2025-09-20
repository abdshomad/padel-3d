import React from 'react';
import { useI18n } from '../contexts/i18n';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useI18n();

    const commonClasses = "px-3 py-1 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500";
    const activeClasses = "bg-blue-600 text-white";
    const inactiveClasses = "bg-gray-700 text-gray-300 hover:bg-gray-600";

    return (
        <div className="flex items-center p-1 space-x-1 bg-gray-800 rounded-lg">
            <button
                onClick={() => setLanguage('id')}
                className={`${commonClasses} ${language === 'id' ? activeClasses : inactiveClasses}`}
                aria-pressed={language === 'id'}
            >
                ID
            </button>
            <button
                onClick={() => setLanguage('en')}
                className={`${commonClasses} ${language === 'en' ? activeClasses : inactiveClasses}`}
                aria-pressed={language === 'en'}
            >
                EN
            </button>
        </div>
    );
};

export default LanguageSwitcher;
