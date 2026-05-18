import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { raiseStudentGPA, lowerStudentGPA } from "@/app/lib/student";

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
- You can also raise or lower a student's GPA when asked.

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
                  type: Type.OBJECT,
                  properties: {
                    studentName: {
                      type: Type.STRING,
                      description: "The first name of the student",
                    },
                    amount: {
                      type: Type.NUMBER,
                      description: "The amount to add to the GPA",
                    },
                  },
                  required: ["studentName", "amount"],
                },
              },
              {
                name: "lower_student_gpa",
                description: "Lower a student's GPA by a given amount",
                parameters: {
                  type: Type.OBJECT,
                  properties: {
                    studentName: {
                      type: Type.STRING,
                      description: "The first name of the student",
                    },
                    amount: {
                      type: Type.NUMBER,
                      description: "The amount to subtract from the GPA",
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
    const args = call?.args as { studentName: string; amount: number } | undefined;

    if (call?.name === "raise_student_gpa" && args) {
      try {
        const result = await raiseStudentGPA(
          args.studentName,
          args.amount
        );
        return NextResponse.json({
          reply: `Done! ${result.name} ${result.surname}'s GPA is now ${result.gpa}.`,
        });
      } catch (err) {
        return NextResponse.json({
          reply: `Could not update GPA: ${err instanceof Error ? err.message : "Unknown error"}`,
        });
      }
    }

    if (call?.name === "lower_student_gpa" && args) {
      try {
        const result = await lowerStudentGPA(
          args.studentName,
          args.amount
        );
        return NextResponse.json({
          reply: `Done! ${result.name} ${result.surname}'s GPA is now ${result.gpa}.`,
        });
      } catch (err) {
        return NextResponse.json({
          reply: `Could not update GPA: ${err instanceof Error ? err.message : "Unknown error"}`,
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
