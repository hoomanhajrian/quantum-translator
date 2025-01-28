"use client";
import React, { useState } from 'react';
import { Atom, AtomLayer, Molecule } from '@/types/quantum';

const Translator: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  const handleTranslate = () => {
    const translated = translateToQuantumState(input);
    setOutput(translated);
  };

  const translateToQuantumState = (input: string): string => {
    // Define the atom mappings for known elements
    const atomMappings: { [key: string]: Atom } = {
      H: { symbol: 'H', layers: ['0¹'] },  // Hydrogen (1 electron)
      He: { symbol: 'He', layers: ['0²'] }, // Helium (2 electrons)
      O: { symbol: 'O', layers: ['0²', '0⁸'] }, // Oxygen (8 electrons)
      // Add more elements as needed
    };

    // Regex to find all atoms and their quantities (e.g., H2, O2, etc.)
    const atomRegex = /([A-Z][a-z]*)(\d*)/g;
    const matches = [...input.matchAll(atomRegex)];

    let molecule: Molecule = [];

    // Iterate through matches and create the molecule with the correct number of atoms
    matches.forEach(([_, atomSymbol, atomCount]) => {
      const atom = atomMappings[atomSymbol]; // Get atom details
      const count = atomCount === '' ? 1 : parseInt(atomCount); // Default to 1 if no number is provided

      for (let i = 0; i < count; i++) {
        molecule.push(atom); // Add atom to the molecule
      }
    });

    // Return the quantum state representation as a string
    // Join the atom layers with ':' for each atom and concatenate without '=' between atoms
    return molecule.map(atom => atom.layers.join(':')).join(':');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Quantum State Translator</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-3 w-full mb-4 rounded-lg text-lg"
          placeholder="Enter molecule (e.g., H2O)"
        />
        <button
          onClick={handleTranslate}
          className="bg-blue-600 text-white p-3 w-full rounded-lg text-lg"
        >
          Translate
        </button>
        <div className="mt-6">
          <h2 className="font-semibold text-xl mb-2">Quantum State Representation:</h2>
          <p className="text-lg text-gray-700">{output || 'Translation will appear here'}</p>
        </div>
      </div>
    </div>
  );
};

export default Translator;
