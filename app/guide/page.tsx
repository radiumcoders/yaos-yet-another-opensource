import Container from "@/components/core/container";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function getApiGuide() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const response = await fetch(`${API_BASE_URL}/api/guide`, {
    cache: "no-store",
  });
  return response.json();
}

export default async function ApiGuidePage() {
  const guide = await getApiGuide();

  return (
    <Container className="p-6 max-w-6xl mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">{guide.title}</h1>
          <p className="text-muted-foreground">
            Version {guide.version} - Complete API Reference
          </p>
        </div>

        {/* Categories Section */}
        <Card>
          <CardHeader>
            <CardTitle>Available Categories</CardTitle>
            <CardDescription>
              Choose from these categories when submitting projects
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {guide.categories.available.map((category: string) => (
              <div key={category} className="flex items-start gap-3">
                <Badge variant="outline" className="mt-0.5">
                  {category}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {guide.categories.descriptions[category]}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Data Endpoints */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Data Endpoints</h2>

          {/* Get All Data */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Badge className="bg-green-600">
                  {guide.endpoints.data.getAllData.method}
                </Badge>
                <CardTitle className="text-xl">Get All Data</CardTitle>
              </div>
              <CardDescription>
                {guide.endpoints.data.getAllData.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold mb-1">Endpoint:</p>
                <code className="px-3 py-2 bg-muted rounded-md block">
                  {guide.endpoints.data.getAllData.path}
                </code>
              </div>
              <div>
                <p className="font-semibold mb-1">Parameters:</p>
                <code className="px-3 py-2 bg-muted rounded-md block">
                  {guide.endpoints.data.getAllData.parameters}
                </code>
              </div>
            </CardContent>
          </Card>

          {/* Get Data by Category */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Badge className="bg-green-600">
                  {guide.endpoints.data.getDataByCategory.method}
                </Badge>
                <CardTitle className="text-xl">Get Data by Category</CardTitle>
              </div>
              <CardDescription>
                {guide.endpoints.data.getDataByCategory.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold mb-1">Endpoint:</p>
                <code className="px-3 py-2 bg-muted rounded-md block">
                  {guide.endpoints.data.getDataByCategory.path}
                </code>
              </div>
              <div>
                <p className="font-semibold mb-1">Example:</p>
                <code className="px-3 py-2 bg-muted rounded-md block">
                  {guide.endpoints.data.getDataByCategory.example}
                </code>
              </div>
              <div>
                <p className="font-semibold mb-2">Parameters:</p>
                <div className="px-3 py-2 bg-muted rounded-md space-y-1">
                  <p className="font-mono text-sm">
                    <span className="font-semibold">category</span> (required) -{" "}
                    {guide.endpoints.data.getDataByCategory.parameters.category.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Get Data by Title */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Badge className="bg-green-600">
                  {guide.endpoints.data.getDataByTitle.method}
                </Badge>
                <CardTitle className="text-xl">Get Data by Title</CardTitle>
              </div>
              <CardDescription>
                {guide.endpoints.data.getDataByTitle.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold mb-1">Endpoint:</p>
                <code className="px-3 py-2 bg-muted rounded-md block">
                  {guide.endpoints.data.getDataByTitle.path}
                </code>
              </div>
              <div>
                <p className="font-semibold mb-1">Example:</p>
                <code className="px-3 py-2 bg-muted rounded-md block">
                  {guide.endpoints.data.getDataByTitle.example}
                </code>
              </div>
            </CardContent>
          </Card>

          {/* Add Data */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Badge className="bg-blue-600">
                  {guide.endpoints.data.addData.method}
                </Badge>
                <CardTitle className="text-xl">Add New Project</CardTitle>
              </div>
              <CardDescription>
                {guide.endpoints.data.addData.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold mb-1">Endpoint:</p>
                <code className="px-3 py-2 bg-muted rounded-md block">
                  {guide.endpoints.data.addData.path}
                </code>
              </div>
              <div>
                <p className="font-semibold mb-2">Request Body:</p>
                <div className="px-3 py-2 bg-muted rounded-md">
                  <pre className="text-sm overflow-x-auto">
                    {JSON.stringify(guide.endpoints.data.addData.example, null, 2)}
                  </pre>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-2">Required Fields:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>title - Project title</li>
                  <li>description - Project description</li>
                  <li>catagory - One of: {guide.categories.available.join(", ")}</li>
                  <li>githubUrl - GitHub repository URL</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">Optional Fields (required for ui-library):</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>githubRawUrl - Raw URL to registry.json</li>
                  <li>registrieName - Registry identifier</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Delete Data */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Badge className="bg-red-600">
                  {guide.endpoints.data.deleteData.method}
                </Badge>
                <CardTitle className="text-xl">Delete Project</CardTitle>
              </div>
              <CardDescription>
                {guide.endpoints.data.deleteData.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold mb-1">Endpoint:</p>
                <code className="px-3 py-2 bg-muted rounded-md block">
                  {guide.endpoints.data.deleteData.path}
                </code>
              </div>
              <div>
                <p className="font-semibold mb-1">Example:</p>
                <code className="px-3 py-2 bg-muted rounded-md block">
                  {guide.endpoints.data.deleteData.example}
                </code>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Component Endpoints */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Component Endpoints</h2>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Badge className="bg-green-600">
                  {guide.endpoints.components.fetchComponentNames.method}
                </Badge>
                <CardTitle className="text-xl">Fetch Component Names</CardTitle>
              </div>
              <CardDescription>
                {guide.endpoints.components.fetchComponentNames.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold mb-1">Endpoint:</p>
                <code className="px-3 py-2 bg-muted rounded-md block">
                  {guide.endpoints.components.fetchComponentNames.path}
                </code>
              </div>
              <div>
                <p className="font-semibold mb-1">Example:</p>
                <code className="px-3 py-2 bg-muted rounded-md block text-xs break-all">
                  {guide.endpoints.components.fetchComponentNames.example}
                </code>
              </div>
              <div>
                <p className="font-semibold mb-2">Parameters:</p>
                <div className="px-3 py-2 bg-muted rounded-md">
                  <p className="font-mono text-sm">
                    <span className="font-semibold">url</span> (required, query) -{" "}
                    {guide.endpoints.components.fetchComponentNames.parameters.url.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Command Generation */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Command Generation</h2>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Badge className="bg-blue-600">
                  {guide.endpoints.commands.generateCommand.method}
                </Badge>
                <CardTitle className="text-xl">Generate Installation Command</CardTitle>
              </div>
              <CardDescription>
                {guide.endpoints.commands.generateCommand.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold mb-1">Endpoint:</p>
                <code className="px-3 py-2 bg-muted rounded-md block">
                  {guide.endpoints.commands.generateCommand.path}
                </code>
              </div>
              <div>
                <p className="font-semibold mb-2">Request Body:</p>
                <div className="px-3 py-2 bg-muted rounded-md">
                  <pre className="text-sm overflow-x-auto">
                    {JSON.stringify(guide.endpoints.commands.generateCommand.example, null, 2)}
                  </pre>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-2">Response Example:</p>
                <div className="px-3 py-2 bg-muted rounded-md">
                  <pre className="text-sm overflow-x-auto">
                    {JSON.stringify(guide.endpoints.commands.generateCommand.response.success, null, 2)}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Error Codes */}
        <Card>
          <CardHeader>
            <CardTitle>Error Codes</CardTitle>
            <CardDescription>Common HTTP status codes returned by the API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(guide.errorCodes).map(([code, description]) => (
              <div key={code} className="flex items-start gap-3">
                <Badge variant="destructive" className="mt-0.5">
                  {code}
                </Badge>
                <p className="text-sm">{description as string}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Important Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {guide.notes.map((note: string, index: number) => (
                <li key={index} className="text-sm">
                  {note}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
