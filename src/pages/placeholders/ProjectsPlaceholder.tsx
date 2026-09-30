import { Link } from "react-router-dom";
import { projects } from "@/lib/content";
import Placeholder from "./Placeholder";

export default function ProjectsPlaceholder() {
  return (
    <Placeholder name="Projects">
      <ul className="mt-6 list-disc pl-6">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link className="underline" to={`/projects/${p.slug}`}>
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </Placeholder>
  );
}
