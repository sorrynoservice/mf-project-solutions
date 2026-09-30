import { projectBySlug } from "@/lib/content";
import Placeholder from "./Placeholder";

export default function ProjectPlaceholder({ slug }: { slug: string }) {
  const project = projectBySlug(slug);
  return (
    <Placeholder name={project?.title ?? slug}>
      {project && (
        <p className="mt-4 text-muted-foreground">
          {project.location} · {project.summary}
        </p>
      )}
    </Placeholder>
  );
}
