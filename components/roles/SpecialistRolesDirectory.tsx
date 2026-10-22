'use client';

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { SPECIALIST_ROLES } from '@/data/roles';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, Badge, Container, SectionHeading, Input } from '@/components/ui';

export function SpecialistRolesDirectory() {
  const [search, setSearch] = useState('');
  const { t, isAr } = useLanguage();

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
    <section id="roles" className="py-20 relative z-10">
      <Container size="lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <Badge variant="cyan" className="mb-3 uppercase tracking-wider">
              {t.skills.badge}
            </Badge>
            <h2 className="text-3xl font-extrabold text-white">
              {t.skills.heading}
            </h2>
          </div>

          <div className="w-full md:w-80">
            <Input
              type="text"
              placeholder={t.skills.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              rightIcon={<Search className="w-4 h-4" />}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <span className="text-[10px] font-mono text-gray-500 font-bold">
                    ACTIVE
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1">
                  {isAr ? role.nameAr : role.nameEn}
                </h3>

                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {isAr ? role.descAr : role.descEn}
                </p>
              </div>

              <div
                className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500"
                dir="ltr"
              >
                <span>id: {role.id}</span>
                <span className="text-emerald-400 font-bold">0.8ms</span>
              </div>
            </Card>
          ))}
        </div>

        {filteredRoles.length === 0 && (
          <div className="text-center py-12 text-gray-500 font-mono text-sm">
            No specialist skill found matching &quot;{search}&quot;
          </div>
        )}
      </Container>
    </section>
  );
}
