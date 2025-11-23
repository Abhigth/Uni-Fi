export function interestScore(a: string[], b: string[]): number {
  if (!a.length || !b.length) return 0;

  const setA = new Set(a.map(i => i.toLowerCase().trim()));
  const setB = new Set(b.map(i => i.toLowerCase().trim()));

  const intersection = [...setA].filter(x => setB.has(x));

  const score = intersection.length / Math.max(setA.size, setB.size);
  return score; // 0 to 1
}

export function studyStyleScore(a?: string, b?: string): number {
  if (!a || !b) return 0;

  if (a === b) return 1;
  if (a === "flexible" || b === "flexible") return 0.7;

  return 0; // incompatible
}

export function preferredTimeScore(a?: string, b?: string): number {
  if (!a || !b) return 0;
  return a === b ? 1 : 0;
}

export function branchScore(a?: string, b?: string): number {
  if (!a || !b) return 0;
  return a.toLowerCase() === b.toLowerCase() ? 1 : 0;
}

export function yearScore(a?: number, b?: number): number {
  if (!a || !b) return 0;
  
  const diff = Math.abs(a - b);
  if (diff === 0) return 1;
  if (diff === 1) return 0.7;
  if (diff === 2) return 0.4;
  return 0;
}
