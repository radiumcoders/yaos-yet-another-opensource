"use client";
import { addData } from "@/server/add-actions";
import { useState } from "react";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

/**
 * AddDataForm component - A form for submitting new open source projects
 * Allows users to add project details including title, description, category, and GitHub URLs
 */
// Validation schema for GitHub Raw URL
const rawUrlSchema = z
  .string()
  .url()
  .refine((url) => url.startsWith("https://raw.githubusercontent.com/"), {
    message: "URL must be a raw.githubusercontent.com URL",
  });

// Validation schema for Registry Name
const registryNameSchema = z
  .string()
  .refine((value) => value.includes("@") || value.includes("https"), {
    message: "Registry name must include @ or https",
  });

function AddDataForm() {
  // Track the selected category to conditionally show UI Library-specific fields
  const [category, setCategory] = useState("ui-library");
  const [rawUrlError, setRawUrlError] = useState<string | null>(null);
  const [registryNameError, setRegistryNameError] = useState<string | null>(null);
  // Check if the selected category is UI Library
  const isUi = category === "ui-library";
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
            <Label htmlFor="category">Category</Label>
            <Select
              name="catagory"
              required
              value={category}
              onValueChange={(e) => setCategory(e!)}
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
            <>
              <div className="space-y-2">
                <Label htmlFor="githubRawUrl">
                  GitHub Raw URL For Registry.json
                </Label>
                <Input
                  id="githubRawUrl"
                  name="githubRawUrl"
                  placeholder="https://raw.githubusercontent.com/username/repo/main/registry.json"
                  required={category === "ui-library"}
                  onChange={(e) => {
                    const result = rawUrlSchema.safeParse(e.target.value);
                    if (!result.success) {
                      setRawUrlError(
                        result.error.issues[0]?.message || "Invalid URL"
                      );
                    } else {
                      setRawUrlError(null);
                    }
                  }}
                  className={rawUrlError ? "border-red-500" : ""}
                />
                {rawUrlError && (
                  <p className="text-sm text-red-500">{rawUrlError}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrieName">Registry Name</Label>
                <Input
                  id="registrieName"
                  name="registrieName"
                  placeholder="e.g. @8bitcn ... OR https://billui.com/r/"
                  required={category === "ui-library"}
                  onChange={(e) => {
                    const result = registryNameSchema.safeParse(e.target.value);
                    if (!result.success) {
                      setRegistryNameError(
                        result.error.issues[0]?.message || "Invalid registry name"
                      );
                    } else {
                      setRegistryNameError(null);
                    }
                  }}
                  className={registryNameError ? "border-red-500" : ""}
                />
                {registryNameError && (
                  <p className="text-sm text-red-500">{registryNameError}</p>
                )}
              </div>
            </>
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
