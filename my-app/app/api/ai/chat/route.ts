import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an AI assistant inside a Worker/School Management System.

The app has these pages:
- Dashboard: /Dashboard
- Students view: /Dashboard/Student/view
- Add Student: /Dashboard/Student/add
- Edit Student: /Dashboard/Student/edit?id=STUDENT_ID
- Deans view: /Dashboard/dean/view
- Add Dean: /Dashboard/dean/add
- Teachers view: /Dashboard/teacher/view
- Add Teacher: /Dashboard/teacher/add
- Classes view: /Dashboard/class/view
- Add Class: /Dashboard/class/add
- Faculties view: /Dashboard/faculty/view
- Add Faculty: /Dashboard/faculty/add

Rules:
- Explain navigation simply.
- Do not invent pages that are not listed.
- If the user asks how to add/edit/delete something, explain which page/button to use.
- If the user asks for admin actions, say that Add/Edit/Delete are available only for admin users.
- Keep answers short and beginner friendly.

User question:
${message}
      `,
    });

    return NextResponse.json({
      reply: response.text,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "AI assistant failed" },
      { status: 500 }
    );
  }
}