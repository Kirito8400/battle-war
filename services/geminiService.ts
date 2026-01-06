import { GoogleGenAI, Type } from "@google/genai";
import { Character, Arena, BattleResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const simulateBattle = async (
  char1: Character,
  char2: Character,
  arena: Arena
): Promise<BattleResult> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Simulate a dramatic anime-style battle between ${char1.name} and ${char2.name} in the ${arena.name}.
    
    Character 1 (${char1.name}): 
    Role: ${char1.role}, Special: ${char1.specialMove}, Stats: Power ${char1.stats.power}, Speed ${char1.stats.speed}, Defense ${char1.stats.defense}.
    Description: ${char1.description}

    Character 2 (${char2.name}): 
    Role: ${char2.role}, Special: ${char2.specialMove}, Stats: Power ${char2.stats.power}, Speed ${char2.stats.speed}, Defense ${char2.stats.defense}.
    Description: ${char2.description}

    Arena Environment: ${arena.description}

    The battle should last between 4 to 6 rounds. 
    Ensure the "attacker" field switches or stays based on flow, but ensure damage is applied logically based on stats.
    The damageDealt should be an integer between 10 and 40.
    The remainingHealth calculation must start at 100 for both and decrease round by round.
    If remainingHealth drops to 0 or below, that character loses.
    
    Return a JSON response following the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            winner: { type: Type.STRING, enum: ['player1', 'player2', 'draw'] },
            summary: { type: Type.STRING, description: "A brief epic summary of the battle result." },
            rounds: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  roundNumber: { type: Type.INTEGER },
                  narrative: { type: Type.STRING, description: "One or two sentences describing the action, anime style." },
                  attacker: { type: Type.STRING, enum: ['player1', 'player2'] },
                  damageDealt: { type: Type.INTEGER },
                  isSpecialMove: { type: Type.BOOLEAN },
                  moveName: { type: Type.STRING },
                  remainingHealthP1: { type: Type.INTEGER },
                  remainingHealthP2: { type: Type.INTEGER }
                },
                required: ['roundNumber', 'narrative', 'attacker', 'damageDealt', 'isSpecialMove', 'moveName', 'remainingHealthP1', 'remainingHealthP2']
              }
            }
          },
          required: ['winner', 'rounds', 'summary']
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as BattleResult;
    }
    throw new Error("No text response from AI");

  } catch (error) {
    console.error("Battle Simulation Failed:", error);
    // Fallback mock response in case of API error/limit
    return {
      winner: 'player1',
      summary: 'The battle simulation connection was interrupted, but Player 1 emerged victorious by default.',
      rounds: [
        {
          roundNumber: 1,
          narrative: "Communication error with battle server. Simulation compromised.",
          attacker: 'player1',
          damageDealt: 10,
          isSpecialMove: false,
          moveName: "System Glitch",
          remainingHealthP1: 100,
          remainingHealthP2: 90
        }
      ]
    };
  }
};
