import { GoogleGenerativeAI } from "@google/generative-ai";  

const genAI = new GoogleGenerativeAI('Your API Key');

export const askAI = async (prompt) => {  
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });  
  const result = await model.generateContent(prompt);  
  return result.response.text();  
};  
