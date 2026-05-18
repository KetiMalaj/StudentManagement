import { GoogleGenAI } from "@google/genai";
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
You are an AI assistant that performs actions on a School Management System.
You can raise or lower a student's GPA when asked.

User request:
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
              {
                name: "lower_student_gpa",
                description: "Lower a student's GPA by a given amount",
                parameters: {
                  type: "OBJECT",
                  properties: {
                    studentName: {
                      type: "STRING",
                      description: "The first name of the student",
                    },
                    amount: {
                      type: "NUMBER",
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

    if (call?.name === "lower_student_gpa") {
      try {
        const result = await lowerStudentGPA(
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
