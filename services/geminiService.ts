
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CEOProfile } from "../types";

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Full name of the business figure (English). If insufficient data, return 'Insufficient Data'." },
    title: { type: Type.STRING, description: "STRICT RULE: Return ONLY the names of companies, projects, brands, or works (e.g. 'Tesla, SpaceX', 'LVMH'). DO NOT include titles like 'CEO', 'Founder', 'Owner', 'Chairman'. Exception: Use 'Former [Role] [Company]' ONLY if they have left the position." },
    industry: { type: Type.STRING, description: "The primary industry they operate in (English)." },
    summary: { type: Type.STRING, description: "A factual, objective executive summary (2-3 sentences) in Thai. No opinions, no adjectives like 'visionary'. Keep proper nouns in English." },
    dashboard: { type: Type.STRING, description: "HTML string containing the 'Executive Summary' visual dashboard (Overview and Timeline)." },
    lessons: { type: Type.STRING, description: "HTML string containing 5-7 business lessons." },
    sections: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          content: { type: Type.STRING, description: "HTML formatted string with Tailwind CSS classes. Use <p>, <ul>, <li>, <strong>, <table>, etc." },
        },
        required: ["title", "content"],
      },
    },
    references: {
      type: Type.ARRAY,
      items: { 
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Source title (e.g. 'Forbes Profile', 'Wikipedia', 'Official Bio')." },
          url: { type: Type.STRING, description: "A valid, real URL to the source." }
        },
        required: ["title", "url"]
      },
      description: "List of 3-5 distinct, valid sources with URLs."
    }
  },
  required: ["name", "title", "industry", "summary", "dashboard", "lessons", "sections", "references"],
};

