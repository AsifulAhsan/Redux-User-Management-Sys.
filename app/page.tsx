// app/page.tsx
import UserManager from "./../components/UserManager";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-linear-to-br from-slate-700 to-slate-900">
      <h1 className="text-4xl text-cyan-100 font-bold text-center">
        Redux CRUD
      </h1>
      <div className="max-w-5xl mx-auto px-4">
        <UserManager />
      </div>
    </main>
  );
}
