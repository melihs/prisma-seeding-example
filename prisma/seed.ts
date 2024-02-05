import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
import { PrismaClient } from "@prisma/client";
import UserSeed from "./data/userSeed";
import PostSeed from "./data/postSeeder";

const prisma = new PrismaClient();

const main = async () => {
  try {
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    const posts = new PostSeed();
    const users = new UserSeed(3);

    for (const user of users.data) {
      await prisma.user.create({
        data: {
          ...(user as any),
          posts: {
            create: posts.data,
          },
        },
      });

    }

    console.log(`Database has been seeded. 🚀`);
  } catch (e) {
    throw error;
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
