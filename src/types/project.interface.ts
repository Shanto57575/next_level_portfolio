export interface IProject {
  id: number;
  title: string;
  tech_stack: string[];
  image: string;
  github_client?: string;
  github_server?: string;
  live?: string;
  Features: string[];
  createdAt: Date;
  updatedAt: Date;
}
