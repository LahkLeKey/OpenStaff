// src/lib/db.ts
import localforage from "localforage";
export const crewDb = localforage.createInstance({ name: "openstaff" });
