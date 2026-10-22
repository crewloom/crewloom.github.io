import React, { useState, useMemo } from 'react';
import { Code2, Search } from 'lucide-react';
import { Lang } from '@/types';
import { DICTIONARY } from '@/data/dictionary';
import { SPECIALIST_ROLES } from '@/data/roles';

interface SpecialistRolesDirectoryProps {
  lang: Lang;
}

export function SpecialistRolesDirectory({ lang }: SpecialistRolesDirectoryProps) {
  const [search, setSearch] = useState('');
  const t = DICTIONARY[lang];
  const isAr = lang === 'ar';

  const filteredRoles = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return SPECIALIST_ROLES;

    return SPECIALIST_ROLES.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.nameAr.includes(q) ||
        r.nameEn.toLowerCase().includes(q) ||
        r.cat.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <section id="roles" className="py-20 px-4 sm:px-6 lg:px-12 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase mb-3">
              {t.skills.badge}
            </h2>
            <p className="text-3xl font-extrabold text-white">{t.skills.heading}</p>
          </div>

          <div className="w-full md:w-80 relative">
            <Search className={`w-4 h-4 text-gray-500 absolute top-3 ${isAr ? 'left-3' : 'right-3'} pointer-events-none`} />
            <input
              type="text"
              placeholder={t.skills.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-space-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition shadow-inner"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredRoles.map((role) => (
            <div
              key={role.id}
              className="glass-card p-4 rounded-xl border border-white/[0.08] hover:border-cyan-500/40 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/40">
                    {role.cat}
                  </span>
                  <Code2 className="w-3.5 h-3.5 text-gray-500" />
                </div>
                <h3 className="text-xs font-bold text-white mb-1.5 font-mono truncate" title={role.id}>
                  {role.id}
                </h3>
                <p className="text-[11px] text-gray-300 font-semibold leading-snug mb-1">
                  {isAr ? role.nameAr : role.nameEn}
                </p>
                {(role.descAr || role.descEn) && (
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    {isAr ? role.descAr : role.descEn}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
