import React, {useEffect, useState} from 'react';
import {ArrowRight, Check, Monitor, Smartphone, X} from 'lucide-react';
import {ShowcaseProject} from '../data/studioData';
import {ProjectPreviewMockup} from './ProjectPreviewMockup';

interface ProjectModalProps {
  project: ShowcaseProject | null;
  onClose: () => void;
  onBuildSimilar: (serviceOption: string) => void;
}

export function ProjectModal({
  project,
  onClose,
  onBuildSimilar,
}: ProjectModalProps) {
  const [previewWidth, setPreviewWidth] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    if (!project) return;
    setPreviewWidth('desktop');
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl border border-white/[0.12] bg-[#0D1018] shadow-[0_32px_90px_-15px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-medium text-[#7D93FF]">
              {project.category} · Showcase Concept
            </div>
            <h3
              id="project-modal-title"
              className="mt-0.5 font-display text-xl font-bold text-white"
            >
              {project.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-lg border border-white/[0.08] bg-[#07090F]">
              <button
                type="button"
                onClick={() => setPreviewWidth('desktop')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                  previewWidth === 'desktop'
                    ? 'bg-[#4F6BFF] text-white'
                    : 'text-[#949BA8] hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewWidth('mobile')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                  previewWidth === 'mobile'
                    ? 'bg-[#4F6BFF] text-white'
                    : 'text-[#949BA8] hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Mobile</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close project preview"
              className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.02] text-[#949BA8] hover:text-white hover:border-white/20 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[82vh] overflow-y-auto">
          <div
            className={`mx-auto transition-all duration-300 ${
              previewWidth === 'mobile' ? 'max-w-[330px]' : 'w-full'
            }`}
          >
            <ProjectPreviewMockup
              projectId={project.id}
              domainUrl={project.domainUrl}
              compact={false}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
            <div className="md:col-span-7 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#949BA8]">
                Concept Overview
              </div>
              <p className="text-sm sm:text-[15px] leading-relaxed text-[#CBD2DF]">
                {project.summary}
              </p>
            </div>

            <div className="md:col-span-5 space-y-2.5">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#949BA8]">
                Craft Highlights
              </div>
              <ul className="space-y-2">
                {project.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs sm:text-[13px] text-[#CBD2DF]"
                  >
                    <Check
                      className="w-3.5 h-3.5 text-[#4F6BFF] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-[#949BA8]">
              Visual portfolio concept by Web Solutions
            </span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onBuildSimilar(project.serviceOption);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4F6BFF] hover:bg-[#5E78FF] text-xs sm:text-sm font-semibold text-white transition-colors cursor-pointer"
            >
              <span>Build a Website Like This</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
