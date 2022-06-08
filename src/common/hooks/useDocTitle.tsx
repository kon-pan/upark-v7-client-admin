import { useEffect, useState } from 'react';

// Source: https://reactgo.com/react-document-title/
const useDocTitle = (title: any) => {
  const [doctitle, setDocTitle] = useState(title);

  useEffect(() => {
    document.title = doctitle;
  }, [doctitle]);

  return [doctitle, setDocTitle];
};

export { useDocTitle };
