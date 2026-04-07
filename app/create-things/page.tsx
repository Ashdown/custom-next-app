"use client";

import { FormEvent } from "react";

export default function Page() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <>
      <h1>Create a Thing</h1>
      <p>Fill out the form and click submit to create a thing</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="thingName">Thing Name:</label>
          <input
            type="text"
            id="thingName"
            name="thingName"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
