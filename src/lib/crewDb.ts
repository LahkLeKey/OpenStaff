// src/lib/crewDb.ts
import localforage from "localforage";
import { faker } from "@faker-js/faker";

export type Status = "available" | "on-mission" | "offline";

export type User = {
  id: number;
  name: string;
  role: string;
  status: Status;
};

const db = localforage.createInstance({ name: "openstaff" });

export async function seedIfNeeded() {
  const existing = await db.getItem<User[]>("crew");
  if (!existing || (Array.isArray(existing) && existing.length === 0)) {
    const seeded: User[] = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      name: faker.person.fullName(),
      role: faker.person.jobTitle(),
      status: faker.helpers.arrayElement(["available", "on-mission", "offline"]),
    }));
    await db.setItem("crew", seeded);
  }
}

export async function getUsers(): Promise<User[]> {
  const crew = await db.getItem<User[]>("crew");
  return crew || [];
}

export async function addUser(name: string): Promise<User> {
  const crew = (await getUsers()) || [];
  const newUser: User = {
    id: crew.length + 1,
    name,
    role: "Ensign",
    status: "available",
  };
  const updated = [...crew, newUser];
  await db.setItem("crew", updated);
  return newUser;
}
