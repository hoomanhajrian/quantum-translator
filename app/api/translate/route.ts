// File: app/api/translate/route.ts

export async function POST(req: Request) {
    const { data, type } = await req.json();
  
    // Check for valid input format
    if (!data || typeof data !== "string") {
      return new Response(
        JSON.stringify({
          error: "Invalid input. Please provide a chemical formula.",
        }),
        { status: 400 }
      );
    }
  
    try {
      const quantumState = convertToQuantumState(data);
      return new Response(
        JSON.stringify({ output: quantumState }),
        { status: 200 }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Translation failed. Please check your input." }),
        { status: 400 }
      );
    }
  }
  
  // Function to convert chemical formula to quantum state format
  function convertToQuantumState(formula: string): string {
    const elements: { [key: string]: string } = {
      H: "0²", // Hydrogen
      O: "0²:0⁸", // Oxygen
      // Add more elements as needed
    };
  
    // Regular expression to match chemical formula (e.g., H2O, NaCl)
    const regex = /([A-Z][a-z]*)(\d*)/g;
    let match;
    let quantumState = "";
  
    while ((match = regex.exec(formula)) !== null) {
      const element = match[1]; // Atom name (H, O, etc.)
      const count = match[2] || "1"; // Number of atoms (default to 1 if not provided)
  
      // Check if we have a valid element in our mapping
      if (elements[element]) {
        // Append the quantum state of the atom
        quantumState += elements[element];
        if (Number(count) > 1) {
          quantumState += count; // Append the atom count (e.g., H2)
        }
        quantumState += ":";
      } else {
        throw new Error(`Element ${element} is not supported.`);
      }
    }
  
    // Remove last ":" from the string
    return quantumState.slice(0, -1);
  }
  