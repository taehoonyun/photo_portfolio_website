import DefaultLayout from "@/layouts/default";
import axios from "axios";

export default function DocsPage() {

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget); // Access form data directly

    // Extract form values from FormData
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    
    try {
      // Send form data using Axios
      const response = await axios.post("/api/route", {
        name,
        email,
        message,
      }, {
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
      });

      alert(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message. Please try again.");
    }
  };
  
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center mb-12">
          <h1 className="text-3xl">Contact</h1>
        </div>
        <form
          className="inline-block text-center justify-center w-full h-full m-20"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="block m-4">
            Name *
          </label>
          <input
            id="name"
            name="name" // Added name attribute
            type="text"
            className="border-b-2 outline-none text-center w-2/4"
            required
          />

          <label htmlFor="email" className="block m-4">
            Email Address *
          </label>
          <input
            id="email"
            name="email" // Added name attribute
            type="email" // Changed type to email for validation
            className="border-b-2 outline-none text-center w-2/4"
            required
          />

          <label htmlFor="message" className="block m-4">
            Message *
          </label>
          <textarea
            id="message"
            name="message" // Added name attribute
            className="h-2/4 justify-center border-b-2 outline-none text-center w-2/4"
            placeholder="Leave a message..."
            required
          />
          <div>
            <button
              className="rounded bg-sky-400 hover:bg-red-500 py-2 px-4 text-white p-4 z-50"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </section>
    </DefaultLayout>
  );
}
