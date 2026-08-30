import { useEffect } from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  fetchBookings
} from "../../redux/bookingSlice";

import "./styles/MyBookings.css";

function MyBookings() {

  const dispatch = useDispatch();

  const user = useSelector(
    (state) => state.user.currentUser
  );

  const bookings = useSelector(
    (state) => state.bookings.items
  );

  useEffect(() => {

    if (user) {
      dispatch(fetchBookings());
    }

  }, [dispatch, user]);

  const myBookings =
    bookings.filter(
      (booking) =>
        String(booking.userId) ===
        String(user?.id)
    );

  if (!user) {

    return (
      <section className="my-bookings">

        <h1>
          Please login to see bookings.
        </h1>

      </section>
    );
  }

  return (
    <section className="my-bookings">

      <div className="container">

        <h1 className="page-title">
          My Bookings
        </h1>

        <p className="page-subtitle">
          Your appointments
        </p>

        {!myBookings.length ? (

          <div className="empty-bookings">
            No appointments found.
          </div>

        ) : (

          <div className="booking-list">

            {myBookings.map(
              (booking) => (

                <div
                  className="booking-card"
                  key={booking.id}
                >

                  <h3>
                    {booking.serviceName}
                  </h3>

                  <p>
                    <strong>Date:</strong>
                    {" "}
                    {booking.date}
                  </p>

                  <p>
                    <strong>Time:</strong>
                    {" "}
                    {booking.time}
                  </p>

                  <p>
                    <strong>Name:</strong>
                    {" "}
                    {booking.customerName}
                  </p>

                  <span
                    className={`status ${booking.status.toLowerCase()}`}
                  >
                    {booking.status}
                  </span>

                </div>

              )
            )}

          </div>
        )}

      </div>

    </section>
  );
}

export default MyBookings;