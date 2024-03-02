export default interface Project {
  id: string;
  projectTitle: string;
  shortDescription: string;
  fullDescription: string;
  projectImage: {
    url: string;
  };
  location: string;
  icon: string;
  date: string;
}
