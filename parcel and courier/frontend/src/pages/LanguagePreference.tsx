import Form from "@/components/Form";
import { useState } from "react";

export default function LanguagePreference() {
  const [currentCountry, setCurrentCountry] = useState<string | undefined>(
    undefined
  );
  const [currentLanguage, setCurrentLanguage] = useState<string | undefined>(
    ""
  );
  const countries = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "gb", label: "United Kingdom" },
  ];

  const languages = [
    { value: "en", label: "English", flag: "🇬🇧" },
    { value: "es", label: "Spanish", flag: "🇪🇸" },
    { value: "zh", label: "Mandarin", flag: "🇨🇳" },
    { value: "hi", label: "Hindi", flag: "🇮🇳" },
    { value: "ar", label: "Arabic", flag: "🇸🇦" },
    { value: "fr", label: "French", flag: "🇫🇷" },
    { value: "ru", label: "Russian", flag: "🇷🇺" },
    { value: "pt", label: "Portuguese", flag: "🇵🇹" },
    { value: "de", label: "German", flag: "🇩🇪" },
    { value: "ja", label: "Japanese", flag: "🇯🇵" },
  ];

  return (
    <Form
      forWhich="language"
      onContinue={() => {}}
      countries={countries}
      currentCountry={currentCountry}
      setCountry={setCurrentCountry}
      languages={languages}
      setLanguage={setCurrentLanguage}
      currentLanguage={currentLanguage}
    />
  );
}
