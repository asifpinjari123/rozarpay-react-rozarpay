
import { useEffect, useState } from 'react';

export const useScript = (url) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isScriptLoadSucceed, setIsScriptLoadSucceed] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;

    script.onload = () => {
      setIsScriptLoaded(true);
      setIsScriptLoadSucceed(true);
    };

    script.onerror = () => {
      setIsScriptLoaded(true);
      setIsScriptLoadSucceed(false);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);

  return {
    isScriptLoaded,
    isScriptLoadSucceed,
  };
};
