export type dataType = {
  id: number;
  title: string;
  description: string;
  catagory: CATAGORY;
  githubUrl: string;
  githubRawUrl?: string; // Optional field
  registrieName?: string; // Optional field
};

export enum CATAGORY {
  UI_LIBRARY = "ui-library",
  PORTFOLIO = "portfolio-template",
  TOOL = "tool",
  OTHER = "other",
}