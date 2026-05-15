import React from 'react';
import BackToTop from '@site/src/components/BackToTop';
import ReadingProgress from '@site/src/components/ReadingProgress';
import TextReader from '@site/src/components/TextReader';
import VisitorTracker from '@site/src/components/VisitorTracker';

export default function Root({children}) {
  return (
    <>
      <VisitorTracker />
      <ReadingProgress />
      <TextReader />
      {children}
      <BackToTop />
    </>
  );
}
