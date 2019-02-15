import React, { useState } from 'react';

import 'tachyons';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="h4 w4 f2" onClick={() => setCount(count + 1)}>
      {count}
    </div>
  );
}

export default App;
