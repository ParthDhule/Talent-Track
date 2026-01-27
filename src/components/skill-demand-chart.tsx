'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function SkillDemandChart() {
  const skills = [
    { name: "React/Next.js", demand: 85, supply: 60 },
    { name: "Python", demand: 78, supply: 72 },
    { name: "Data Analysis", demand: 70, supply: 45 },
    { name: "Java", demand: 65, supply: 80 },
    { name: "Cloud/AWS", demand: 60, supply: 35 },
  ];

  return (
    <Card className="hover-elevate transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg">Skill Demand vs Supply</CardTitle>
        <CardDescription>Based on historical hiring trends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {skills.map((skill, i) => {
            const gap = skill.demand - skill.supply;
            const isShortage = gap > 0;
            
            return (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{skill.name}</span>
                  <span className={`text-xs ${isShortage ? 'text-amber-600' : 'text-green-600'}`}>
                    {isShortage ? `${gap}% gap` : 'Balanced'}
                  </span>
                </div>
                <div className="relative h-4 flex gap-0.5">
                  <div className="flex-1 bg-secondary rounded-l overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-500"
                      style={{ width: `${skill.demand}%` }}
                    />
                  </div>
                  <div className="flex-1 bg-secondary rounded-r overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${skill.supply}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Demand: {skill.demand}%</span>
                  <span>Supply: {skill.supply}%</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center gap-6 mt-4 pt-4 border-t text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
            <span>Industry Demand</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
            <span>Candidate Supply</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
