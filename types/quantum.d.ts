export type AtomLayer = string; // For example: "0¹", "0²"

export type Atom = {
  symbol: string;
  layers: AtomLayer[];
};

export type Molecule = Atom[];