"use client";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { addData } from "@/actions/add-actions";
import { useState } from "react";

/**
 * AddDataForm component - A form for submitting new open source projects
 * Allows users to add project details including title, description, category, and GitHub URLs
 */
function AddDataForm() {
  // Track the selected category to conditionally show UI Library-specific fields
  const [catagory, setCatagory] = useState<string>("ui-library");
  // Check if the selected category is UI Library
  const isUi = catagory === "ui-library";
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add New Project</CardTitle>
        <CardDescription>
          Share your open source project with the community.
        </CardDescription>
      </CardHeader>
      <form action={addData}>
        <CardContent className="space-y-4">
          {/* Project title input field */}
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input id="title" name="title" placeholder="e.g. YAOS" required />
          </div>
          {/* Project description textarea */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="What does your project do?"
              required
            />
          </div>
          {/* Category selection dropdown */}
          <div className="space-y-2">
            <Label htmlFor="catagory">Category</Label>
            <Select
              name="catagory"
              required
              value={catagory}
              onValueChange={(e) => setCatagory(e!)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ui-library">UI Library</SelectItem>
                <SelectItem value="portfolio-template">
                  Portfolio Template
                </SelectItem>
                <SelectItem value="tool">Tool</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* GitHub repository URL input */}
          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              id="githubUrl"
              name="githubUrl"
              placeholder="https://github.com/username/repo"
              required
            />
          </div>
          {/* Conditionally render GitHub Raw URL field - only required for UI Library category */}
          {isUi && (
            <div className="space-y-2">
              <Label htmlFor="githubRawUrl">
                GitHub Raw URL For Registry.json
              </Label>
              <Input
                id="githubRawUrl"
                name="githubRawUrl"
                placeholder="https://raw.githubusercontent.com/username/repo/main/registry.json"
                required={catagory === "ui-library"}
              />
            </div>
          )}
          {/* Form submission button */}
        </CardContent>
        <CardFooter className="mt-2">
          <Button type="submit" className="w-full">
            Submit Project
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default AddDataForm;
