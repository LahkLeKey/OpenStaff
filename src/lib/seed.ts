// src/lib/seed.ts
import { faker } from "@faker-js/faker";
import { crewDb } from "./db";

export type Status = "available" | "on-mission" | "offline";

export type CrewMember = {
  id: number;
  name: string;
  role: string;
  status: Status;
};

export async function seedCrew() {
  const existing = await crewDb.getItem("crew");
  if (!existing) {
    const crew: CrewMember[] = Array.from({ length: 5 }).map((_, i) => ({
      id: i + 1,
      name: faker.person.fullName(),
      role: faker.person.jobTitle(),
      status: faker.helpers.arrayElement(["available", "on-mission", "offline"]),
    }));
    await crewDb.setItem("crew", crew);
  }
}

export async function getCrew(): Promise<CrewMember[]> {
  const crew = await crewDb.getItem<CrewMember[]>("crew");
  return crew || [];
}

export async function addCrewMember(name: string): Promise<CrewMember> {
  const crew = await getCrew();
  const newMember: CrewMember = {
    id: crew.length + 1,
    name,
    role: "Ensign",
    status: "available",
  };
  const updated = [...crew, newMember];
  await crewDb.setItem("crew", updated);
  return newMember;
}
