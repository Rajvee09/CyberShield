// This is an AI-powered tool to analyze text and determine the risk of it being a scam.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * @fileOverview Analyzes text to determine the risk of it being a scam.
 *
 * - analyzeScamRisk - A function that analyzes the scam risk of a text.
 * - AnalyzeScamRiskInput - The input type for the analyzeScamRisk function.
 * - AnalyzeScamRiskOutput - The return type for the analyzeScamRisk function.
 */

const AnalyzeScamRiskInputSchema = z.object({
  text: z.string().describe('The text to analyze for scam risk.'),
});
export type AnalyzeScamRiskInput = z.infer<typeof AnalyzeScamRiskInputSchema>;

const AnalyzeScamRiskOutputSchema = z.object({
  riskScore: z.number().describe('The risk score of the text being a scam (0-100).'),
  summary: z.string().describe('A summary explanation of why the text is potentially a scam.'),
});
export type AnalyzeScamRiskOutput = z.infer<typeof AnalyzeScamRiskOutputSchema>;

export async function analyzeScamRisk(input: AnalyzeScamRiskInput): Promise<AnalyzeScamRiskOutput> {
  return analyzeScamRiskFlow(input);
}

const analyzeScamRiskPrompt = ai.definePrompt({
  name: 'analyzeScamRiskPrompt',
  input: {schema: AnalyzeScamRiskInputSchema},
  output: {schema: AnalyzeScamRiskOutputSchema},
  prompt: `You are an AI assistant specializing in identifying potential scams. Analyze the following text and determine the risk of it being a scam. Provide a risk score between 0 and 100, where 0 indicates very low risk and 100 indicates very high risk. Also, provide a summary explaining your reasoning for the risk score.

Text: {{{text}}}`,
});

const analyzeScamRiskFlow = ai.defineFlow(
  {
    name: 'analyzeScamRiskFlow',
    inputSchema: AnalyzeScamRiskInputSchema,
    outputSchema: AnalyzeScamRiskOutputSchema,
  },
  async input => {
    const {output} = await analyzeScamRiskPrompt(input);
    return output!;
  }
);
