import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import Course from "../models/courseModel.js";
dotenv.config();

const AI_MODELS = ["gemini-3.6-flash", "gemini-2.5-flash"];

const CATEGORY_KEYWORDS = [
  "App Development",
  "AI/ML",
  "AI Tools",
  "Data Science",
  "Data Analytics",
  "Ethical Hacking",
  "UI UX Designing",
  "Web Development",
  "Others",
];

const getLocalKeyword = (input) => {
  const text = input.toLowerCase();

  const rules = [
    { match: /\b(web|mern|html|css|javascript|react|node|full ?stack|frontend|backend)\b/, keyword: "Web Development" },
    { match: /\b(machine learning|ai ?\/? ?ml|deep learning|neural)\b/, keyword: "AI/ML" },
    { match: /\b(chatgpt|gemini|openai|ai tools|ai tool|generative ai|artificial intelligence)\b/, keyword: "AI Tools" },
    { match: /\b(data science|data scientist|model|analytics|tableau|power ?bi)\b/, keyword: "Data Science" },
    { match: /\b(hacking|cyber|security|penetration|ethical)\b/, keyword: "Ethical Hacking" },
    { match: /\b(ui|ux|design|figma|prototype)\b/, keyword: "UI UX Designing" },
    { match: /\b(app|android|ios|flutter|mobile|react native)\b/, keyword: "App Development" },
    { match: /\b(sql|excel|dashboards|kpi|reporting|data analysis)\b/, keyword: "Data Analytics" },
  ];

  for (const rule of rules) {
    if (rule.match.test(text)) return rule.keyword;
  }

  for (const category of CATEGORY_KEYWORDS) {
    if (text.includes(category.toLowerCase())) return category;
  }

  return null;
};

const getAiKeyword = async (input) => {
  const localKeyword = getLocalKeyword(input);
  if (localKeyword) return localKeyword;

  const ai = new GoogleGenAI({});
  const prompt = `You are an intelligent assistant for an LMS platform. A user will type any query about what they want to learn. Your task is to understand the intent and return one **most relevant keyword** from the following list of course categories and levels:

- App Development  
- AI/ML  
- AI Tools  
- Data Science  
- Data Analytics  
- Ethical Hacking  
- UI UX Designing  
- Web Development  
- Others  
- Beginner  
- Intermediate  
- Advanced  

Only reply with one single keyword from the list above that best matches the query. Do not explain anything. No extra text.

Query: ${input}
`;

  let lastError;
  for (const model of AI_MODELS) {
    const timeout = new Promise((_, rej) =>
      setTimeout(() => rej(new Error("Gemini timeout")), 15000)
    );
    try {
      const response = await Promise.race([
        ai.models.generateContent({ model, contents: prompt }),
        timeout,
      ]);
      if (response?.text) return response.text.trim();
    } catch (e) {
      lastError = e;
    }
  }
  console.warn("AI keyword generation failed, using raw query:", lastError?.message);
  return input.trim();
};

const searchCourses = (keyword) =>
  Course.find({
    isPublished: true,
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { subTitle: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { category: { $regex: keyword, $options: "i" } },
      { level: { $regex: keyword, $options: "i" } },
    ],
  });

export const searchWithAi = async (req, res) => {
  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ message: "Search query is required" });
    }

    let courses = await searchCourses(input.trim());

    if (courses.length === 0) {
      const keyword = await getAiKeyword(input.trim());
      courses = await searchCourses(keyword);
    }

    return res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "AI search failed. Please try again." });
  }
};