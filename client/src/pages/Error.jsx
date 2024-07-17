import { NavLink } from "react-router-dom";
export const Error = () => {
  return (
    <>
      <section>
        <div>
          <div>
            <h1>404</h1>
            <h4>Sorry ! Page not found</h4>
            <p>
              amet nemo eos. Aut voluptatibus eos, harum suscipit similique
              laborum architecto perspiciatis corrupti?
            </p>
            <div>
              <NavLink>Return Home</NavLink>
              <NavLink>Report Problem</NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
