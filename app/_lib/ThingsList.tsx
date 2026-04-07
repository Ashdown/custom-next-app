interface ThingsListProps {
  items: Array<{ id: string | number; name: string }>;
}

export default function ThingsList({ items }: ThingsListProps) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
