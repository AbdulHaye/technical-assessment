export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to RestoreMasters</h1>
      <p className="text-gray-300">
        Navigate to{" "}
        <a href="/dashboard" className="text-indigo-400 underline">
          Dashboard
        </a>{" "}
        to view metrics .
      </p>
    </div>
  );
}
