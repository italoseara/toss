import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-blue-500 min-h-screen font-sans">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-24 max-w-7xl">
        <h1 className="mb-4 font-bold text-white text-4xl">Welcome to the Home Page</h1>
        {session ? (
          <p className="text-white text-lg">
            Logged in as {session.user?.name} <br /> {JSON.stringify(session)}
          </p>
        ) : (
          <p className="text-white text-lg">You are not logged in.</p>
        )}
      </div>
    </div>
  );
}
