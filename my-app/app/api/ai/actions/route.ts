import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { raiseStudentGPA, lowerStudentGPA, addStudent, deleteStudent, editStudent } from "@/app/lib/student";

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

IMPORTANT:
If the user asks to add, edit, delete, raise GPA, or lower GPA, you MUST call one of the provided functions.
Do not answer with normal text when a function matches the request.

Available actions:
- add_student
- edit_student
- delete_student
- raise_student_gpa
- lower_student_gpa

Examples:
User: Add student Ana Hoxha with GPA 3.8
Function: add_student { name: "Ana", surname: "Hoxha", gpa: 3.8 }

User: Delete student with id 5
Function: delete_student { id: 5 }

User: Raise Ana GPA by 0.2
Function: raise_student_gpa { studentName: "Ana", amount: 0.2 }
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
              {
                name: "add_student",
                description: "Add a new student with name, surname, and optional GPA",
                parameters: {
                  type: Type.OBJECT,
                  properties: {
                    name: {
                      type: Type.STRING,
                      description: "The first name of the student",
                    },
                    surname: {
                      type: Type.STRING,
                      description: "The surname of the student",
                    },
                    gpa: {
                      type: Type.NUMBER,
                      description: "The GPA of the student",
                    },
                  },
                  required: ["name", "surname"],
                },
              },
              {
                name: "edit_student",
                description: "Edit an existing student by id",
                parameters: {
                  type: Type.OBJECT,
                  properties: {
                    id: {
                      type: Type.NUMBER,
                      description: "The id of the student",
                    },
                    name: {
                      type: Type.STRING,
                      description: "The new first name of the student",
                    },
                    surname: {
                      type: Type.STRING,
                      description: "The new surname of the student",
                    },
                    gpa: {
                      type: Type.NUMBER,
                      description: "The new GPA of the student",
                    },
                  },
                  required: ["id", "name", "surname"],
                },
              },
              {
                name: "delete_student",
                description: "Delete a student by id",
                parameters: {
                  type: Type.OBJECT,
                  properties: {
                    id: {
                      type: Type.NUMBER,
                      description: "The id of the student to delete",
                    },
                  },
                  required: ["id"],
                },
              },
            ],
          },
        ],
      },
    });

    const call =
      response.candidates?.[0]?.content?.parts?.[0]?.functionCall;
      console.log("GEMINI FUNCTION CALL:", call);
      console.log("GEMINI RESPONSE TEXT:", response.text);
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
    if (call?.name === "add_student" && call.args) {
  const args = call.args as {
    name: string;
    surname: string;
    gpa?: number;
  };

  try {
    const result = await addStudent(args.name, args.surname, args.gpa);

    return NextResponse.json({
      reply: `Done! Student ${result.name} ${result.surname} was added successfully.`,
    });
  } catch (err) {
    return NextResponse.json({
      reply: `Could not add student: ${
        err instanceof Error ? err.message : "Unknown error"
      }`,
    });
  }
}

if (call?.name === "edit_student" && call.args) {
  const args = call.args as {
    id: number;
    name: string;
    surname: string;
    gpa?: number;
  };

  try {
    const result = await editStudent(
      args.id,
      args.name,
      args.surname,
      args.gpa
    );

    return NextResponse.json({
      reply: `Done! Student ${result.name} ${result.surname} was updated successfully.`,
    });
  } catch (err) {
    return NextResponse.json({
      reply: `Could not edit student: ${
        err instanceof Error ? err.message : "Unknown error"
      }`,
    });
  }
}

if (call?.name === "delete_student" && call.args) {
  const args = call.args as {
    id: number;
  };

  try {
    const result = await deleteStudent(args.id);

    return NextResponse.json({
      reply: `Done! Student ${result.name} ${result.surname} was deleted successfully.`,
    });
  } catch (err) {
    return NextResponse.json({
      reply: `Could not delete student: ${
        err instanceof Error ? err.message : "Unknown error"
      }`,
    });
  }
}
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
