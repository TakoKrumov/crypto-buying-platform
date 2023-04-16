import React, { useState } from 'react';
import CryptoCurrencies from '../CryptoCurrencies/CryptoCurrencies';
import TickerPrice from '../TickerPrice/TickerPrice';

const CombinedComponent = () => {
  const [selectedSymbol, setSelectedSymbol] = useState(null);

  const handleSelectSymbol = (symbol) => {
    setSelectedSymbol(symbol);
  };

  return (
    <div>
      {selectedSymbol && <TickerPrice symbol={selectedSymbol} />}
      <CryptoCurrencies onSymbolSelect={handleSelectSymbol} />
    </div>
  );
};

export default CombinedComponent;
