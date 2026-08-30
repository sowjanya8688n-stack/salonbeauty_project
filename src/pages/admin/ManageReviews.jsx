import { useEffect, useState } from "react";

// import AdminSidebafrom "../../components/admin/AdminSidebar";

import api from "../../api/axios";
import "./styles/ManageReviews.css";

// import "./styles/AdminPages.css";


function ManageReviews() {

  const [reviews, setReviews] =
    useState([]);


  const loadData = async () => {

    const response =
      await api.get("/reviews");

    setReviews(response.data);

  };


  useEffect(() => {

    loadData();

  }, []);


  const remove =
    async id => {

      await api.delete(
        `/reviews/${id}`
      );

      loadData();

    };


  return (

    <>

      <AdminSidebar />


      <main className="admin-page">

        <div className="admin-page-header">

          <div>

            <h1>
              Customer Reviews
            </h1>

            <p>
              View customer feedback.
            </p>

          </div>

        </div>


        <div className="admin-table-container">

          <table className="admin-table">

            <thead>

              <tr>

                <th>Customer</th>

                <th>Service</th>

                <th>Rating</th>

                <th>Review</th>

                <th>Action</th>

              </tr>

            </thead>


            <tbody>

              {reviews.map(
                review => (

                  <tr key={review.id}>

                    <td>
                      {review.customer}
                    </td>

                    <td>
                      {review.service}
                    </td>

                    <td>
                      ⭐ {review.rating}
                    </td>

                    <td>
                      {review.comment}
                    </td>

                    <td>

                      <button
                        className="admin-delete-btn"
                        onClick={() =>
                          remove(
                            review.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </main>

    </>

  );

}

export default ManageReviews;