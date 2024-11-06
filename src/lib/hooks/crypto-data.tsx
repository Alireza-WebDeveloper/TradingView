import { useState, useEffect } from 'react';
import { convertToTimeString } from '../utils/format-time';
import { fetchCryptoData } from '../services/crypto';

const useCryptoData = (currency: string, dateRangeTab: string) => {
  const [cryptoData, setCryptoData] = useState<any[]>([]);

  const updateCryptoData = (newPrice: number) => {
    const newTimestamp = convertToTimeString(Date.now());
    setCryptoData((prevData) => [
      ...prevData,
      { timestamp: newTimestamp, price: newPrice },
    ]);
  };

  useEffect(() => {
    let days = 1;
    if (dateRangeTab === '1d') days = 1;
    else if (dateRangeTab === '1w') days = 7;
    else if (dateRangeTab === '1m') days = 30;
    else if (dateRangeTab === '3m') days = 90;
    else if (dateRangeTab === '1y') days = 365;

    fetchCryptoData(currency.toLowerCase(), days).then(setCryptoData);

    const socket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${currency.toLowerCase()}@trade`
    );

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newPrice = parseFloat(data.p);
      updateCryptoData(newPrice);
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    return () => {
      socket.close();
    };
  }, [currency, dateRangeTab]);

  return cryptoData;
};

export default useCryptoData;
