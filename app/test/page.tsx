import ThingsList from "@/app/_lib/ThingsList";

const DATA = [
    { id: 1, name: "Thing One" },
    { id: 2, name: "Thing Two" },
];

export default function Page() {
  return (
    <>
      <h1>Test Page</h1>
      <p>This is a test page</p>
      <h2>This is a list of things</h2>
      <ThingsList items={DATA} />
    </>
  );
}
