import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Redirect to the static HTML page in the public directory
    window.location.href = '/index.html';
  }, []);

  return (
    <div>
      Loading...
    </div>
  );
}

export default App;