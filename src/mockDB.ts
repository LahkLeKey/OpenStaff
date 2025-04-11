export type User = {
    id: number;
    name: string;
  };
  
  let users: User[] = [
    { id: 1, name: "Nova Bright" },
    { id: 2, name: "Orion Flux" },
  ];
  
  let nextId = 3;
  
  export const mockDb = {
    getUsers: () => Promise.resolve([...users]),
    addUser: (name: string) => {
      const newUser = { id: nextId++, name };
      users.push(newUser);
      return Promise.resolve(newUser);
    },
    reset: () => {
      users = [
        { id: 1, name: "Nova Bright" },
        { id: 2, name: "Orion Flux" },
      ];
      nextId = 3;
    },
  };
  