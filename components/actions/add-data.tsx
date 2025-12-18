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
import { useRouter } from "next/navigation";

function AddDataForm() {
  const router = useRouter();
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
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input id="title" name="title" placeholder="e.g. YAOS" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="What does your project do?"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="catagory">Category</Label>
            <Select name="catagory" required defaultValue="ui library">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="" disabled>
                  Select a category
                </SelectItem>
                <SelectItem value="ui library">UI Library</SelectItem>
                <SelectItem value="portfolio-template">Portfolio-Template</SelectItem>
                <SelectItem value="tool">Tool</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              id="githubUrl"
              name="githubUrl"
              placeholder="https://github.com/username/repo"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.back()} type="submit" className="w-full">
            Submit Project
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default AddDataForm;
