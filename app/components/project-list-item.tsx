import type { ProjectType } from "~/data/projects";

interface ProjectListItemProps {
	project: ProjectType;
}

const ProjectListItem = ({ project }: ProjectListItemProps) => {
	const { date, summary, title } = project;
	return (
		<div className="flex gap-4">
			<div className="text-base md:text-lg w-[70px] md:w-[150px] font-bold shrink-0">{date}</div>
			<div>
				<div className="text-lg md:text-xl font-bold tracking-wide">{title}</div>
				<p className="text-base md:text-lg tracking-wide">{summary}</p>
			</div>
		</div>
	);
};

export default ProjectListItem;
