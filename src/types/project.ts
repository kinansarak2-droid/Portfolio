export interface Project {
  id:          string;
  title:       string;
  description: string;
  tags:        string[];
  image:       string;
  href:        string;
  year:        number;
  featured?:   boolean;
}
