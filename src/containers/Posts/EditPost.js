import React, { useState, useEffect } from "react";

const EditPost = (props) => {
  const [form, setValues] = useState({
    title: "",
    body: "",
    userId: "",
    id: "",
  });

  const hadleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${props.match.params.id}`)
      .then((response) => response.json())
      .then((json) =>
        setValues({
          ...form,
          title: json.title,
          body: json.body,
          userId: json.id,
          id: json.id,
        })
      );
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);

    fetch(
      `https://jsonplaceholder.typicode.com/posts/${props.match.params.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          id: form.id,
          title: form.title,
          body: form.body,
          userId: form.userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        //Update :)
        alert("Actualizado :)");
        console.log(json);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <form className="row" onSubmit={handleSubmit}>
            <div className="col">
              <label htmlFor="title" className="visually-hidden">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="title"
                name="title"
                onChange={hadleInput}
                value={form.title}
              />
            </div>
            <div className="col">
              <label htmlFor="body" className="visually-hidden">
                Body
              </label>
              <input
                type="body"
                className="form-control"
                id="body"
                placeholder="body"
                name="body"
                onChange={hadleInput}
                value={form.body}
              />
            </div>
            <div className="col-12 mt-3">
              <button type="submit" className="btn btn-primary mb-3">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
