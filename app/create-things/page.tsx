"use client";

import { FormEvent, useRef, useState } from "react";
import {
  useQuery,
} from '@tanstack/react-query'
import useCustomHook from "@/app/_utils/useCustomHook";

export default function Page() {

  const { isPending, error, data } = useQuery({
    queryKey: ['things'],
    queryFn: () =>
      fetch('/api/things', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }).then((res) =>
        res.json(),
      ),
  })


  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;

    try {
      const response = await fetch("/api/things", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Failed to create thing");
      }

      const data = await response.json();
      setMessage(`Thing created successfully! ID: ${data.id}`);
      formRef.current?.reset();
    } catch (error) {
      setMessage("Error creating thing. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  //get things from custom hook

  const customHookResponse = useCustomHook()
  console.log(customHookResponse.data);

  return (
    <>
      <h1>Create a Thing</h1>
      <h2>Things</h2>
      { isPending &&
        <p>Loading...</p>
      }
      { error &&
        <p>Error loading things</p>
      }
      { !isPending && !error &&
        <ul>
          {data.map( (dataItem: any) => <li key={dataItem.id}>{dataItem.name}</li>)}
        </ul>
      }
      <p>Fill out the form and click submit to create a thing</p>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div>
          <label htmlFor="thingName">Thing Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Submit"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
}
