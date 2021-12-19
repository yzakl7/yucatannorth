import { createContext, useState, useContext, ReactNode, useEffect } from 'react'
import { dictionaryList, languageOptions } from './dictionary/getLanguage';

export const LangContext = createContext({
  userLanguage: 'es',
  dictionary: dictionaryList.es,
  userLanguageChange: (selected: string) => {}
});

type AuthProvideProps = {
  children: ReactNode
}

export const LangProvider = ({ children }:AuthProvideProps) => {
  const [userLanguage, setUserLanguage] = useState('');

  const list: any = dictionaryList
  const options: any = languageOptions
  const provider = {
    userLanguage,
    dictionary: list[userLanguage],
    userLanguageChange: (selected:string) => {
      const newLanguage = options[selected] ? selected : 'es'
      window.localStorage.setItem('rcml-lang', newLanguage);
      setUserLanguage(newLanguage);
    }
  };
  
  useEffect(() => {
    const defaultLanguage = window.localStorage.getItem('rcml-lang');
    setUserLanguage(defaultLanguage || 'en')
  }, [])

  return (
    <LangContext.Provider value={provider}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext)