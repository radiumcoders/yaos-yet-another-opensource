import { NextResponse } from "next/server";

export async function GET() {
  const apiGuide = {
    title: "YAOS API Documentation",
    version: "1.0.0",
    baseUrl: "/api",
    endpoints: {
      data: {
        getAllData: {
          method: "GET",
          path: "/api/data/all",
          description: "Fetch all data entries from the database",
          parameters: "None",
          response: {
            type: "Array<Object>",
            example: [
              {
                id: "uuid",
                title: "example-project",
                description: "Project description",
                catagory: "ui-library",
                githubUrl: "https://github.com/user/repo",
                githubRawUrl:
                  "https://raw.githubusercontent.com/user/repo/main/registry.json",
                registrieName: "@example/registry",
              },
            ],
          },
        },
        getDataByCategory: {
          method: "GET",
          path: "/api/data/category/[category]",
          description: "Fetch all data entries for a specific category",
          parameters: {
            category: {
              type: "string",
              location: "path",
              description:
                "Category name (e.g., 'ui-library', 'portfolio-template', 'tool', 'other')",
              required: true,
            },
          },
          example: "/api/data/category/ui-library",
          response: {
            type: "Array<Object>",
            example: [
              {
                id: "uuid",
                title: "shadcn-ui",
                description: "Beautiful UI components",
                catagory: "ui-library",
                githubUrl: "https://github.com/shadcn/ui",
                githubRawUrl:
                  "https://raw.githubusercontent.com/shadcn/ui/main/registry.json",
                registrieName: "@shadcn/ui",
              },
            ],
          },
        },
        getDataByTitle: {
          method: "GET",
          path: "/api/data/title/[title]",
          description: "Fetch data entry by title",
          parameters: {
            title: {
              type: "string",
              location: "path",
              description: "Project title (spaces replaced with hyphens)",
              required: true,
            },
          },
          example: "/api/data/title/shadcn-ui",
          response: {
            type: "Array<Object>",
            example: [
              {
                id: "uuid",
                title: "shadcn-ui",
                description: "Beautiful UI components",
                catagory: "ui-library",
                githubUrl: "https://github.com/shadcn/ui",
                githubRawUrl:
                  "https://raw.githubusercontent.com/shadcn/ui/main/registry.json",
                registrieName: "@shadcn/ui",
              },
            ],
          },
        },
        addData: {
          method: "POST",
          path: "/api/data/add",
          description: "Add a new project entry to the database",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            title: {
              type: "string",
              required: true,
              description:
                "Project title (spaces will be replaced with hyphens)",
            },
            description: {
              type: "string",
              required: true,
              description: "Project description",
            },
            catagory: {
              type: "string",
              required: true,
              description:
                "Category: 'ui-library', 'portfolio-template', 'tool', or 'other'",
            },
            githubUrl: {
              type: "string",
              required: true,
              description: "GitHub repository URL",
            },
            githubRawUrl: {
              type: "string",
              required: false,
              description:
                "GitHub raw URL for registry.json (required for ui-library)",
            },
            registrieName: {
              type: "string",
              required: false,
              description:
                "Registry name (e.g., '@shadcn/ui' or 'https://example.com/r/') (required for ui-library)",
            },
          },
          example: {
            title: "My UI Library",
            description: "A collection of beautiful components",
            catagory: "ui-library",
            githubUrl: "https://github.com/user/ui-library",
            githubRawUrl:
              "https://raw.githubusercontent.com/user/ui-library/main/registry.json",
            registrieName: "@user/ui-library",
          },
          response: {
            success: {
              success: true,
              id: "generated-uuid",
            },
            error: {
              error: "Missing required fields",
            },
          },
        },
        deleteData: {
          method: "DELETE",
          path: "/api/data/delete/[id]",
          description: "Delete a data entry by ID",
          parameters: {
            id: {
              type: "string",
              location: "path",
              description: "UUID of the entry to delete",
              required: true,
            },
          },
          example: "/api/data/delete/123e4567-e89b-12d3-a456-426614174000",
          response: {
            success: {
              success: true,
            },
            error: {
              error: "ID is required",
            },
          },
        },
      },
      components: {
        fetchComponentNames: {
          method: "GET",
          path: "/api/components/fetch-names",
          description: "Fetch component names from a registry.json URL",
          parameters: {
            url: {
              type: "string",
              location: "query",
              description: "URL to the registry.json file",
              required: true,
            },
          },
          example:
            "/api/components/fetch-names?url=https://raw.githubusercontent.com/shadcn/ui/main/registry.json",
          response: {
            type: "Array<string>",
            example: ["button", "card", "input", "select"],
            notes:
              "Only returns components with type 'registry:ui' or 'registry:component'",
          },
        },
      },
      commands: {
        generateCommand: {
          method: "POST",
          path: "/api/generate-command",
          description:
            "Generate a shadcn CLI installation command for selected components",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            components: {
              type: "Array<string>",
              required: true,
              description: "Array of component names to include",
            },
            rigName: {
              type: "string",
              required: true,
              description: "Registry name or URL",
            },
          },
          example: {
            components: ["button", "card", "input"],
            rigName: "@shadcn/ui",
          },
          response: {
            success: {
              command:
                "pnpx shadcn@latest add @shadcn/ui/button @shadcn/ui/card @shadcn/ui/input",
            },
            error: {
              error: "Components array is required",
            },
          },
        },
      },
    },
    categories: {
      available: ["ui-library", "portfolio-template", "tool", "other"],
      descriptions: {
        "ui-library": "Component libraries and UI frameworks",
        "portfolio-template": "Portfolio website templates",
        tool: "Development tools and utilities",
        other: "Other projects that don't fit the above categories",
      },
    },
    errorCodes: {
      "400": "Bad Request - Missing or invalid parameters",
      "500": "Internal Server Error - Server-side error occurred",
    },
    notes: [
      "All endpoints return JSON responses",
      "Data modifications trigger automatic revalidation of cached paths",
      "Component names are filtered to only include registry:ui and registry:component types",
      "Titles with spaces are automatically converted to hyphenated format",
    ],
  };

  return NextResponse.json(apiGuide, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
