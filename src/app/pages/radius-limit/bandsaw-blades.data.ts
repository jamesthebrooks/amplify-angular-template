import { IBandsawBlade } from "./bandsaw-blades.model";

export const bladesImperial: IBandsawBlade[] = [
  // Small blades
  { width: 0.03125, fraction: '1/32', pitch: '32 TPI', minDiameter: 0.09375, rationale: 'Ideal for extremely fine, tight curves in thin hardwoods and softwoods. Best for intricate detail work.' },
  { width: 0.03125, fraction: '1/32', pitch: '24 TPI', minDiameter: 0.1, rationale: 'Good for detailed curves and thin stock cutting. Provides clean, smooth finishes.' },
  { width: 0.03125, fraction: '1/32', pitch: '18 TPI', minDiameter: 0.12, rationale: 'Versatile for thin materials. Offers a balance of speed and precision.' },
  { width: 0.046875, fraction: '3/64', pitch: '32 TPI', minDiameter: 0.125, rationale: 'Perfect for veneers and softwoods. Excellent for intricate details in woodworking.' },
  { width: 0.046875, fraction: '3/64', pitch: '24 TPI', minDiameter: 0.15, rationale: 'For fine detail work and smooth finishes in thin hardwoods.' },
  { width: 0.046875, fraction: '3/64', pitch: '18 TPI', minDiameter: 0.2, rationale: 'Suitable for thin to medium hardwoods. Handles moderately tight curves well.' },
  { width: 0.0625, fraction: '1/16', pitch: '32 TPI', minDiameter: 0.1875, rationale: 'Designed for tight curves in softwoods and thin hardwoods. Great for detail cutting.' },
  { width: 0.0625, fraction: '1/16', pitch: '24 TPI', minDiameter: 0.25, rationale: 'Balanced blade for moderately tight curves in thin materials. Clean cuts for precise work.' },
  { width: 0.0625, fraction: '1/16', pitch: '18 TPI', minDiameter: 0.3, rationale: 'General-purpose blade for thin to medium hardwoods and softwoods. Provides durability and smooth cuts.' },

  // Medium blades
  { width: 0.09375, fraction: '3/32', pitch: '14 TPI', minDiameter: 0.375, rationale: 'Perfect for medium curves and accurate cuts in hardwoods and softwoods. Balances speed and precision.' },
  { width: 0.09375, fraction: '3/32', pitch: '18 TPI', minDiameter: 0.3, rationale: 'For detailed cuts in thin to medium hardwoods. Offers precision with moderate speed.' },
  { width: 0.125, fraction: '1/8', pitch: '10 TPI', minDiameter: 0.5, rationale: 'Good for general-purpose cutting of curves and joinery in hardwoods. Performs well with moderate precision.' },
  { width: 0.125, fraction: '1/8', pitch: '14 TPI', minDiameter: 0.4, rationale: 'Versatile for medium curves and joinery in thin to medium hardwoods.' },
  { width: 0.125, fraction: '1/8', pitch: '18 TPI', minDiameter: 0.375, rationale: 'Ideal for moderately tight curves in softwoods and thin hardwoods.' },
  { width: 0.15625, fraction: '5/32', pitch: '8 TPI', minDiameter: 0.6, rationale: 'Designed for medium-radius curves and slightly thicker hardwoods or softwoods. Offers durability and smooth cuts.' },
  { width: 0.15625, fraction: '5/32', pitch: '10 TPI', minDiameter: 0.5, rationale: 'Great for detailed curves and moderate cuts in hardwoods and softwoods.' },
  { width: 0.1875, fraction: '3/16', pitch: '6 TPI', minDiameter: 0.75, rationale: 'Designed for medium to large curves in hardwoods and softwoods. Provides clean and efficient cuts.' },
  { width: 0.1875, fraction: '3/16', pitch: '8 TPI', minDiameter: 0.625, rationale: 'Suitable for moderate curves in hardwoods. Offers durability for heavy use.' },
  { width: 0.1875, fraction: '3/16', pitch: '10 TPI', minDiameter: 0.5, rationale: 'Good for moderately tight curves in softwoods and hardwoods.' },

  // Larger blades
  { width: 0.25, fraction: '1/4', pitch: '4 TPI', minDiameter: 1, rationale: 'Popular for resawing and straight cuts in thick hardwoods and softwoods. Handles heavy-duty work efficiently.' },
  { width: 0.25, fraction: '1/4', pitch: '6 TPI', minDiameter: 0.875, rationale: 'Versatile for moderate resawing and straight cuts in thicker stock.' },
  { width: 0.25, fraction: '1/4', pitch: '8 TPI', minDiameter: 0.75, rationale: 'Balanced for smooth cuts in hardwoods and medium-thick materials.' },
  { width: 0.3125, fraction: '5/16', pitch: '3 TPI', minDiameter: 1.25, rationale: 'Best for medium to straight cuts in thick stock. Suitable for ripping.' },
  { width: 0.3125, fraction: '5/16', pitch: '4 TPI', minDiameter: 1, rationale: 'Great for cutting thick boards with moderate precision.' },
  { width: 0.375, fraction: '3/8', pitch: '3 TPI', minDiameter: 1.5, rationale: 'Great for ripping and heavy-duty cuts in thick boards.' },
  { width: 0.375, fraction: '3/8', pitch: '4 TPI', minDiameter: 1.25, rationale: 'Efficient for heavy-duty cuts in hardwoods.' },
  { width: 0.5, fraction: '1/2', pitch: '2 TPI', minDiameter: 2, rationale: 'For heavy-duty resawing. Aggressive teeth for fast stock removal.' },
  { width: 0.5, fraction: '1/2', pitch: '3 TPI', minDiameter: 1.75, rationale: 'Good for resawing and heavy-duty straight cuts in thick materials.' },
  { width: 0.5, fraction: '1/2', pitch: '4 TPI', minDiameter: 1.5, rationale: 'Balanced blade for ripping and resawing in hardwoods.' },
  { width: 0.5, fraction: '1/2', pitch: '6 TPI', minDiameter: 1.25, rationale: 'Versatile blade for resawing medium-thick stock. Offers clean, smooth cuts.' },
  { width: 0.625, fraction: '5/8', pitch: '1 TPI', minDiameter: 2.5, rationale: 'Specifically designed for heavy-duty resawing in thick hardwoods and softwoods.' },
  { width: 0.75, fraction: '3/4', pitch: '0.75 TPI', minDiameter: 3, rationale: 'Handles straight, long cuts in thick stock. Suitable for wide boards and slabs.' },
  { width: 1, fraction: '1', pitch: '0.5 TPI', minDiameter: 4, rationale: 'For wide, straight cuts in large boards and slabs. Excellent for heavy-duty ripping.' },
  { width: 1.25, fraction: '1-1/4', pitch: '0.4 TPI', minDiameter: 5, rationale: 'Wide blade for heavy-duty ripping and resawing in large boards.' },
  { width: 1.5, fraction: '1-1/2', pitch: '0.3 TPI', minDiameter: 6, rationale: 'For resawing and ripping large hardwood boards and beams.' },
  { width: 2, fraction: '2', pitch: '0.25 TPI', minDiameter: 8, rationale: 'Extreme heavy-duty blade for resawing large slabs and beams. Best for professional woodworking.' },
];

