import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import MyVerticallyCenteredModal from "../../components/Modal/OpenModal";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(async () => {
    const data = await axios.get("https://jsonplaceholder.typicode.com/posts");

    if (data.data.length > 0) {
      setPosts(data.data.reverse());
    }
  }, []);

  const newPost = (data) => {
    let info = posts.reverse();
    let newData = info.concat(data);
    setPosts(newData.reverse());
    alert("Success");
  };

  const deletePost = (id) => {
    console.log(id);

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        //Hacemos como que si :V
        const newData = posts.filter((el) => {
          return el.id != id;
        });
        setPosts(newData);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-5 mb-5">
          <Button variant="primary" onClick={() => setModalShow(true)}>
            New Post
          </Button>
        </div>
        <div className="col-12">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Body</th>
                <td scope="col">Options</td>
              </tr>
            </thead>
            <tbody>
              {posts.map((el) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{el.id}</th>
                      <td>{el.title}</td>
                      <td>{el.body}</td>
                      <td className="buttons">
                        <Link
                          className="btn btn-primary"
                          to={`/editar/${el.id}`}
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => deletePost(el.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        postNew={newPost}
      />
    </div>
  );
};

export default Posts;
