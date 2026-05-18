import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { raiseStudentGPA, lowerStudentGPA, addStudent, editStudent, deleteStudent } from "@/app/lib/student";

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

    if (call) {
      return NextResponse.json({
        reply: "Sorry, I couldn't perform that action.",
      });
    }

    // Normal text response
    return NextResponse.json({
      reply: response.text,
    });
  } catch (error) {
    console.log("AI chat error:", error);

    return NextResponse.json(
      { error: "AI assistant failed" },
      { status: 500 }
    );
  }
}
