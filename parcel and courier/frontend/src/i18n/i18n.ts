import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all translation files
import en from '../locales/en.json';
import es from '../locales/es.json';
import zh from '../locales/zh.json';
import hi from '../locales/hi.json';
import ar from '../locales/ar.json';
import fr from '../locales/fr.json';
import ru from '../locales/ru.json';
import pt from '../locales/pt.json';
import de from '../locales/de.json';
import ja from '../locales/ja.json';

// Type definition for translation resources
type TranslationResources = {
  [key: string]: {
    translation: typeof en;
  };
};

const resources: TranslationResources = {
  en: { translation: en },
  es: { translation: es },
  zh: { translation: zh },
  hi: { translation: hi },
  ar: { translation: ar },
  fr: { translation: fr },
  ru: { translation: ru },
  pt: { translation: pt },
  de: { translation: de },
  ja: { translation: ja },
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'en', // Default language
    supportedLngs: ['en', 'es', 'zh', 'hi', 'ar', 'fr', 'ru', 'pt', 'de', 'ja'],
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      htmlTag: document.documentElement,
    },
    react: {
      useSuspense: false, // You can enable this if you're using Suspense
    },
  });

// Function to change language and update HTML direction
export const changeLanguage = (lng: string) => {
  const html = document.documentElement;
  html.lang = lng;
  html.dir = lng === 'ar' ? 'rtl' : 'ltr';
  return i18n.changeLanguage(lng);
};

export default i18n;