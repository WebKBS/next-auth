import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const db = globalThis.prismaGlobal ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;

//개발 중 next dev 실행시 Node.js 캐시를 지운다.
// 그러면 핫 리로딩으로 인해 PrismaClient 새 인스턴스가 초기화되어 데이터베이스의 연결이 생성된다.
// PrismaClient 인스턴스가 자체 연결 풀을 가지고 있기 때문에 데이터베이스 연결이 빠르게 소진될수 있다.
// 고로 개발 모드일 때 prisma가 있는지 확인하고 없으면 새로운 인스턴스를 만들어야 한다.