export const generateProfile = async (query: string): Promise<CEOProfile> => {
  try {
    // Robust API Key check to prevent silent crashes
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing. Please check your environment variables in the project settings.");
    }

    // Initialize the client here to ensure process.env.API_KEY is accessible at runtime
    const ai = new GoogleGenAI({ apiKey: apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a FACTUAL, OBJECTIVE, and VERIFIABLE business profile for: ${query}. 
      
      Tone: Encyclopedic, Neutral, Wiki-Style.
      Style: Objective, Plain, Chronological.
      
      *** STRICT SAFETY & ACCURACY GUIDELINES ***
      1. VERIFIABILITY FIRST: Content must be based on verifiable public records. If a fact cannot be confirmed by a top-tier source, DO NOT INCLUDE IT.
      2. CREDIBLE SOURCES ONLY: Ignore tabloids, rumors, or unverified blogs. Use verified news, company filings, or official bios.
      3. FACTUAL & OBJECTIVE: State strictly WHAT happened (dates, roles, companies). 
         - AVOID qualitative adjectives (e.g., DO NOT use "visionary", "genius", "legendary", "controversial"). 
         - Use neutral terms (e.g., "CEO", "Founded", "Launched").
      4. ZERO TOLERANCE FOR HALLUCINATION: Do not fabricate to fill gaps. If data is missing, omit it.
      5. NO DEFAMATION OR CRITICISM: Strictly NO scandals, negative evaluations, legal gossips, or subjective opinions. 
      6. ZERO BIAS: Present the career path chronologically and neutrally.

      *** FAIL-SAFE MECHANISM ***
      If there is insufficient verifiable public data to generate a safe biography for ${query}, return a JSON with the name set to "Insufficient Data" and empty fields for others.

      *** CRITICAL LANGUAGE RULES ***
      1. NARRATIVE LANGUAGE: Thai (ภาษาไทย).
      2. PROPER NOUNS: ALL People Names, Company Names, Brands, Cities, Countries, and specific Tech Terms MUST BE IN ENGLISH. 
         (e.g., Write "Steve Jobs" NOT "สตีฟ จอบส์", "Apple" NOT "แอปเปิ้ล", "Silicon Valley" NOT "ซิลิคอนวัลเลย์").
      3. DATES: Use Christian Era (A.D.) ONLY (e.g., 2024). DO NOT use Buddhist Era (B.E. / พ.ศ.).

      OUTPUT FORMAT:
      The 'content' field for each section MUST be a valid HTML string using Tailwind CSS classes for styling.
      - Use <p class="mb-4 text-slate-600 leading-relaxed"> for paragraphs.
      - Use <strong class="text-slate-900 font-semibold"> for emphasis.
      
      Required Sections:
      1. Professional Summary (Factual career overview)
      2. The Origin (Education and early career facts)
      3. The Climb (Chronological business milestones)
      4. Management Principles (Stated or documented principles only)
      5. Future Focus (Announced projects or documented plans)
      
      REQUIRED FIELD: "dashboard"
      Generate a visual HTML dashboard summary titled "EXECUTIVE SUMMARY".
      HTML Template for 'dashboard' field:
      <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mt-8 mb-12">
        <h3 class="text-sm font-bold text-slate-900 uppercase tracking-[0.2em] mb-6 border-l-4 border-cyan-500 pl-3">
          EXECUTIVE SUMMARY
        </h3>
        
        <!-- 1. Overview -->
        <div class="mb-8">
           <h4 class="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 border-b border-slate-100 pb-2">
            Overview
          </h4>
          <div class="overflow-hidden rounded-lg border border-slate-200">
            <table class="w-full text-sm text-left">
              <thead class="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th class="px-4 py-3"><span class="mr-1 text-base">🎯</span> Strategic Focus</th>
                  <th class="px-4 py-3"><span class="text-emerald-500 mr-1 text-base">★</span> Leadership Style</th>
                  <th class="px-4 py-3"><span class="mr-1 text-base">🏆</span> Top Skill</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 bg-white">
                <tr>
                  <td class="px-4 py-3 text-slate-700 font-medium">[Keyword 1 (English)]</td>
                  <td class="px-4 py-3 text-slate-700 font-medium">[Keyword 2 (English)]</td>
                  <td class="px-4 py-3 text-slate-700 font-medium">[Keyword 3 (English)]</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 2. The Journey -->
        <div>
          <h4 class="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 border-b border-slate-100 pb-2">
            The Journey
          </h4>
          <!-- INSTRUCTION: Generate 3-5 KEY milestones. 
               Descriptions MUST be in THAI, but keep Companies/Names in English.
               Focus on the most recent verified achievements (12-24 months ago).
               DO NOT include a 'Current' or 'Present' row. Status changes too fast.
               Use A.D. Years only. -->
          <ul class="space-y-3">
             <li class="flex items-start text-sm text-slate-600">
               <span class="mr-3 text-cyan-500 text-[10px] mt-1">➤</span>
               <span><strong class="text-slate-800">[Year A.D.]</strong>: [Milestone Description in Thai, with English Names]</span>
             </li>
             <!-- Repeat for other milestones -->
          </ul>
        </div>
      </div>

      REQUIRED FIELD: "lessons"
      Generate a section for "LESSONS FOR THE CEO".
      Format: HTML string using Tailwind classes.
      Content: 5-7 actionable business lessons derived from this person's public statements or books.
      Language: THAI (with English nouns).
      HTML Template:
      <ul class="space-y-4">
        <li class="flex items-start">
          <span class="mr-3 text-cyan-500 mt-1">✦</span>
          <div>
            <strong class="text-slate-900 block mb-1 font-bold">[Lesson Topic in English]</strong>
            <span class="text-slate-600 text-sm leading-relaxed">[Explanation 25-35 words in Thai, using English for brands/names]</span>
          </div>
        </li>
        <!-- Repeat 5-7 times -->
      </ul>
      
      REQUIRED FIELD: "references"
      Provide 3-5 VALID URLs to official sources, credible news (Forbes, Bloomberg, TechCrunch), or Wikipedia.
      
      Ensure the content is neutral, respectful, and strictly factual.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.1, // Lower temperature for more factual consistency
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as CEOProfile;
    }
    throw new Error("No content generated");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
