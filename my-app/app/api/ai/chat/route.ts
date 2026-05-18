import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { raiseStudentGPA } from "@/lib/student";

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
- You can also raise a student's GPA when asked.

User question:
${message}
      `,
      config: {
        tools: [
          {
            functionDeclarations: [
              {
                name: "raise_student_gpa",
                description: "Raise a student's GPA by a given amount",
                parameters: {
                  type: "OBJECT",
                  properties: {
                    studentName: {
                      type: "STRING",
                      description: "The first name of the student",
                    },
                    amount: {
                      type: "NUMBER",
                      description: "The amount to add to the GPA",
                    },
                  },
                  required: ["studentName", "amount"],
                },
              },
            ],
          },
        ],
      },
    });

    // Check if Gemini wants to call a function
    const call =
      response.candidates?.[0]?.content?.parts?.[0]?.functionCall;

    if (call?.name === "raise_student_gpa") {
      try {
        const result = await raiseStudentGPA(
          call.args.studentName,
          call.args.amount
        );
        return NextResponse.json({
          reply: `Done! ${result.name} ${result.surname}'s GPA is now ${result.gpa}.`,
        });
      } catch (err: any) {
        return NextResponse.json({
          reply: `Could not update GPA: ${err.message}`,
        });
      }
    }

    // Normal text response
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
