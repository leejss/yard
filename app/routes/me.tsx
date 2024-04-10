import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { GmailIcon } from "~/components/icon";
import ProjectListItem from "~/components/project-list-item";
import { contacts } from "~/data/contacts";
import { projects } from "~/data/projects";

const Me = () => {
	const { github, linkedin } = contacts.social;
	const email = contacts.email;
	const mailto = `mailto:${email}`;

	return (
		<div className="flex flex-col gap-8 pt-6">
			{/* Social */}
			<section className="text-foreground gap-4">
				<h2 className="font-bold text-lg md:text-2xl pb-3 border-b-foreground border-b-2 mb-4">CONTACT</h2>
				<div className="flex items-center gap-4">
					<a href={github} target="_blank" rel="noreferrer">
						<GitHubLogoIcon className="size-6 transition" />
					</a>
					<a href={linkedin} target="_blank" rel="noreferrer">
						<LinkedInLogoIcon className="size-6 transition" />
					</a>
					<a href={mailto} target="_blank" rel="noreferrer">
						<GmailIcon />
					</a>
				</div>
			</section>

			{/* Projects */}
			<section className="text-foreground gap-4">
				<h2 className="font-bold text-lg md:text-2xl pb-3 border-b-foreground border-b-2 mb-4">PROJECTS</h2>

				<ul className="flex flex-col gap-6 md:gap-8">
					{projects.map((project) => {
						return (
							<li key={project.title}>
								<ProjectListItem project={project} />
							</li>
						);
					})}
				</ul>
			</section>
		</div>
	);
};

export default Me;
