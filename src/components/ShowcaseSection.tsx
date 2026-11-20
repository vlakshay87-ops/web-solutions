import React, {useState} from 'react';
import {ArrowRight} from 'lucide-react';
import {SHOWCASE_PROJECTS, ShowcaseProject} from '../data/studioData';
import {useScrollReveal} from '../hooks/useScrollReveal';
import {ProjectModal} from './ProjectModal';
import {ProjectPreviewMockup} from './ProjectPreviewMockup';

interface ShowcaseSectionProps {
  onBuildSimilar: (serviceOption: string) => void;
}

export function ShowcaseSection({onBuildSimilar}: ShowcaseSectionProps) {
  const {ref, isVisible} = useScrollReveal<HTMLElement>(0.1);
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(
    null
  );

  return (
    <section
      id="work"
      ref={ref}
      className="relative py-24 sm:py-32 border-b border-white/[0.06] bg-[#080A10]"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 ws-reveal ${
            isVisible ? 'is-visible' : ''
          }`}
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7D93FF]">
              Featured Work
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,3.6vw,3.1rem)] font-bold leading-[1.08] tracking-[-0.025em] text-white">
              BUILT TO STAND OUT.
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-[15px] leading-relaxed text-[#949BA8]">
            Visual portfolio examples demonstrating distinct brand identities,
            responsive layouts, and clear customer journeys.
          </p>
        </div>

        <div className="mt-12 sm:mt-14 grid grid-cols-1 lg:grid-cols-3 gap-7">
          {SHOWCASE_PROJECTS.map((project, index) => (
            <article
              key={project.id}
              style={{transitionDelay: `${index * 80}ms`}}
              className={`group ws-interactive-card rounded-2xl p-5 flex flex-col justify-between ws-reveal ${
                isVisible ? 'is-visible' : ''
              }`}
            >
              <div>
                {/* Miniature Browser Website Preview */}
                <div className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]">
                  <ProjectPreviewMockup
                    projectId={project.id}
                    domainUrl={project.domainUrl}
                  />
                </div>

                {/* Unboxed Metadata & Editorial Title */}
                <div className="mt-5 px-1">
                  <div className="text-xs font-medium text-[#7D93FF]">
                    {project.category}
                  </div>
                  <h3 className="mt-1.5 font-display text-xl font-bold tracking-[-0.015em] text-white">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#949BA8]">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 px-1 pt-4 border-t border-white/[0.07]">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#9EB0FF] transition-colors cursor-pointer"
                >
                  <span>Explore Project</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onBuildSimilar={onBuildSimilar}
      />
    </section>
  );
}
