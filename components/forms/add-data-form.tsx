"use client";

import { useForm } from "@tanstack/react-form-nextjs";
import { insertData } from "@/server/add";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface AddDataFormProps {
  onSuccess?: () => void;
}

export default function AddDataForm({ onSuccess }: AddDataFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      github_url: "",
      live_url: "",
      tags: "",
    },
    onSubmit: async ({ value, formApi }) => {
      setIsSubmitting(true);
      setSubmitMessage(null);

      try {
        const formData = new FormData();
        formData.append("title", value.title);
        formData.append("description", value.description);
        formData.append("github_url", value.github_url);
        formData.append("live_url", value.live_url);
        formData.append("tags", value.tags);

        const result = await insertData(formData);

        if (result.success) {
          setSubmitMessage({
            type: "success",
            message: "Data added successfully!",
          });
          formApi.reset();
          // Call onSuccess callback if provided
          if (onSuccess) {
            setTimeout(() => {
              onSuccess();
            }, 1000);
          }
        } else {
          setSubmitMessage({
            type: "error",
            message: result.error || "Failed to add data",
          });
        }
      } catch (error) {
        setSubmitMessage({
          type: "error",
          message: error instanceof Error ? error.message : "An error occurred",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6 max-w-2xl mx-auto"
    >
      {submitMessage && (
        <div
          className={`p-4 rounded-lg ${
            submitMessage.type === "success"
              ? "bg-green-500/10 text-green-500 border border-green-500/20"
              : "bg-red-500/10 text-red-500 border border-red-500/20"
          }`}
        >
          {submitMessage.message}
        </div>
      )}

      {/* Title Field */}
      <form.Field
        name="title"
        validators={{
          onChange: ({ value }) =>
            !value ? "Title is required" : undefined,
        }}
      >
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Enter title"
            />
            {field.state.meta.errors && (
              <p className="text-sm text-red-500">
                {field.state.meta.errors.join(", ")}
              </p>
            )}
          </div>
        )}
      </form.Field>

      {/* Description Field */}
      <form.Field
        name="description"
        validators={{
          onChange: ({ value }) =>
            !value ? "Description is required" : undefined,
        }}
      >
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Enter description"
              rows={4}
            />
            {field.state.meta.errors && (
              <p className="text-sm text-red-500">
                {field.state.meta.errors.join(", ")}
              </p>
            )}
          </div>
        )}
      </form.Field>

      {/* GitHub URL Field */}
      <form.Field
        name="github_url"
        validators={{
          onChange: ({ value }) => {
            if (!value) return "GitHub URL is required";
            try {
              new URL(value);
              return undefined;
            } catch {
              return "Please enter a valid URL";
            }
          },
        }}
      >
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>
              GitHub URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="https://github.com/..."
              type="url"
            />
            {field.state.meta.errors && (
              <p className="text-sm text-red-500">
                {field.state.meta.errors.join(", ")}
              </p>
            )}
          </div>
        )}
      </form.Field>

      {/* Live URL Field */}
      <form.Field
        name="live_url"
        validators={{
          onChange: ({ value }) => {
            if (!value) return "Live URL is required";
            try {
              new URL(value);
              return undefined;
            } catch {
              return "Please enter a valid URL";
            }
          },
        }}
      >
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>
              Live URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="https://example.com"
              type="url"
            />
            {field.state.meta.errors && (
              <p className="text-sm text-red-500">
                {field.state.meta.errors.join(", ")}
              </p>
            )}
          </div>
        )}
      </form.Field>

      {/* Tags Field */}
      <form.Field name="tags">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Tags</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="shadcn, react, ui (comma-separated)"
            />
            <p className="text-xs text-muted-foreground">
              Separate tags with commas
            </p>
          </div>
        )}
      </form.Field>

      {/* Submit Button */}
      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Add Data"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            form.reset();
            setSubmitMessage(null);
          }}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
