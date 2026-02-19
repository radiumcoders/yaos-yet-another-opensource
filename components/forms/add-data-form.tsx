"use client";

import { useForm } from "@tanstack/react-form-nextjs";
import { insertData } from "@/server/add";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Tags,
  TagsTrigger,
  TagsValue,
  TagsContent,
  TagsInput,
  TagsList,
  TagsEmpty,
  TagsGroup,
  TagsItem,
} from "@/components/kibo-ui/tags";
import { tags } from "@/db/schema";
import { CheckIcon } from "lucide-react";
import ProjectLogo from "@/components/ui/project-logo";

interface AddDataFormProps {
  onSuccess?: () => void;
}

export default function AddDataForm({ onSuccess }: AddDataFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>("");

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      github_url: "",
      live_url: "",
      logo_url: "",
      tags: [] as string[],
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
        formData.append("logo_url", value.logo_url);
        formData.append("tags", JSON.stringify(value.tags));

        const result = await insertData(formData);

        if (result.success) {
          setSubmitMessage({
            type: "success",
            message: "Data added successfully!",
          });
          formApi.reset();
          setSelectedTags([]);
          setLogoPreview("");
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

      {/* Logo URL Field */}
      <form.Field name="logo_url">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Logo URL (Optional)</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => {
                field.handleChange(e.target.value);
                setLogoPreview(e.target.value);
              }}
              placeholder="https://example.com/logo.png"
              type="url"
            />
            <p className="text-xs text-muted-foreground">
              Enter a URL to your project logo (PNG, JPG, SVG, ICO, etc.)
            </p>
            
            {/* Logo Preview */}
            {logoPreview && (
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <ProjectLogo
                  src={logoPreview}
                  alt="Logo preview"
                  size="md"
                  fallbackText={field.state.value}
                />
                <span className="text-sm text-muted-foreground">Preview</span>
              </div>
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
            <Label>Tags</Label>
            <Tags open={open} onOpenChange={setOpen}>
              <TagsTrigger>
                {selectedTags.length > 0 ? (
                  selectedTags.map((tag) => (
                    <TagsValue
                      key={tag}
                      onRemove={() => {
                        const newTags = selectedTags.filter((t) => t !== tag);
                        setSelectedTags(newTags);
                        field.handleChange(newTags);
                      }}
                    >
                      {tag}
                    </TagsValue>
                  ))
                ) : null}
              </TagsTrigger>
              <TagsContent>
                <TagsInput placeholder="Search tags..." />
                <TagsList>
                  <TagsEmpty>No tags found.</TagsEmpty>
                  <TagsGroup>
                    {tags.map((tag) => (
                      <TagsItem
                        key={tag}
                        value={tag}
                        onSelect={() => {
                          const newTags = selectedTags.includes(tag)
                            ? selectedTags.filter((t) => t !== tag)
                            : [...selectedTags, tag];
                          setSelectedTags(newTags);
                          field.handleChange(newTags);
                        }}
                      >
                        <span>{tag}</span>
                        {selectedTags.includes(tag) && <CheckIcon size={16} />}
                      </TagsItem>
                    ))}
                  </TagsGroup>
                </TagsList>
              </TagsContent>
            </Tags>
            <p className="text-xs text-muted-foreground">
              Select tags from the list
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
