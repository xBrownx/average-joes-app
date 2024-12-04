

export const createArcPath = (size: number, strokeWidth: number, rotation: string) => {
  const radius = size / 2;
  const innerRadius = radius - strokeWidth;
  const pathLength = 2 * Math.PI * innerRadius;
  const sweepFlag = rotation === "clockwise" ? "1,0" : "0,1";
  return {
    path: `M ${radius},${strokeWidth} a ${innerRadius},${innerRadius} 0 ${sweepFlag} 0,${2 * innerRadius} a ${innerRadius},${innerRadius} 0 ${sweepFlag} 0,-${2 * innerRadius}`,
    pathLength,
  };
};