export const bladesMetric: IBandsawBlade[] = [
  // Small blades (Intricate woodworking and tight curves)
  { width: 1, pitch: '14 TPI', minDiameter: 3, rationale: 'Ideal for tight curves and intricate details in softwoods and thin hardwoods.' },
  { width: 1, pitch: '18 TPI', minDiameter: 2.5, rationale: 'For very fine cuts in veneers and softwoods. Great for detailed work.' },
  { width: 1, pitch: '24 TPI', minDiameter: 2, rationale: 'Best for extremely fine curves and precision cuts in thin stock.' },
  { width: 3, pitch: '10 TPI', minDiameter: 6, rationale: 'Versatile for medium curves and detailed cuts in softwoods and hardwoods.' },
  { width: 3, pitch: '14 TPI', minDiameter: 5, rationale: 'For fine detail work in hardwoods and softwoods. Provides clean, precise cuts.' },
  { width: 3, pitch: '18 TPI', minDiameter: 4, rationale: 'Designed for very tight curves in softwoods and thin hardwoods.' },

  // Medium blades (General woodworking and moderate curves)
  { width: 5, pitch: '6 TPI', minDiameter: 12, rationale: 'Balanced blade for moderate curves and smooth cuts in hardwoods and softwoods.' },
  { width: 5, pitch: '10 TPI', minDiameter: 10, rationale: 'Great for general-purpose cutting of curves and straight cuts in thin to medium stock.' },
  { width: 5, pitch: '14 TPI', minDiameter: 8, rationale: 'Fine blade for detailed work in hardwoods and softwoods. Provides a smooth finish.' },
  { width: 6, pitch: '5 TPI', minDiameter: 15, rationale: 'For moderate-radius curves in thicker hardwoods and softwoods.' },
  { width: 6, pitch: '6 TPI', minDiameter: 14, rationale: 'Good for cutting softwoods and medium-hardwoods. Offers clean, fast cuts.' },
  { width: 6, pitch: '8 TPI', minDiameter: 12, rationale: 'Versatile blade for clean cuts in softwoods and thin hardwoods.' },
  { width: 8, pitch: '4 TPI', minDiameter: 20, rationale: 'Optimized for straight cuts and moderate resawing in thicker materials.' },
  { width: 8, pitch: '6 TPI', minDiameter: 18, rationale: 'Balanced blade for smooth cuts in medium to thick hardwoods.' },
  { width: 8, pitch: '10 TPI', minDiameter: 16, rationale: 'For moderately tight curves and straight cuts in medium hardwoods and softwoods.' },

  // Larger blades (Resawing and heavy-duty woodworking)
  { width: 10, pitch: '3 TPI', minDiameter: 25, rationale: 'Ideal for resawing thick stock. Handles hardwoods and softwoods with aggressive cuts.' },
  { width: 10, pitch: '6 TPI', minDiameter: 20, rationale: 'Great for straight cuts in medium to thick boards. Provides clean finishes.' },
  { width: 13, pitch: '2.5 TPI', minDiameter: 30, rationale: 'Designed for heavy-duty resawing in thick hardwoods and softwoods.' },
  { width: 13, pitch: '4 TPI', minDiameter: 28, rationale: 'Versatile for resawing and straight cuts in thick materials.' },
  { width: 16, pitch: '2 TPI', minDiameter: 35, rationale: 'For wide, straight cuts in hardwoods. Excellent for ripping and resawing.' },
  { width: 16, pitch: '3 TPI', minDiameter: 32, rationale: 'Handles thick stock with precision. Great for resawing and ripping.' },
  { width: 19, pitch: '1.8 TPI', minDiameter: 50, rationale: 'Heavy-duty blade for ripping and resawing large slabs. Aggressive teeth for fast cuts.' },
  { width: 19, pitch: '2.5 TPI', minDiameter: 45, rationale: 'For efficient resawing of thick hardwoods. Balanced for speed and precision.' },
  { width: 20, pitch: '1.75 TPI', minDiameter: 55, rationale: 'For straight cuts in very thick stock. Best for heavy-duty applications.' },
  { width: 25, pitch: '1.5 TPI', minDiameter: 60, rationale: 'Designed for professional resawing of large boards and slabs.' },
  { width: 25, pitch: '2 TPI', minDiameter: 55, rationale: 'Balanced blade for ripping and resawing thick materials. Provides aggressive cutting.' },
  { width: 32, pitch: '1.25 TPI', minDiameter: 75, rationale: 'Wide blade for large-scale ripping and resawing. Handles dense hardwoods.' },
  { width: 38, pitch: '1 TPI', minDiameter: 100, rationale: 'For resawing wide slabs and thick boards. Best for professional woodworking.' },
  { width: 38, pitch: '1.5 TPI', minDiameter: 90, rationale: 'Efficient for heavy-duty straight cuts in thick hardwoods and softwoods.' },
  { width: 45, pitch: '0.8 TPI', minDiameter: 120, rationale: 'Extreme heavy-duty blade for resawing large beams and slabs. Provides aggressive stock removal.' },
  { width: 50, pitch: '0.75 TPI', minDiameter: 150, rationale: 'Handles large slabs and beams. Ideal for heavy-duty ripping and resawing in professional settings.' },
  { width: 50, pitch: '1 TPI', minDiameter: 140, rationale: 'For wide, straight cuts in very large stock. Excellent for heavy woodworking.' },
];
