import { useState } from "react";
import Title from "../components/Title";
import Loading from "./Loading";

const Generate = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(e.target.prompt.value);
    const form = new FormData();
    form.append("prompt", e.target.prompt.value);

    fetch("https://clipdrop-api.co/text-to-image/v1", {
      method: "POST",
      headers: {
        "x-api-key":
          "b9e6adc2bb71ca0b7aaf055c31bbd1d4390214902b8451a5fb6fbca7063a13d576b82946fb8ed9f6f2aab321ea70a185",
      },
      body: form,
    })
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        console.log(buffer);
        const blob = new Blob([buffer], { type: "image/jpeg" });
        const image_url = URL.createObjectURL(blob);
        setImages([image_url, ...images]);
        // buffer here is a binary representation of the returned image
        setLoading(false);
      });
  };
  if(loading) return <Loading></Loading>
  return (
    <div className="contianer">
      <Title>Generate Paintings</Title>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap mt-10 justify-center gap-2"
      >
        <input
          type="text"
          name="prompt"
          placeholder="what kind of painting do you need"
          className="input input-bordered w-10/12 "
        />
        <button className="btn btn-primary ">Subscribe</button>
        <div className="grid lg:grid-cols-3 gap-5 mt-5">
          {
            images.map((image) => (
              <div>
                <img className="border-8 p-5 w-full" src={image} alt="" srcset="" />
              </div>
            ))
          }
        </div>
      </form>
    </div>
  );
};

export default Generate;
