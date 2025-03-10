import { Prisma } from '@prisma/client';

export class User {
  id?: number;
  name: string;
  email: string;
  password: string;
  tasks?: Prisma.TaskUncheckedCreateNestedManyWithoutUserInput;
}

export type UserSelect = Prisma.UserSelect & {
  password: true;
};