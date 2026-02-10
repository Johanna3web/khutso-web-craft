import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Beats by Siba Boutique",
    description: "A stylish e-commerce boutique showcasing curated fashion and accessories with a modern, clean shopping experience.",
    url: "https://beats-by-siba-boutique.vercel.app/",
  },
  {
    title: "Resume Builder",
    description: "An interactive resume builder app that lets users create, customise, and export professional CVs quickly and easily.",
    url: "https://tempo-deployment-d1f34b8f-e90b-4515-ashy.vercel.app/",
  },
  {
    title: "EduManage",
    description: "A school management system for tracking students, staff, and academic records — built for efficiency and ease of use.",
    url: "https://emsms.netlify.app/",
  },
  {
    title: "AI Generator Hub",
    description: "A powerful AI-powered content generation platform for creating text, images, and more using cutting-edge artificial intelligence.",
    url: "https://ai-generator-hub-tan.vercel.app/",
  },
  {
    title: "Professional Portfolio",
    description: "A sleek, elegant portfolio website showcasing personal branding, skills, and professional experience with a modern minimal design.",
    url: "https://malehu-elegant-folio-d9zm.vercel.app/",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">Portfolio</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            My Recent Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A selection of websites and apps I've designed and built for clients.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group bg-background border border-border rounded-xl p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display font-bold text-foreground text-lg">{project.title}</h3>
                <ExternalLink size={16} className="text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 mt-1" />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
