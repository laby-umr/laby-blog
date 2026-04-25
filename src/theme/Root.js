import React from 'react';
import BackToTop from '@site/src/components/BackToTop';
import ReadingProgress from '@site/src/components/ReadingProgress';
import TextReader from '@site/src/components/TextReader';

export default function Root({children}) {
  return (
    <>
      <ReadingProgress />
      <TextReader />
      {children}
      <BackToTop />
    </>
  );
}
