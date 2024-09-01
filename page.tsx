"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [userPoints, setUserPoints] = useState<number>(0);
  const [supplyPercentage, setSupplyPercentage] = useState<number>(2.5);
  const [valuations, setValuations] = useState<number[]>([]);

  const initialPoints = 10000000; // 10 million
  const totalTokenSupply = 1000000000; // 1 billion tokens

  useEffect(() => {
    setValuations([50000000, 75000000, 100000000, 250000000, 500000000, 1000000000, 2000000000]);
  }, []);

  const calculateValues = () => {
    const currentTotalPoints = initialPoints;
    const tokenSupplyForTradingPoints = (supplyPercentage / 100) * totalTokenSupply;

    return valuations.map(valuation => {
      const userTokenAllocation = (userPoints / currentTotalPoints) * tokenSupplyForTradingPoints;
      const dollarValue = (userTokenAllocation / totalTokenSupply) * valuation;
      return {
        valuation: valuation >= 1000000000 ? 
          `$${(valuation / 1000000000).toFixed(1)}B` : 
          `$${(valuation / 1000000).toFixed(0)}M`,
        value: `$${dollarValue.toFixed(2)}`
      };
    });
  };

  const changeSupplyPercentage = (change: number) => {
    setSupplyPercentage(prev => Math.max(0.1, Math.min(100, prev + change)));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Existing content */}
      {/* ... */}

      {/* Polynomial Points Checker */}
      <div className="w-full max-w-md mt-8 p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Polynomial Points Checker</h2>
        <input
          type="number"
          value={userPoints}
          onChange={(e) => setUserPoints(Number(e.target.value))}
          placeholder="Enter your points"
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="flex items-center justify-between mb-4">
          <span>% of token for trading:</span>
          <div className="flex items-center">
            <button onClick={() => changeSupplyPercentage(-1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
            <span className="mx-2">{supplyPercentage.toFixed(1)}%</span>
            <button onClick={() => changeSupplyPercentage(1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Valuation</th>
                <th className="text-left">Your Value</th>
              </tr>
            </thead>
            <tbody>
              {calculateValues().map((row, index) => (
                <tr key={index}>
                  <td>{row.valuation}</td>
                  <td>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Existing content */}
      {/* ... */}
    </main>
  );
}
