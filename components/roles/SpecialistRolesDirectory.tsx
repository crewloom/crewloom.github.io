'use client';

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { SPECIALIST_ROLES } from '@/data/roles';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, Badge, Container, Input } from '@/components/ui';

export function SpecialistRolesDirectory() {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const { t, isAr } = useLanguage();

  const categories = useMemo(() => {
    const set = new Set(SPECIALIST_ROLES.map((r) => r.cat));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredRoles = useMemo(() => {
    let list = SPECIALIST_ROLES;
    if (selectedCat !== 'All') {
      list = list.filter((r) => r.cat.toLowerCase() === selectedCat.toLowerCase());
    }
    const q = search.trim().toLowerCase();
    if (!q) return list;

    return list.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.nameAr.includes(q) ||
        r.nameEn.toLowerCase().includes(q) ||
        r.cat.toLowerCase().includes(q)
    );
  }, [search, selectedCat]);

  return (
    <section id="roles" className="py-16 sm:py-20 relative z-10">
      <Container size="lg">
        {/* Header and Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
          <div className="max-w-xl">
            <Badge variant="cyan" className="mb-3 uppercase tracking-wider text-[10px] sm:text-xs">
              {t.skills.badge}
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {t.skills.heading}
            </h2>
          </div>

          <div className="w-full md:w-80">
            <Input
              type="text"
              placeholder={t.skills.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              rightIcon={<Search className="w-4 h-4 text-cyan-400" />}
            />
          </div>
        </div>

        {/* Category Filter Pills (Scrollable on mobile) */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-6 code-scroll -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => {
            const active = selectedCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition cursor-pointer shrink-0 border ${
                  active
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-700 font-bold shadow-sm'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredRoles.map((role) => (
            <Card
              key={role.id}
              variant="interactive"
              className="p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="cyan" className="text-[10px] py-0 px-2 font-mono">
                    {role.cat}
                  </Badge>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    READY
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1.5 line-clamp-1">
                  {isAr ? role.nameAr : role.nameEn}
                </h3>

                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {isAr ? role.descAr : role.descEn}
                </p>
              </div>

              <div
                className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500"
                dir="ltr"
              >
                <span className="text-gray-400 truncate max-w-[120px]">{role.id}</span>
                <span className="text-cyan-400 font-bold shrink-0">0.8ms</span>
              </div>
            </Card>
          ))}
        </div>

        {filteredRoles.length === 0 && (
          <div className="text-center py-12 text-gray-500 font-mono text-xs sm:text-sm">
            No specialist skill found matching &quot;{search}&quot;
          </div>
        )}
      </Container>
    </section>
  );
}
