import Form from "@/components/Form";
import { useState } from "react";
import i18n from "i18next";
import { useNavigate } from "react-router-dom";

export default function LanguagePreference() {
  const navigate = useNavigate();
  const countries = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "gb", label: "United Kingdom" },
    { value: "et", label: "Ethiopia" },
    { value: "fr", label: "France" },
    { value: "de", label: "Germany" },
    { value: "jp", label: "Japan" },
    { value: "cn", label: "China" },
    { value: "in", label: "India" },
    { value: "br", label: "Brazil" },
    { value: "au", label: "Australia" },
    { value: "za", label: "South Africa" },
    { value: "ng", label: "Nigeria" },
    { value: "ke", label: "Kenya" },
    { value: "gh", label: "Ghana" },
    { value: "mx", label: "Mexico" },
    { value: "es", label: "Spain" },
    { value: "it", label: "Italy" },
    { value: "ru", label: "Russia" },
    { value: "sa", label: "Saudi Arabia" },
    { value: "ae", label: "United Arab Emirates" },
    { value: "eg", label: "Egypt" },
    { value: "tr", label: "Turkey" },
    { value: "pk", label: "Pakistan" },
    { value: "bd", label: "Bangladesh" },
    { value: "id", label: "Indonesia" },
    { value: "th", label: "Thailand" },
    { value: "vn", label: "Vietnam" },
    { value: "kr", label: "South Korea" },
    { value: "my", label: "Malaysia" },
    { value: "sg", label: "Singapore" },
    { value: "ph", label: "Philippines" },
    { value: "ar", label: "Argentina" },
    { value: "cl", label: "Chile" },
    { value: "co", label: "Colombia" },
    { value: "pe", label: "Peru" },
    { value: "ve", label: "Venezuela" },
    { value: "se", label: "Sweden" },
    { value: "no", label: "Norway" },
    { value: "dk", label: "Denmark" },
    { value: "fi", label: "Finland" },
    { value: "nl", label: "Netherlands" },
    { value: "be", label: "Belgium" },
    { value: "ch", label: "Switzerland" },
    { value: "pl", label: "Poland" },
    { value: "ua", label: "Ukraine" },
    { value: "ir", label: "Iran" },
    { value: "iq", label: "Iraq" },
    { value: "sy", label: "Syria" },
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

  const [currentCountry, setCurrentCountry] = useState<string>(
    countries[0].value
  );
  const [currentLanguage, setCurrentLanguage] = useState<string>(
    languages[0].value
  );
  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <Form
      forWhich="language"
      onContinue={() => navigate("/home")}
      countries={countries}
      currentCountry={currentCountry}
      setCountry={setCurrentCountry}
      languages={languages}
      setLanguage={handleLanguageChange} // 👈 use our custom handler
      currentLanguage={currentLanguage}
    />
  );
}
