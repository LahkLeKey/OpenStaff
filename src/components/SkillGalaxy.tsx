
import type { User } from "@/lib/crewDb";

interface SkillGalaxyProps {
  crew: User[];
}

export function SkillGalaxy({ crew }: SkillGalaxyProps) {
  const skillsMap = new Map<string, string[]>();

  crew.forEach(user => {
    (user.skills || []).forEach(skill => {
      if (!skillsMap.has(skill)) {
        skillsMap.set(skill, []);
      }
      skillsMap.get(skill)!.push(user.name);
    });
  });

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">Skill Galaxy</h2>
      <div className="grid grid-cols-2 gap-2">
        {[...skillsMap.entries()].map(([skill, names]) => (
          <div key={skill} className="p-2 bg-gray-100 rounded">
            <strong>{skill}</strong>
            <ul className="text-sm list-disc list-inside">
              {names.map(name => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
